import { forwardRef, useEffect, useMemo, useRef } from 'react'
import { motion } from 'motion/react'
import './VariableProximity.css'

function useAnimationFrame(callback) {
  useEffect(() => {
    let frameId
    const loop = () => {
      callback()
      frameId = requestAnimationFrame(loop)
    }
    frameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameId)
  }, [callback])
}

function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const updatePosition = (x, y) => {
      if (!containerRef?.current) return
      const rect = containerRef.current.getBoundingClientRect()
      positionRef.current = { x: x - rect.left, y: y - rect.top }
    }
    const handlePointerMove = event => updatePosition(event.clientX, event.clientY)
    const handlePointerLeave = () => { positionRef.current = { x: -1000, y: -1000 } }
    const container = containerRef?.current
    container?.addEventListener('pointermove', handlePointerMove)
    container?.addEventListener('pointerleave', handlePointerLeave)
    return () => {
      container?.removeEventListener('pointermove', handlePointerMove)
      container?.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [containerRef])

  return positionRef
}

const VariableProximity = forwardRef((props, ref) => {
  const {
    label,
    fromFontVariationSettings = "'wght' 650, 'GRAD' 0",
    toFontVariationSettings = "'wght' 650, 'GRAD' 150",
    containerRef,
    radius = 140,
    falloff = 'gaussian',
    className = '',
    style,
    ...restProps
  } = props
  const letterRefs = useRef([])
  const mousePositionRef = useMousePositionRef(containerRef)

  const parsedSettings = useMemo(() => {
    const parse = value => new Map(value.split(',').map(part => {
      const [name, number] = part.trim().split(' ')
      return [name.replace(/['"]/g, ''), Number.parseFloat(number)]
    }))
    const from = parse(fromFontVariationSettings)
    const to = parse(toFontVariationSettings)
    return Array.from(from.entries()).map(([axis, fromValue]) => ({ axis, fromValue, toValue: to.get(axis) ?? fromValue }))
  }, [fromFontVariationSettings, toFontVariationSettings])

  useAnimationFrame(() => {
    if (!containerRef?.current) return
    const containerRect = containerRef.current.getBoundingClientRect()
    const { x, y } = mousePositionRef.current
    letterRefs.current.forEach(letter => {
      if (!letter) return
      const rect = letter.getBoundingClientRect()
      const letterX = rect.left + rect.width / 2 - containerRect.left
      const letterY = rect.top + rect.height / 2 - containerRect.top
      const distance = Math.hypot(x - letterX, y - letterY)
      const normalized = Math.min(Math.max(1 - distance / radius, 0), 1)
      const amount = falloff === 'exponential' ? normalized ** 2 : falloff === 'gaussian' ? Math.exp(-((distance / (radius / 2)) ** 2) / 2) : normalized
      letter.style.fontVariationSettings = parsedSettings.map(({ axis, fromValue, toValue }) => `'${axis}' ${fromValue + (toValue - fromValue) * amount}`).join(', ')
    })
  })

  let letterIndex = 0
  return <span ref={ref} className={`${className} variable-proximity`} style={{ display: 'inline', ...style }} {...restProps}>
    {label.split(' ').map((word, wordIndex, words) => <span className="variable-word" key={`${word}-${wordIndex}`}>
      {word.split('').map(letter => {
        const index = letterIndex++
        return <motion.span className="variable-letter" key={index} ref={element => { letterRefs.current[index] = element }} aria-hidden="true">{letter}</motion.span>
      })}
      {wordIndex < words.length - 1 && <span aria-hidden="true">&nbsp;</span>}
    </span>)}
    <span className="sr-only">{label}</span>
  </span>
})

VariableProximity.displayName = 'VariableProximity'
export default VariableProximity
