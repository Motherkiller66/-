import { readFile, writeFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const assetsDir = join('dist', 'assets')
const assets = await readdir(assetsDir)
const cssName = assets.find((name) => name.endsWith('.css'))
const jsName = assets.find((name) => name.endsWith('.js'))

if (!cssName || !jsName) throw new Error('找不到构建后的样式或程序文件')

const [rawCss, rawJs, profile, heroImage] = await Promise.all([
  readFile(join(assetsDir, cssName), 'utf8'),
  readFile(join(assetsDir, jsName), 'utf8'),
  readFile(join('public', 'profile.jpg')),
  readFile(join('public', 'hero-hd.png')),
])

const profileDataUrl = `data:image/jpeg;base64,${profile.toString('base64')}`
const js = rawJs
  .replaceAll('/profile.jpg', profileDataUrl)
const heroDataUrl = `data:image/png;base64,${heroImage.toString('base64')}`
const css = rawCss.replaceAll('/hero-hd.png', heroDataUrl)

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="陈鑫杰的广告创意与视觉表达个人作品集">
  <title>陈鑫杰 / Advertising Portfolio</title>
  <style>${css}</style>
</head>
<body>
  <div id="root"></div>
  <script type="module">${js}</script>
</body>
</html>`

await writeFile('陈鑫杰作品集-点击预览.html', html, 'utf8')
console.log('已生成：陈鑫杰作品集-点击预览.html')
