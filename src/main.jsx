import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const Arrow = () => <span aria-hidden="true">↗</span>

const projects = [
  { no: '01', type: 'AI VIDEO · CITY PROMOTION', title: '兰州城市宣传 AI 视频', desc: '一段以城市气质与地域文化为线索的 AI 影像练习。后续将在这里补充项目背景、创作思路与个人职责。', media: 'VIDEO / 16:9', action: '视频文件待上传' },
  { no: '02', type: 'AWARD-WINNING AUDIO · 2025', title: '《岛25.2》', award: '第34届时报金犊奖 · 优秀奖', desc: '以“音乐 + AI”重构秦皇岛城市旅游表达。参与核心创意、文案撰写，并使用 Ace Studio、Voisona 辅助音频创作。', media: 'COVER ART', action: '音频文件待上传', audio: true },
  { no: '03', type: 'POSTER DESIGN · COMPETITION', title: '大广赛宣传海报', desc: '从命题洞察到视觉表达的平面创意项目。后续将在这里补充参赛命题、海报成品与设计推导。', media: 'POSTER / PORTRAIT', action: '海报图片待上传' },
  { no: '04', type: 'IP DESIGN · DERIVATIVES', title: 'IP 与衍生产品设计', desc: '围绕角色设定、视觉系统与衍生品落地展开的课程项目。后续可展示角色三视图、包装与产品效果图。', media: 'PROJECT GALLERY', action: '项目图片待上传' },
]

function AudioPlaceholder() {
  const [playing, setPlaying] = useState(false)
  return <div className="audio-player" aria-label="获奖作品音频播放器占位">
    <button onClick={() => setPlaying(!playing)} aria-label={playing ? '暂停音频' : '播放音频'}>{playing ? 'Ⅱ' : '▶'}</button>
    <div className="audio-track"><span style={{width: playing ? '18%' : '0%'}} /></div>
    <span>00:00 / --:--</span>
  </div>
}

function App() {
  const heroVideo = useRef(null)
  return <main>
    <section className="hero" id="top">
      <div className="hero-media" aria-label="首页视频预留区域">
        <div className="ambient one"/><div className="ambient two"/>
        <div className="media-label"><span>HERO VIDEO</span><small>首页视频待上传 · 建议 16:9 MP4</small></div>
      </div>
      <nav>
        <a className="brand" href="#top">CHEN XINJIE<sup>®</sup></a>
        <div className="nav-links"><a href="#about">关于我</a><a href="#work">精选作品</a><a href="#contact">联系我</a></div>
        <a className="nav-cta" href="#contact">LET'S TALK <Arrow/></a>
      </nav>
      <div className="hero-copy">
        <p className="eyebrow">ADVERTISING STUDENT · PORTFOLIO 2026</p>
        <h1>你好，我是<br/><em>陈鑫杰</em></h1>
        <p>一名专注品牌创意与视觉表达的广告学学生。</p>
        <a className="hero-button" href="#work">查看我的作品 <Arrow/></a>
      </div>
      <div className="hero-foot"><span>SCROLL TO EXPLORE</span><i/><span>求职作品集</span></div>
    </section>

    <section className="about wrap" id="about">
      <div className="section-kicker">01 / ABOUT ME</div>
      <div className="about-grid">
        <div className="portrait placeholder"><span>个人照片 / 插画</span><small>PORTRAIT PLACEHOLDER</small></div>
        <div className="about-copy">
          <h2>从洞察出发，让创意成为人与品牌之间的连接。</h2>
          <p>现就读于西北民族大学广告学专业，预计 2027 年毕业。具备市场调研、受众分析、品牌策略、策划提案与传播文案能力，并持续探索 AI 工具在内容生产与营销执行中的可能性。</p>
          <div className="education"><span>EDUCATION</span><strong>西北民族大学 · 广告学本科</strong><small>2023.09 — 2027.06</small></div>
        </div>
        <div className="facts">
          <div><span>LANGUAGE</span><strong>CET-6 · 443</strong><strong>CET-4 · 516</strong></div>
          <div><span>FOCUS</span><p>品牌创意<br/>视觉表达<br/>AI 内容创作</p></div>
          <div><span>STATUS</span><p>寻找广告相关<br/>实习与工作机会</p></div>
        </div>
      </div>
    </section>

    <section className="work" id="work">
      <div className="wrap">
        <header className="section-head"><div><div className="section-kicker">02 / SELECTED WORK</div><h2>精选作品</h2></div><p>作品图片、视频与音频将在资料整理完成后逐步替换。<br/>当前版本用于确认结构与内容层级。</p></header>
        <div className="project-list">
          {projects.map((project) => <article className="project" key={project.no}>
            <div className="project-meta"><span>{project.no}</span><span>{project.type}</span></div>
            <div className={`project-placeholder p${project.no}`}><span>{project.media}</span><small>{project.action}</small></div>
            <div className="project-info">
              <div><h3>{project.title}</h3>{project.award && <p className="award">✦ {project.award}</p>}<p>{project.desc}</p></div>
              <button className="round-button" aria-label={`查看${project.title}`}><Arrow/></button>
            </div>
            {project.audio && <AudioPlaceholder/>}
          </article>)}
        </div>
      </div>
    </section>

    <section className="achievement wrap">
      <div className="section-kicker">03 / EXPERIENCE</div>
      <div className="achievement-grid">
        <h2>不止展示结果，<br/><em>也记录思考。</em></h2>
        <div className="achievement-list">
          <article><span>2025</span><div><h3>第34届时报金犊奖 · 优秀奖</h3><p>秦皇岛旅游形象命题｜城市主题曲《岛25.2》</p></div></article>
          <article><span>校级二等奖</span><div><h3>第12届“挑战杯”大学生课外学术科技作品竞赛</h3><p>市场调研、策略撰写与商业方案策划</p></div></article>
          <article><span>TOOLS</span><div><h3>AI 辅助内容生产</h3><p>ChatGPT · Gemini · Codex · Ace Studio · Voisona</p></div></article>
        </div>
      </div>
    </section>

    <section className="contact" id="contact">
      <div className="contact-glow"/>
      <div className="wrap contact-inner">
        <p className="eyebrow">OPEN FOR OPPORTUNITIES</p>
        <h2>期待与你一起，<br/><em>做点有意思的事。</em></h2>
        <div className="contact-links">
          <a href="tel:13735407844">电话 · 137 3540 7844 <Arrow/></a>
          <a href="mailto:3232285304@qq.com">邮箱 · 3232285304@qq.com <Arrow/></a>
          <span>微信 · 二维码 / 微信号待补充</span>
        </div>
        <footer><span>© 2026 陈鑫杰</span><span>ADVERTISING PORTFOLIO</span><a href="#top">返回顶部 ↑</a></footer>
      </div>
    </section>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
