import fs from "fs";

export function fileExists(filePath: string) {
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      return true;
    }
  }
  return false;
}
