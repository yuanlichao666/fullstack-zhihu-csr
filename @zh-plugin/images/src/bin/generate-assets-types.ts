import * as path from 'node:path'
import * as fs from 'node:fs'
import { sync } from 'glob'
import {flowRight} from 'lodash'
import {getCwdPath} from "@zh-plugin/cli-utils";

const cwdPath = getCwdPath()
const assetsPath = path.resolve(cwdPath, 'src/assets')
const outputPath = path.resolve(cwdPath, 'src/assets/assets.d.ts')

function getAllFiles() {
  return sync('**/*', { cwd: assetsPath, nodir: true })
}
function generateKeys(files: string[]) {
  return files.map((file) => {
    return file
      .replace(/\.[^/.]+$/, '')
      .replace(/[-\s]/g, '_')
      .replace(/\//g, '.')
  })
}

const generateTypeDefinitions = (keys: string[]) => {
  debugger
  return `
    export declare global {
      type Images = "${keys.join('"|"')}"
    }
    `
}

function writeCodeToFile(code: string) {
  fs.writeFileSync(outputPath, code, 'utf8')
}

function generateAssetsTypes() {
  try {
    flowRight(writeCodeToFile, generateTypeDefinitions, generateKeys, getAllFiles)()
    console.log('✅ Successfully generated assets.d.ts')
  } catch (error) {
    console.error('❌ Error generating assets.d.ts:', (error as Error).message)
  }
}
// 执行生成任务
generateAssetsTypes()
