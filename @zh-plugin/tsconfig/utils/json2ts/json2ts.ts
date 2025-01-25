import { compileFromFile } from "json-schema-to-typescript";
import * as fs from "node:fs";
import * as path from "node:path";

/**
  这是一个命令行程序，直接执行并在当前目录下生成 tsconfig.d.ts 文件
  让我们能在ts中直接声明某个对象为tsconfig中的类型
  使用方法：npm run gen-tsconfig-type
 */

async function generateTypes() {
  const sourceFile = path.resolve(__dirname, "tsconfig.schema.json");
  const targetFile = path.resolve(__dirname, "tsconfig.generated.d.ts");
  return Promise.resolve()
    .then(() => compileFromFile(sourceFile))
    .then((tsTypes) => fs.writeFileSync(targetFile, tsTypes))
    .catch((e) => {
      console.log("tsconfig类型生成失败");
      console.log(e);
    });
}
generateTypes();
