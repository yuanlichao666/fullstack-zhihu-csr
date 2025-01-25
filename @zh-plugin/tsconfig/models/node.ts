import { Config } from "@/utils/json2ts/tsconfig.renamed";
import { getCwdPath } from "@zh-plugin/cli-utils";
import { glob } from "node:fs";
import { sync } from "glob";
import { addFilesToInclude } from "@/models/operate";
import * as path from "node:path";

export function handleNodeConfig(config: Config) {
  return includeFilesInRoot(config);
}

function includeFilesInRoot(config: Config) {
  const cwd = getCwdPath();
  const filesInRoot = sync("*.ts", { cwd, nodir: true }).map((item) => {
    return path.relative(cwd, item);
  });
  return addFilesToInclude(filesInRoot, config);
}
