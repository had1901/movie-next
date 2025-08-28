'use client'
import { useEffect, useRef } from 'react'

export default function SolarSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Các hành tinh
    const planets = [
      { r: 60, size: 5, speed: 0.02, color: '#bbb', angle: 0 }, // Mercury
      { r: 100, size: 7, speed: 0.015, color: '#f4a261', angle: 0 }, // Venus
      { r: 150, size: 8, speed: 0.01, color: '#2a9d8f', angle: 0 }, // Earth
      { r: 200, size: 6, speed: 0.008, color: '#e76f51', angle: 0 }, // Mars
      { r: 270, size: 12, speed: 0.006, color: '#e9c46a', angle: 0 }, // Jupiter
      { r: 340, size: 10, speed: 0.004, color: '#a8dadc', angle: 0 }, // Saturn
      { r: 400, size: 9, speed: 0.003, color: '#457b9d', angle: 0 }, // Uranus
      { r: 460, size: 9, speed: 0.002, color: '#1d3557', angle: 0 }  // Neptune
    ]

    // Các ngôi sao nền
    const stars = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5,
    }))

    function draw() {
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Vẽ các sao nền
      for (const s of stars) {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = 'white'
        ctx.fill()
      }

      // Vẽ Mặt Trời
      ctx.beginPath()
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2)
      const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 30)
      gradient.addColorStop(0, 'yellow')
      gradient.addColorStop(1, 'orange')
      ctx.fillStyle = gradient
      ctx.fill()

      // Vẽ hành tinh
      for (const p of planets) {
        p.angle += p.speed
        const x = centerX + p.r * Math.cos(p.angle)
        const y = centerY + p.r * Math.sin(p.angle)

        // Vẽ quỹ đạo
        ctx.beginPath()
        ctx.arc(centerX, centerY, p.r, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255,255,255,0.1)'
        ctx.stroke()

        // Vẽ hành tinh
        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }

      requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
    />
  )
}
