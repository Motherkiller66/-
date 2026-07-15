import { useEffect, useRef } from 'react'
import { Renderer, Program, Triangle, Mesh } from 'ogl'
import './SideRays.css'

const toRgb=hex=>{const m=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);return m?[parseInt(m[1],16)/255,parseInt(m[2],16)/255,parseInt(m[3],16)/255]:[1,1,1]}
const flips=origin=>origin==='top-left'?[1,0]:origin==='bottom-right'?[0,1]:origin==='bottom-left'?[1,1]:[0,0]

export default function SideRays({speed=2.5,rayColor1='#ffc100',rayColor2='#93c3f7',intensity=2,spread=2,origin='top-right',tilt=0,saturation=1.5,blend=.75,falloff=1.6,opacity=1,className=''}){
 const ref=useRef(null)
 useEffect(()=>{const el=ref.current;if(!el)return;const renderer=new Renderer({dpr:Math.min(devicePixelRatio||1,2),alpha:true}),gl=renderer.gl;Object.assign(gl.canvas.style,{width:'100%',height:'100%',display:'block'});el.appendChild(gl.canvas)
 const vertex=`attribute vec2 position;void main(){gl_Position=vec4(position,0.,1.);}`
 const fragment=`precision highp float;uniform float iTime;uniform vec2 iResolution;uniform float iSpeed;uniform vec3 iRayColor1,iRayColor2;uniform float iIntensity,iSpread,iFlipX,iFlipY,iTilt,iSaturation,iBlend,iFalloff,iOpacity;
 float strength(vec2 src,vec2 dir,vec2 p,float a,float b,float sp){vec2 v=p-src;float ca=dot(normalize(v),dir);return clamp((.45+.15*sin(ca*a+iTime*sp))+(.3+.2*cos(-ca*b+iTime*sp)),0.,1.)*clamp((iResolution.x-length(v))/iResolution.x,.5,1.);}
 void main(){vec2 f=gl_FragCoord.xy;if(iFlipX>.5)f.x=iResolution.x-f.x;if(iFlipY>.5)f.y=iResolution.y-f.y;vec2 p=vec2(f.x,iResolution.y-f.y),src=vec2(iResolution.x*1.1,-.5*iResolution.y);float tr=iTilt*3.14159265/180.,cs=cos(tr),sn=sin(tr);vec2 q=p-src;p=vec2(q.x*cs-q.y*sn,q.x*sn+q.y*cs)+src;float hs=iSpread*.275;vec2 d1=normalize(vec2(cos(.785398+hs),sin(.785398+hs))),d2=normalize(vec2(cos(.785398-hs),sin(.785398-hs)));vec3 c=iRayColor1*strength(src,d1,p,36.2214,21.11349,iSpeed)*(1.-iBlend)*.9+iRayColor2*strength(src,d2,p,22.3991,18.0234,iSpeed*.2)*iBlend*.9;float dist=length(f-vec2(src.x,iResolution.y-src.y))/iResolution.y;c*=iIntensity*.4/pow(max(dist,.001),iFalloff);float gray=dot(c,vec3(.299,.587,.114));c=mix(vec3(gray),c,iSaturation);gl_FragColor=vec4(c,max(c.r,max(c.g,c.b))*iOpacity);}`
 const [fx,fy]=flips(origin),uniforms={iTime:{value:0},iResolution:{value:[1,1]},iSpeed:{value:speed},iRayColor1:{value:toRgb(rayColor1)},iRayColor2:{value:toRgb(rayColor2)},iIntensity:{value:intensity},iSpread:{value:spread},iFlipX:{value:fx},iFlipY:{value:fy},iTilt:{value:tilt},iSaturation:{value:saturation},iBlend:{value:blend},iFalloff:{value:falloff},iOpacity:{value:opacity}}
 const program=new Program(gl,{vertex,fragment,uniforms}),mesh=new Mesh(gl,{geometry:new Triangle(gl),program});const resize=()=>{const r=el.getBoundingClientRect();renderer.setSize(Math.max(1,r.width),Math.max(1,r.height));uniforms.iResolution.value=[gl.drawingBufferWidth,gl.drawingBufferHeight]};const ro=new ResizeObserver(resize);ro.observe(el);resize();let raf=0;const loop=t=>{uniforms.iTime.value=t*.001;renderer.render({scene:mesh});raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop);return()=>{cancelAnimationFrame(raf);ro.disconnect();gl.canvas.remove()}},[speed,rayColor1,rayColor2,intensity,spread,origin,tilt,saturation,blend,falloff,opacity])
 return <div ref={ref} className={`side-rays-container ${className}`.trim()}/>
}
