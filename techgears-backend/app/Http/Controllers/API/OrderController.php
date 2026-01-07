<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Get user orders
     */
    public function index(Request $request)
    {
        $orders = Order::with(['items.product', 'payment'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => [
                'orders' => $orders->items(),
                'pagination' => [
                    'current_page' => $orders->currentPage(),
                    'last_page' => $orders->lastPage(),
                    'total' => $orders->total(),
                ],
            ],
        ]);
    }

    /**
     * Get single order
     */
    public function show(Request $request, $id)
    {
        $order = Order::with(['items.product', 'payment', 'shippingMethod'])
            ->where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'order' => $order,
            ],
        ]);
    }

    /**
     * Create order from cart
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'shipping_address' => 'required|array',
            'shipping_address.name' => 'required|string',
            'shipping_address.phone' => 'required|string',
            'shipping_address.street' => 'required|string',
            'shipping_address.city' => 'required|string',
            'shipping_address.province' => 'required|string',
            'shipping_address.postal_code' => 'required|string',
            'shipping_method_id' => 'required|exists:shipping_methods,id',
            'payment_method' => 'required|string',
            'coupon_code' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Get user cart
        $cartItems = Cart::with('product')
            ->where('user_id', $request->user()->id)
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Cart is empty',
            ], 422);
        }

        // Calculate subtotal
        $subtotal = $cartItems->sum('subtotal');

        // Get shipping method
        $shippingMethod = \App\Models\ShippingMethod::find($request->shipping_method_id);
        $shippingCost = $shippingMethod->base_cost;

        // Apply coupon if provided
        $discountAmount = 0;
        $couponId = null;
        
        if ($request->coupon_code) {
            $coupon = Coupon::where('code', $request->coupon_code)->first();
            
            if ($coupon && $coupon->isValid($subtotal)) {
                $discountAmount = $coupon->calculateDiscount($subtotal);
                $couponId = $coupon->id;
            }
        }

        // Calculate total
        $totalAmount = $subtotal - $discountAmount + $shippingCost;

        DB::beginTransaction();
        try {
            // Create order
            $order = Order::create([
                'user_id' => $request->user()->id,
                'shipping_method_id' => $shippingMethod->id,
                'coupon_id' => $couponId,
                'order_number' => Order::generateOrderNumber(),
                'total_amount' => $totalAmount,
                'discount_amount' => $discountAmount,
                'shipping_cost' => $shippingCost,
                'status' => 'pending',
                'shipping_address' => $request->shipping_address,
                'billing_address' => $request->billing_address ?? $request->shipping_address,
                'payment_method' => $request->payment_method,
                'notes' => $request->notes,
            ]);

            // Create order items
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->product->price,
                    'subtotal' => $cartItem->subtotal,
                ]);

                // Decrease stock
                $cartItem->product->decrementStock($cartItem->quantity);
            }

            // Increment coupon usage if used
            if ($couponId) {
                Coupon::find($couponId)->incrementUsage();
            }

            // Clear cart
            Cart::where('user_id', $request->user()->id)->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Order created successfully',
                'data' => [
                    'order' => $order->load(['items.product', 'shippingMethod']),
                ],
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create order: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Cancel order
     */
    public function cancel(Request $request, $id)
    {
        $order = Order::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found',
            ], 404);
        }

        if ($order->cancel()) {
            return response()->json([
                'success' => true,
                'message' => 'Order cancelled successfully',
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Cannot cancel order in current status',
        ], 422);
    }

    /**
     * Admin: Get all orders
     */
    public function adminIndex(Request $request)
    {
        $query = Order::with(['user', 'items.product', 'payment']);

        // Filter by status
        if ($request->has('status')) {
            $query->byStatus($request->status);
        }

        $orders = $query->latest()->paginate(20);

        return response()->json([
            'success' => true,
            'data' => [
                'orders' => $orders->items(),
                'pagination' => [
                    'current_page' => $orders->currentPage(),
                    'last_page' => $orders->lastPage(),
                    'total' => $orders->total(),
                ],
            ],
        ]);
    }

    /**
     * Admin: Update order status
     */
    public function updateStatus(Request $request, $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
            'tracking_number' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $order->updateStatus($request->status);

        if ($request->tracking_number) {
            $order->update(['tracking_number' => $request->tracking_number]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Order status updated successfully',
            'data' => [
                'order' => $order->fresh(),
            ],
        ]);
    }
}
