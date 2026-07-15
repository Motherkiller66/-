import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import './profile.css'
import './interactions.css'
import './work-cases.css'
import './contact.css'
import SideRays from './SideRays'
import BorderGlow from './BorderGlow'
import VariableProximity from './VariableProximity'
import PortfolioMotion from './PortfolioMotion'
import './grainient-theme.css'
import './portfolio-motion.css'

const Arrow = () => <span aria-hidden="true">↗</span>

const projects = [
  { no:'01', type:'AI VIDEO · CITY PROMOTION', title:'兰州城市宣传 AI 视频', desc:'以城市气质与地域文化为线索完成的一分钟 AI 影像练习。', media:'VIDEO / 16:9', action:'视频文件待上传', video:true, background:'围绕兰州城市形象进行短视频创作，在有限时长内呈现城市地标、地域文化与年轻化气质。', idea:'以原创 IP“黄小河”作为城市游览的视觉向导，通过飞行视角串联黄河、白塔山与城市天际线。将“黄小河”融入兰州实景，以明快色彩和轻松节奏呈现城市地标，塑造年轻、亲切且富有想象力的文旅形象。', role:'负责原创 IP“黄小河”的制作、脚本撰写、视频生成与资料搜集。', result:'完成一支约一分钟的兰州城市宣传视频，形成从文本构思到动态影像的完整练习。' },
  { no:'02', type:'AWARD-WINNING AUDIO · 2025', title:'《岛25.2》', award:'第34届时报金犊奖 · 优秀奖', desc:'以“音乐 + AI”重构秦皇岛城市旅游表达。', media:'COVER ART', action:'音频文件待上传', audio:true, background:'围绕秦皇岛城市旅游形象命题进行主题曲创作，以声音建立年轻受众对城市的情感记忆。', idea:'从海洋、港口与城市日常提取意象，通过歌词、旋律和 AI 辅助人声构建具有画面感的听觉叙事。', role:'参与核心创意、资料整理与歌词文案撰写，并使用 Ace Studio、Voisona 辅助音频创作。', result:'作品获得第34届时报金犊奖优秀奖，完成城市主题音频及配套创意阐述。' },
  { no:'03', type:'POSTER DESIGN · COMPETITION', title:'豪士面包大广赛海报', desc:'以数字“0”为核心视觉符号，传达产品健康卖点的平面广告创意。', media:'POSTER / PORTRAIT', action:'海报图片待上传', poster:true, background:'围绕豪士藜麦吐司面包的大广赛命题，将“0 蔗糖、0 色素、0 反式脂肪酸”三项产品卖点转化为直观的视觉传播内容。', idea:'提取数字“0”作为核心设计元素，通过大量重复排列构成面包主体，让产品外形与健康卖点形成视觉双关；搭配麦穗、产品包装和蓝金色文案，强化自然、健康与品牌识别。', role:'命题分析、产品卖点提炼、创意发想、广告文案、版式设计与视觉执行。', result:'完成豪士面包参赛海报及设计说明，形成从策略提炼到视觉成品的完整平面广告方案。' },
  { no:'04', type:'IP DESIGN · DERIVATIVES', title:'IP 与衍生产品设计', desc:'从角色塑造到文创落地，探索 IP 在品牌与地域文化中的多元表达。', media:'PROJECT GALLERY', action:'项目图片待上传', ipGallery:true, background:'围绕城市文化、品牌传播与文创开发等不同命题，完成“黄小河”、可口可乐 IP 及刘家峡文创三组角色与视觉应用练习。', idea:'从地域符号和品牌特征中提取造型、色彩与性格线索，再将角色语言延展到手机壳、帆布包、文创徽章和品牌视觉中，建立统一且具有亲和力的表达。', role:'独立完成资料搜集、创意构思、角色设定、视觉设计、衍生产品构思及效果图呈现，并持续调整角色与应用场景之间的视觉一致性。', result:'形成三组不同方向的 IP 与文创作品，涵盖角色多视图、可口可乐 IP 及产品衍生、地域文创视觉，展示从概念到应用的完整设计过程。' },
]

const islandLyrics = [
  { time: 0, section: 'VERSE 01', text: '老码头的木吉他' },
  { time: 2.8, text: '把夜色弹成咸湿湿的叹息' },
  { time: 6, text: '潮汐在啤酒瓶底锈成蓝' },
  { time: 10.3, text: '阿那亚的月亮' },
  { time: 12.4, text: '是枚生锈硬币投进自动点唱机' },
  { time: 20.3, section: 'VERSE 02', text: '渔船提着烟斗' },
  { time: 22.9, text: '吐出一长串霓虹的鲅鱼' },
  { time: 26.5, text: '山海关把皱纹泡在浪花里发酵' },
  { time: 31.4, text: '鸽子窝的相机吞下三秒日升' },
  { time: 35.7, text: '底片却冲出两千年前的晒盐谣' },
  { time: 41.1, section: 'BRIDGE', text: '始皇的仙丹早被冲浪板碾碎' },
  { time: 43.6, text: '孟姜女的泪珠成了网红耳坠' },
  { time: 46.7, text: '无人机偷走老龙头的咳嗽声' },
  { time: 49.3, text: '外卖小哥车筐里海风在劈叉' },
  { time: 54.5, section: 'CHORUS 01', text: '秦皇岛（灵魂岛）' },
  { time: 55.3, text: '秦皇岛' },
  { time: 57, text: '每个浪头都是迷路的蓝调' },
  { time: 59.7, text: '沙粒在吉他箱里跳踢踏舞' },
  { time: 61.8, text: '来踩碎我、踩碎我、踩碎我' },
  { time: 63.8, text: '单曲循环的孤岛' },
  { time: 109.8, section: 'CHORUS 02', text: '秦皇岛（心慌慌）' },
  { time: 110.4, text: '秦皇岛' },
  { time: 111.4, text: '每个浪头都是迷路的蓝调' },
  { time: 113.8, text: '沙粒在吉他箱里跳踢踏舞' },
  { time: 117.5, text: '来踩碎我、踩碎我、踩碎我单曲循环的孤岛' },
]

function AwardAudioPlayer() {
  const audioRef = useRef(null)
  const lyricsRef = useRef(null)
  const lyricLineRefs = useRef([])
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const activeLyric = islandLyrics.reduce((active, line, index) => currentTime >= line.time ? index : active, -1)
  useEffect(() => {
    const container = lyricsRef.current
    const line = lyricLineRefs.current[activeLyric]
    if (!container || !line) return
    container.scrollTo({
      top: line.offsetTop - container.clientHeight / 2 + line.clientHeight / 2,
      behavior: 'smooth',
    })
  }, [activeLyric])
  const toggleAudio = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      try { await audio.play() } catch (error) { console.warn('音频播放失败', error) }
    } else {
      audio.pause()
    }
  }
  const seekAudio = event => {
    const time = Number(event.target.value)
    if (audioRef.current) audioRef.current.currentTime = time
    setCurrentTime(time)
  }
  const changeVolume = event => {
    const nextVolume = Number(event.target.value)
    if (audioRef.current) {
      audioRef.current.volume = nextVolume
      audioRef.current.muted = nextVolume === 0
    }
    setVolume(nextVolume)
    setMuted(nextVolume === 0)
  }
  const toggleMute = () => {
    const nextMuted = !muted
    if (audioRef.current) audioRef.current.muted = nextMuted
    setMuted(nextMuted)
  }
  const seekToLyric = time => {
    if (audioRef.current) audioRef.current.currentTime = time
    setCurrentTime(time)
  }
  const formatTime = seconds => {
    if (!Number.isFinite(seconds)) return '00:00'
    const minutes = Math.floor(seconds / 60)
    return `${String(minutes).padStart(2, '0')}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`
  }
  return <div className="audio-experience">
    <div className="audio-player" aria-label="《岛25.2》音频播放器">
      <audio
        ref={audioRef}
        src="/island-25-2.mp3"
        preload="metadata"
        onLoadedMetadata={event => setDuration(event.currentTarget.duration)}
        onTimeUpdate={event => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setCurrentTime(0) }}
      />
      <button onClick={toggleAudio} aria-label={playing ? '暂停《岛25.2》' : '播放《岛25.2》'}>{playing ? 'Ⅱ' : '▶'}</button>
      <input className="audio-progress" type="range" min="0" max={duration || 0} step="0.1" value={Math.min(currentTime, duration || 0)} onChange={seekAudio} aria-label="《岛25.2》播放进度" />
      <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
      <button className="audio-mute" onClick={toggleMute} aria-label={muted ? '取消静音' : '静音'}><span aria-hidden="true">{muted ? '🔇' : '🔊'}</span></button>
      <input className="audio-volume" type="range" min="0" max="1" step="0.05" value={muted ? 0 : volume} onChange={changeVolume} aria-label="《岛25.2》音量" />
    </div>
    <div className="synced-lyrics" aria-label="《岛25.2》同步歌词">
      <div className="lyrics-heading"><span>歌词</span><small>点击歌词可跳转</small></div>
      <div className="lyrics-window" ref={lyricsRef}>
        {islandLyrics.map((line, index) => <button
          key={`${line.time}-${line.text}`}
          ref={element => { lyricLineRefs.current[index] = element }}
          className={index === activeLyric ? 'is-active' : index < activeLyric ? 'is-past' : ''}
          onClick={() => seekToLyric(line.time)}
          aria-current={index === activeLyric ? 'true' : undefined}
        >
          <span>{line.text}</span>
        </button>)}
      </div>
    </div>
  </div>
}

function ProjectVideo() {
  const videoRef = useRef(null)
  const controlsTimerRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const showControls = () => {
    setControlsVisible(true)
    window.clearTimeout(controlsTimerRef.current)
    controlsTimerRef.current = window.setTimeout(() => setControlsVisible(false), 2500)
  }
  const hideControls = () => {
    window.clearTimeout(controlsTimerRef.current)
    setControlsVisible(false)
  }
  useEffect(() => {
    controlsTimerRef.current = window.setTimeout(() => setControlsVisible(false), 2500)
    return () => window.clearTimeout(controlsTimerRef.current)
  }, [])
  const toggleVideo = async () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      try { await video.play() } catch (error) { console.warn('视频播放失败', error) }
    } else {
      video.pause()
    }
  }
  const seekVideo = event => {
    const time = Number(event.target.value)
    if (videoRef.current) videoRef.current.currentTime = time
    setCurrentTime(time)
  }
  const changeVolume = event => {
    const nextVolume = Number(event.target.value)
    if (videoRef.current) {
      videoRef.current.volume = nextVolume
      videoRef.current.muted = nextVolume === 0
    }
    setVolume(nextVolume)
    setMuted(nextVolume === 0)
  }
  const toggleMute = () => {
    const nextMuted = !muted
    if (videoRef.current) videoRef.current.muted = nextMuted
    setMuted(nextMuted)
  }
  const formatTime = seconds => {
    if (!Number.isFinite(seconds)) return '00:00'
    const minutes = Math.floor(seconds / 60)
    return `${String(minutes).padStart(2,'0')}:${String(Math.floor(seconds % 60)).padStart(2,'0')}`
  }
  return <div
    className={`case-media case-video${playing ? ' is-playing' : ''}`}
    onMouseEnter={showControls}
    onMouseMove={showControls}
    onMouseLeave={hideControls}
  >
    <video
      ref={videoRef}
      src="/lanzhou-ai-video-web.mp4"
      preload="metadata"
      playsInline
      onClick={toggleVideo}
      onLoadedMetadata={event => setDuration(event.currentTarget.duration)}
      onTimeUpdate={event => setCurrentTime(event.currentTarget.currentTime)}
      onPlay={() => { setPlaying(true); showControls() }}
      onPause={() => { setPlaying(false); showControls() }}
      onEnded={() => setPlaying(false)}
      aria-label="兰州城市宣传 AI 视频"
    />
    {!playing && <button className="video-play-button" onClick={toggleVideo} aria-label="播放兰州城市宣传 AI 视频"><span>▶</span><b>{currentTime > 0 ? '继续播放' : '播放视频'}</b></button>}
    <div className={`custom-video-controls${controlsVisible ? ' is-visible' : ''}`} onClick={event => event.stopPropagation()}>
      <button className="control-play" onClick={toggleVideo} aria-label={playing ? '暂停' : '播放'}>{playing ? 'Ⅱ' : '▶'}</button>
      <span className="video-time">{formatTime(currentTime)}</span>
      <input className="video-progress" type="range" min="0" max={duration || 0} step="0.1" value={Math.min(currentTime,duration || 0)} onChange={seekVideo} aria-label="视频播放进度"/>
      <span className="video-time">{formatTime(duration)}</span>
      <button className="control-mute" onClick={toggleMute} aria-label={muted ? '取消静音' : '静音'}>{muted ? '静音' : '音量'}</button>
      <input className="video-volume" type="range" min="0" max="1" step="0.05" value={muted ? 0 : volume} onChange={changeVolume} aria-label="视频音量"/>
      <button className="control-fullscreen" onClick={() => videoRef.current?.requestFullscreen?.()} aria-label="全屏播放">全屏</button>
    </div>
  </div>
}

const ipGalleryItems = [
  { no: '01', title: '黄小河·角色正面', subtitle: 'CHARACTER FRONT', src: '/ip-huangxiaohe-front-v4.png', alt: '黄小河 IP 角色正面设计' },
  { no: '02', title: '黄小河·角色侧面', subtitle: 'CHARACTER SIDE', src: '/ip-huangxiaohe-side-v4.png', alt: '黄小河 IP 角色侧面设计' },
  { no: '03', title: '黄小河·角色背面', subtitle: 'CHARACTER BACK', src: '/ip-huangxiaohe-back-v4.png', alt: '黄小河 IP 角色背面设计' },
  { no: '04', title: '可口可乐 IP 角色', subtitle: 'COCA-COLA IP', src: '/ip-brand-character.png', alt: '可口可乐 IP 角色设计' },
  { no: '05', title: '可口可乐手机壳', subtitle: 'PHONE CASE', src: '/ip-phone-case.png', alt: '可口可乐 IP 手机壳衍生产品设计' },
  { no: '06', title: '可口可乐帆布包', subtitle: 'TOTE BAG', src: '/ip-tote-bag.png', alt: '可口可乐 IP 帆布包衍生产品设计' },
  { no: '07', title: '刘家峡文创徽章', subtitle: 'CULTURAL PRODUCT', src: '/ip-liujiaxia-badge-v4.png', alt: '刘家峡文创徽章设计' },
  { no: '08', title: '刘家峡品牌视觉', subtitle: 'BRAND IDENTITY', src: '/ip-liujiaxia-identity-v2.png', alt: '刘家峡品牌标志与视觉应用设计' },
]

function IpGallery() {
  const galleryRef = useRef(null)
  const wheelTargetRef = useRef(0)
  const wheelFrameRef = useRef(null)
  const loopItems = [0, 1, 2].flatMap(copy => ipGalleryItems.map((item, index) => ({ ...item, copy, index })))
  const getLoopMetrics = gallery => {
    const cards = gallery?.children
    if (!cards || cards.length < ipGalleryItems.length * 3) return null
    const middleStart = cards[ipGalleryItems.length].offsetLeft
    const lastStart = cards[ipGalleryItems.length * 2].offsetLeft
    return { middleStart, segmentWidth: lastStart - middleStart }
  }
  const normalizeLoop = gallery => {
    const metrics = getLoopMetrics(gallery)
    if (!metrics) return 0
    const { middleStart, segmentWidth } = metrics
    if (gallery.scrollLeft < middleStart - segmentWidth * .96) {
      gallery.scrollLeft += segmentWidth
      return segmentWidth
    }
    if (gallery.scrollLeft > middleStart + segmentWidth * .96) {
      gallery.scrollLeft -= segmentWidth
      return -segmentWidth
    }
    return 0
  }
  useEffect(() => {
    const gallery = galleryRef.current
    const metrics = getLoopMetrics(gallery)
    if (!gallery || !metrics) return
    const wheelArea = gallery
    gallery.scrollLeft = metrics.middleStart
    wheelTargetRef.current = metrics.middleStart
    const handleWheel = event => {
      event.preventDefault()
      event.stopPropagation()
      const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX
      wheelTargetRef.current = (wheelFrameRef.current ? wheelTargetRef.current : gallery.scrollLeft) + delta * 1.35
      if (wheelFrameRef.current) return
      const animate = () => {
        const distance = wheelTargetRef.current - gallery.scrollLeft
        if (Math.abs(distance) < .35) {
          gallery.scrollLeft = wheelTargetRef.current
          wheelFrameRef.current = null
          return
        }
        gallery.scrollLeft += distance * .14
        const adjustment = normalizeLoop(gallery)
        if (adjustment) wheelTargetRef.current += adjustment
        wheelFrameRef.current = window.requestAnimationFrame(animate)
      }
      wheelFrameRef.current = window.requestAnimationFrame(animate)
    }
    wheelArea.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      wheelArea.removeEventListener('wheel', handleWheel)
      if (wheelFrameRef.current) window.cancelAnimationFrame(wheelFrameRef.current)
    }
  }, [])
  return <div className="ip-gallery" aria-label="IP 与衍生产品横向图片画廊">
    <div className="ip-gallery-head">
      <span>鼠标悬停后滚动滚轮 · 循环浏览</span>
    </div>
    <div className="ip-gallery-track" ref={galleryRef} onScroll={event => { if (!wheelFrameRef.current) normalizeLoop(event.currentTarget) }}>
      {loopItems.map(item => <figure className={`ip-gallery-card tone-${item.index + 1}`} key={`${item.copy}-${item.no}`} aria-hidden={item.copy !== 1}>
        <div className="ip-gallery-card-inner">
          <div
            className="ip-gallery-visual"
            role={item.copy === 1 ? 'img' : undefined}
            aria-label={item.copy === 1 ? item.alt : undefined}
            style={{ backgroundImage: `url("${item.src}")` }}
          />
          <figcaption><div><strong>{item.title}</strong><small>{item.subtitle}</small></div></figcaption>
        </div>
      </figure>)}
    </div>
  </div>
}

function ProjectCase({ project }) {
  const [open, setOpen] = useState(false)
  return <BorderGlow as="article" className={`project-case work-glow${project.ipGallery ? ' is-gallery-case' : ''}${open ? ' is-open' : ''}`} edgeSensitivity={26} glowRadius={42} glowIntensity={.8} fillOpacity={.16} borderRadius={18}>
    <div className="case-meta"><span>{project.no}</span><span>{project.type}</span></div>
    {project.ipGallery ? <div className="ip-gallery-layout">
      <div className="ip-gallery-title">
        <div><h3>{project.title}</h3><p>{project.desc}</p></div>
        <button className="ip-gallery-open" onClick={() => setOpen(!open)} aria-expanded={open}>
          <span>{open ? '收起案例' : '查看完整案例'}</span><b aria-hidden="true">{open ? '−' : '+'}</b>
        </button>
      </div>
      <IpGallery />
    </div> : <div className="case-summary">
      {project.video
        ? <ProjectVideo/>
        : project.audio
          ? <div className="case-media case-cover"><img src="/island-25-2-cover.png" alt="《岛25.2》主题曲封面" /></div>
          : project.poster
            ? <div className="case-media case-poster"><img src="/haoshi-bread-poster.jpg" alt="豪士面包大广赛宣传海报" /></div>
          : <div className={`project-placeholder case-media p${project.no}`}><span>{project.media}</span><small>{project.action}</small></div>}
      <div className="case-copy">
        <h3>{project.title}</h3>
        {project.award && <p className="award">✦ {project.award}</p>}
        <p className="case-desc">{project.desc}</p>
        {project.audio && <AwardAudioPlayer/>}
        <button className="case-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
          <span>{open ? '收起案例' : '查看完整案例'}</span><b aria-hidden="true">{open ? '−' : '+'}</b>
        </button>
      </div>
    </div>}
    <div className="case-details" aria-hidden={!open}>
      <article><span>01</span><h4>项目背景</h4><p>{project.background}</p></article>
      <article><span>02</span><h4>创作思路</h4><p>{project.idea}</p></article>
      <article><span>03</span><h4>个人职责</h4><p>{project.role}</p></article>
      <article><span>04</span><h4>项目成果</h4><p>{project.result}</p></article>
    </div>
  </BorderGlow>
}

const ProfileGlow = ({ children, className = '' }) => <BorderGlow as="article" className={`profile-glow ${className}`} edgeSensitivity={34} glowRadius={24} glowIntensity={.65} fillOpacity={.12} borderRadius={12}>{children}</BorderGlow>

function App() {
  const heroVideo = useRef(null)
  const aboutTitleRef = useRef(null)
  const [wechatCopied, setWechatCopied] = useState(false)
  const copyWechat = async () => {
    await navigator.clipboard.writeText('_nocilantro_0')
    setWechatCopied(true)
    window.setTimeout(() => setWechatCopied(false), 1800)
  }
  const tiltContactCard = event => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    card.style.setProperty('--pointer-x', `${x * 100}%`)
    card.style.setProperty('--pointer-y', `${y * 100}%`)
    card.style.transform = `perspective(850px) rotateX(${(0.5 - y) * 16}deg) rotateY(${(x - 0.5) * 16}deg) translateY(-5px) scale(1.015)`
  }
  const resetContactCard = event => {
    event.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)'
  }
  return <main>
    <PortfolioMotion />
    <div className="opening-sequence" aria-hidden="true">
      <div className="opening-panel"/><div className="opening-panel"/><div className="opening-panel"/><div className="opening-panel"/>
      <div className="opening-mark">CHEN XINJIE · PORTFOLIO 2026</div>
    </div>
    <SideRays
      className="site-side-rays"
      speed={2.5}
      rayColor1="#ffc100"
      rayColor2="#93c3f7"
      intensity={2}
      spread={2}
      origin="top-right"
      tilt={0}
      saturation={1.5}
      blend={0.75}
      falloff={1.6}
      opacity={1}
    />
    <nav aria-label="主导航">
      <a className="brand" href="#top">CHEN XINJIE<sup>®</sup></a>
      <div className="nav-links"><a href="#about">关于我</a><a href="#work">精选作品</a><a href="#contact">联系我</a></div>
      <a className="nav-cta" href="#contact"><span className="mail-icon" aria-hidden="true">✉</span><span>联系我</span></a>
    </nav>
    <section className="hero" id="top">
      <div className="hero-media" aria-label="首页视频预留区域">
        <video
          ref={heroVideo}
          className="hero-video"
          src="/hero-video-web.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="首页动态背景视频"
        />
        <div className="ambient one"/><div className="ambient two"/>
      </div>
      <div className="hero-copy">
        <p className="eyebrow">ADVERTISING STUDENT · PORTFOLIO 2026</p>
        <h1 aria-label="CHENXINJIE">{'CHENXINJIE'.split('').map((letter, index) => <span className="hero-title-char" aria-hidden="true" key={`${letter}-${index}`}>{letter}</span>)}</h1>
      </div>
      <div className="hero-bottom-copy">
        <p>一名专注品牌创意与视觉表达的广告学学生</p>
        <a className="hero-button" href="#work">查看我的作品 <Arrow/></a>
      </div>
    </section>

    <section className="about wrap" id="about">
      <h2 className="about-section-title">关于我</h2>
      <div className="about-grid">
        <figure className="portrait portrait-photo"><img src="/profile.jpg" alt="陈鑫杰个人照片"/><figcaption>CHEN XINJIE · PORTRAIT</figcaption></figure>
        <div className="about-copy about-profile">
          <p className="about-label">个人简介</p>
          <h2 ref={aboutTitleRef} className="about-variable-title">
            <VariableProximity label="Hi, I am" className="vp-green" containerRef={aboutTitleRef} radius={150} falloff="gaussian" />{' '}
            <VariableProximity label="CHENXINJIE!" className="vp-light" containerRef={aboutTitleRef} radius={150} falloff="gaussian" />
          </h2>
          <p>一名就读于西北民族大学广告学专业的学生，预计于 2027 年毕业。</p>
          <p>我系统学习了广告策划、品牌传播、市场调研、消费者行为分析、广告文案、视觉设计与新媒体运营等核心课程，具备市场洞察、创意策划、文案表达与视觉设计能力。</p>
          <p>通过 IP 及衍生产品、宣传海报、城市主题音频和 AI 宣传视频等项目，我不断探索人工智能工具与广告创意的结合，并持续提升自己的学习能力与内容创作能力。</p>
          <div className="about-details">
            <ProfileGlow><span>教育经历</span><strong>西北民族大学 · 广告学本科</strong><small>2023.09 — 2027.06</small></ProfileGlow>
            <ProfileGlow><span>英语能力</span><strong>CET-4 · 516</strong><strong>CET-6 · 443</strong></ProfileGlow>
            <ProfileGlow><span>求职方向</span><p>广告策划 · 品牌策划 · 视觉设计<br/>新媒体运营 · AI 创意</p></ProfileGlow>
            <ProfileGlow className="tools-card"><span>工具能力</span><div><b>视觉设计</b><p>Adobe Photoshop · Adobe Illustrator</p><b>视频与办公</b><p>DaVinci Resolve · PowerPoint · Excel</p><b>AI 内容创作</b><p>ChatGPT · Gemini · Codex · Ace Studio · Voisona</p></div></ProfileGlow>
          </div>
        </div>
      </div>
    </section>

    <section className="work" id="work">
      <div className="wrap">
        <header className="section-head"><div><h2>精选作品</h2></div></header>
        <div className="project-list">
          {projects.map(project => <ProjectCase project={project} key={project.no}/>)}
        </div>
      </div>
    </section>

    <section className="contact" id="contact">
      <div className="contact-glow"/>
      <div className="wrap contact-inner">
        <div className="contact-layout">
          <div className="contact-copy">
            <span className="contact-label">联系我</span>
            <h2 className="contact-title-effect">
              <span className="contact-title-back">期待与你一起，<br/><em>做点有意思的事</em></span>
              <span className="contact-title-front" aria-hidden="true">期待与你一起，<br/><em>做点有意思的事</em></span>
            </h2>
            <p>目前正在寻找广告策划、品牌创意、AI 创意、视觉设计与新媒体运营相关实习机会。</p>
            <div className="contact-status"><span>寻找实习</span><span>2027 年毕业</span></div>
            <a className="resume-button" href="./陈鑫杰的简历.docx" download>下载个人简历 <Arrow/></a>
          </div>
          <aside className="contact-card" onPointerMove={tiltContactCard} onPointerLeave={resetContactCard}>
            <div className="qr-frame"><img src="./wechat-qr-green.jpg" alt="陈鑫杰的微信二维码"/></div>
            <div className="contact-card-body">
              <div className="wechat-heading"><div><small>微信联系</small><strong>_nocilantro_0</strong></div><button type="button" onClick={copyWechat}>{wechatCopied ? '已复制' : '复制'}</button></div>
              <a href="tel:13735407844"><span>电话</span><strong>137 3540 7844</strong><Arrow/></a>
              <a href="mailto:3232285304@qq.com"><span>邮箱</span><strong>3232285304@qq.com</strong><Arrow/></a>
            </div>
          </aside>
        </div>
        <footer><span>© 2026 陈鑫杰</span><span>ADVERTISING PORTFOLIO</span><a className="back-top-button" href="#top" aria-label="返回顶部"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 5.5 10.5l1.4 1.4 4.1-4.1V20h2V7.8l4.1 4.1 1.4-1.4L12 4Z"/></svg><span>返回顶部</span></a></footer>
      </div>
    </section>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
