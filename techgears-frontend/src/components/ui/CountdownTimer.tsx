import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        clearInterval(timer)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
      <div className="text-center">
        <div className="bg-blue-500 rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center">
          <span className="text-sm sm:text-base lg:text-lg font-semibold text-white">{String(timeLeft.days).padStart(2, '0')}</span>
        </div>
        <span className="text-xs mt-1 block">Days</span>
      </div>
      <span className="text-lg sm:text-xl lg:text-2xl text-secondary">:</span>
      <div className="text-center">
        <div className="bg-blue-500 rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center">
          <span className="text-sm sm:text-base lg:text-lg font-semibold text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
        </div>
        <span className="text-xs mt-1 block">Hours</span>
      </div>
      <span className="text-lg sm:text-xl lg:text-2xl text-secondary">:</span>
      <div className="text-center">
        <div className="bg-blue-500 rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center">
          <span className="text-sm sm:text-base lg:text-lg font-semibold text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
        </div>
        <span className="text-xs mt-1 block">Minutes</span>
      </div>
      <span className="text-lg sm:text-xl lg:text-2xl text-secondary">:</span>
      <div className="text-center">
        <div className="bg-blue-500 rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center">
          <span className="text-sm sm:text-base lg:text-lg font-semibold text-white">{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
        <span className="text-xs mt-1 block">Seconds</span>
      </div>
    </div>
  )
}

