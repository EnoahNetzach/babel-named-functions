import { transformFileSync } from 'babel-core'
import fs from 'fs'
import path from 'path'

const packagesPath = './packages'

fs.readdirSync(packagesPath)
  .filter(dir => fs.statSync(path.join(packagesPath, dir)).isDirectory())
  .forEach(dir => {
    const srcPath = path.join(packagesPath, dir, 'src')
    const libPath = path.join(packagesPath, dir, 'lib')

    if (!fs.exists(libPath)) {
      fs.mkdirSync(libPath)
    }

    fs.readdirSync(srcPath)
      .forEach(file => fs.writeFile(
        path.join(libPath, file),
        transformFileSync(path.join(srcPath, file)).code
      ))
  })
