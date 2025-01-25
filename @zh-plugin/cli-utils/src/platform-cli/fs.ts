import {glob} from "glob";

export function getAllFiles(folder: string) {
  return glob.sync('**/*', { cwd: folder, nodir: true }) // 递归获取文件路径
}
