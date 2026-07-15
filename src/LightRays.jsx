import { useEffect, useRef } from 'react'
import { Renderer, Program, Triangle, Mesh } from 'ogl'
import './LightRays.css'

const rgb = hex => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1]
}

export default function LightRays({
  raysColor = '#00ffff', raysSpeed = 1.5, lightSpread = .8,
  rayLength = 1.2, followMouse = true, mouseInfluence = .1,
  noiseAmount = .1, distortion = .05, className = ''
}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const renderer = new Renderer({ dpr: Math.min(devicePixelRatio || 1, 2), alpha: true })
    const gl = renderer.gl
    Object.assign(gl.canvas.style, { width: '100%', height: '100%', display: 'block' })
    el.appendChild(gl.canvas)
    const vertex = `attribute vec2 position;varying vec2 vUv;void main(){vUv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`
    const fragment = `precision highp float;uniform float iTime;uniform vec2 iResolution,mousePos;uniform vec3 raysColor;uniform float raysSpeed,lightSpread,rayLength,mouseInfluence,noiseAmount,distortion;varying vec2 vUv;
    float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
    float beam(vec2 p,float offset,float width){float a=atan(p.x,p.y);float wave=sin(a*18.+iTime*raysSpeed+offset)*.5+.5;float core=pow(max(cos(a+offset*.08),0.),1./max(lightSpread,.01));return core*smoothstep(.65,1.,wave)*width;}
    void main(){vec2 uv=gl_FragCoord.xy/iResolution.xy;uv.y=1.-uv.y;vec2 origin=vec2(.5,-.16);vec2 target=mix(vec2(.5,.8),mousePos,mouseInfluence);vec2 p=uv-origin;p.x*=iResolution.x/iResolution.y;float angle=atan(target.x-.5,target.y+.16);float c=cos(angle),s=sin(angle);p=mat2(c,-s,s,c)*p;p.x+=sin(p.y*7.-iTime*1.3)*distortion;float d=length(p);float rays=beam(p,0.,1.)+beam(p,2.1,.72)+beam(p,4.4,.55);float fade=smoothstep(rayLength,0.,d);float grain=mix(1.,hash(uv*iResolution.xy+iTime),noiseAmount);vec3 col=raysColor*rays*fade*grain;gl_FragColor=vec4(col,min(1.,rays*fade));}`
    const uniforms = {
      iTime:{value:0}, iResolution:{value:[1,1]}, mousePos:{value:[.5,.5]},
      raysColor:{value:rgb(raysColor)}, raysSpeed:{value:raysSpeed},
      lightSpread:{value:lightSpread}, rayLength:{value:rayLength},
      mouseInfluence:{value:mouseInfluence}, noiseAmount:{value:noiseAmount}, distortion:{value:distortion}
    }
    const program = new Program(gl, { vertex, fragment, uniforms })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })
    const resize = () => { const r=el.getBoundingClientRect(); renderer.setSize(Math.max(1,r.width),Math.max(1,r.height)); uniforms.iResolution.value=[gl.drawingBufferWidth,gl.drawingBufferHeight] }
    const move = e => { const r=el.getBoundingClientRect(); uniforms.mousePos.value=[(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height] }
    const ro = new ResizeObserver(resize); ro.observe(el); resize()
    if (followMouse) addEventListener('mousemove', move)
    let raf=0
    const loop=t=>{uniforms.iTime.value=t*.001;renderer.render({scene:mesh});raf=requestAnimationFrame(loop)}
    raf=requestAnimationFrame(loop)
    return()=>{cancelAnimationFrame(raf);ro.disconnect();removeEventListener('mousemove',move);gl.canvas.remove()}
  }, [raysColor,raysSpeed,lightSpread,rayLength,followMouse,mouseInfluence,noiseAmount,distortion])
  return <div ref={ref} className={`light-rays-container ${className}`.trim()} />
}
