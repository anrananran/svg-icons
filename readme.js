const walk = require('walkdir')
const fs = require('fs')
const path = require('path')

const emitter = walk('./src/icons/svg')
const content = {
  items: []
}

function parseCatalog(items) {
  let str = ``
  items.forEach(item => {
    str += `![${item}](${item}) \n`
  })
  return str
}

emitter.on('file', function(file) {
  if (file && file.endsWith('.svg')) {
    const p = path.relative(__dirname, file)
    content.items.push(p.replace(/\\/g, '/'))
  }
})
emitter.on('end', function() {
  const mdCont = `
#### svg图标搜集！enjoy！\n
${parseCatalog(content.items)}
  `

  fs.writeFile('./README.md', mdCont, () => {
    console.log('写入Readme完成')
  })
})
