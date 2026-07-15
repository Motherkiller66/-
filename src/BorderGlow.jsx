import { useRef, useCallback, useEffect } from 'react'
import './BorderGlow.css'

function parseHSL(value) {
  const match = value.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  return match ? { h: +match[1], s: +match[2], l: +match[3] } : { h: 84, s: 100, l: 61 }
}

function buildGlowVars(value, intensity) {
  const { h, s, l } = parseHSL(value)
  const opacities = [100, 60, 50, 40, 30, 20, 10]
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10']
  return Object.fromEntries(opacities.map((opacity, index) => [
    `--glow-color${keys[index]}`,
    `hsl(${h}deg ${s}% ${l}% / ${Math.min(opacity * intensity, 100)}%)`,
  ]))
}

const positions = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%']
const colorMap = [0, 1, 2, 0, 1, 2, 1]

function buildGradientVars(colors) {
  const vars = {}
  positions.forEach((position, index) => {
    vars[`--gradient-${index + 1}`] = `radial-gradient(at ${position}, ${colors[Math.min(colorMap[index], colors.length - 1)]} 0px, transparent 50%)`
  })
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`
  return vars
}

export default function BorderGlow({
  as: Component = 'div', children, className = '', edgeSensitivity = 30,
  glowColor = '40 80 80', backgroundColor = '#07151f', borderRadius = 18,
  glowRadius = 32, glowIntensity = .75, coneSpread = 11, animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'], fillOpacity = .22,
}) {
  const cardRef = useRef(null)
  const handlePointerMove = useCallback(event => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const dx = x - cx
    const dy = y - cy
    const kx = dx ? cx / Math.abs(dx) : Infinity
    const ky = dy ? cy / Math.abs(dy) : Infinity
    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1)
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
    if (angle < 0) angle += 360
    card.style.setProperty('--edge-proximity', (edge * 100).toFixed(3))
    card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`)
  }, [])

  useEffect(() => {
    if (!animated || !cardRef.current) return
    const card = cardRef.current
    card.classList.add('sweep-active')
    card.style.setProperty('--edge-proximity', '100')
    const timer = setTimeout(() => card.classList.remove('sweep-active'), 1400)
    return () => clearTimeout(timer)
  }, [animated])

  return <Component
    ref={cardRef}
    onPointerMove={handlePointerMove}
    className={`border-glow-card ${className}`}
    style={{
      '--card-bg': backgroundColor,
      '--edge-sensitivity': edgeSensitivity,
      '--border-radius': `${borderRadius}px`,
      '--glow-padding': `${glowRadius}px`,
      '--cone-spread': coneSpread,
      '--fill-opacity': fillOpacity,
      ...buildGlowVars(glowColor, glowIntensity),
      ...buildGradientVars(colors),
    }}
  >
    <span className="edge-light" aria-hidden="true" />
    <div className="border-glow-inner">{children}</div>
  </Component>
}
