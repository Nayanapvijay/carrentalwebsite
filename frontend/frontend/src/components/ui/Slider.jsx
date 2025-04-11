"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "../../lib/utils"

const Slider = ({ className, min = 0, max = 100, value = [0, 100], onValueChange, ...props }) => {
  const [values, setValues] = useState(value)
  const trackRef = useRef(null)
  const thumbRefs = [useRef(null), useRef(null)]
  const isDragging = useRef(null)

  useEffect(() => {
    setValues(value)
  }, [value])

  const getPercentage = (value) => {
    return ((value - min) / (max - min)) * 100
  }

  const handleMouseDown = (index, e) => {
    e.preventDefault()
    isDragging.current = index
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleMouseMove = (e) => {
    if (isDragging.current === null || !trackRef.current) return

    const rect = trackRef.current.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const newValue = Math.round((percentage * (max - min)) / 100 + min)

    updateValue(isDragging.current, newValue)
  }

  const handleMouseUp = () => {
    isDragging.current = null
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }

  const updateValue = (index, newValue) => {
    const newValues = [...values]

    if (index === 0) {
      if (newValue <= newValues[1]) {
        newValues[0] = Math.max(min, newValue)
      }
    } else {
      if (newValue >= newValues[0]) {
        newValues[1] = Math.min(max, newValue)
      }
    }

    setValues(newValues)

    if (onValueChange) {
      onValueChange(newValues)
    }
  }

  return (
    <div className={cn("relative w-full touch-none select-none pt-5 pb-1.5", className)} {...props}>
      <div ref={trackRef} className="relative h-2 w-full rounded-full bg-secondary">
        <div
          className="absolute h-full rounded-full bg-primary"
          style={{
            left: `${getPercentage(values[0])}%`,
            width: `${getPercentage(values[1]) - getPercentage(values[0])}%`,
          }}
        />
        {[0, 1].map((index) => (
          <div
            key={index}
            ref={thumbRefs[index]}
            className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            style={{
              left: `${getPercentage(values[index])}%`,
            }}
            onMouseDown={(e) => handleMouseDown(index, e)}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={values[index]}
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  )
}

export { Slider }

