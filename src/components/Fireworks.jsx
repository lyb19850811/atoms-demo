import { useEffect, useRef } from 'react'

// 轻量 Canvas 烟花特效（无第三方依赖）
export default function Fireworks({ active, onDone }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    ctx.scale(dpr, dpr)
    const W = window.innerWidth
    const H = window.innerHeight

    const colors = ['#6d5cff', '#8b5cf6', '#22d3ee', '#f472b6', '#fbbf24', '#34d399', '#f87171', '#a78bfa', '#fde047']
    let particles = []
    let raf
    const start = performance.now()

    function burst(x, y) {
      const count = 56
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.35
        const speed = 2 + Math.random() * 4.5
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[(Math.random() * colors.length) | 0],
          life: 1,
          decay: 0.008 + Math.random() * 0.014,
          size: 1.5 + Math.random() * 2.6
        })
      }
    }

    const bursts = [
      { t: 0, x: W * 0.3, y: H * 0.32 },
      { t: 260, x: W * 0.7, y: H * 0.28 },
      { t: 520, x: W * 0.5, y: H * 0.42 },
      { t: 800, x: W * 0.22, y: H * 0.28 },
      { t: 1060, x: W * 0.78, y: H * 0.38 }
    ]

    function frame(now) {
      const elapsed = now - start
      for (const b of bursts) {
        if (!b.done && elapsed >= b.t) {
          burst(b.x, b.y)
          b.done = true
        }
      }
      ctx.clearRect(0, 0, W, H)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.055
        p.vx *= 0.99
        p.vy *= 0.99
        p.life -= p.decay
      }
      particles = particles.filter((p) => p.life > 0)
      for (const p of particles) {
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      if (elapsed < 2300 || particles.length > 0) {
        raf = requestAnimationFrame(frame)
      } else {
        onDone?.()
      }
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!active) return null
  return <canvas ref={canvasRef} className="fireworks-canvas" />
}
