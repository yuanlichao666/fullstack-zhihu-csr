import { getCwdPath } from "@zh-plugin/cli-utils";
import { handlers } from "@/models";
import * as path from "node:path";
import { Config } from "@/utils/json2ts/tsconfig.renamed";
import * as fs from "node:fs";

export function manageConfigs() {
  debugger;
  const exitsConfigs = getProjectConfig();
  Array.from(exitsConfigs.keys()).forEach((key) => {
    if (handlers[key]) {
      applyHandler(key, exitsConfigs);
      writeNewConfig(key, exitsConfigs);
    }
  });
}

function applyHandler(key: string, configMap: Map<string, Config>) {
  //key是一个完整的文件路径，获取他的文件名，比如ts.xx.json
  const fileName = path.basename(key);
  if (handlers[fileName]) {
    const newConfig = handlers[fileName](configMap.get(key));
    configMap.set(key, newConfig);
  }
}

function writeNewConfig(key: string, configMap: Map<string, Config>) {
  const config = configMap.get(key);
  const fileContent = JSON.stringify(config);
  fs.writeFileSync(key, fileContent, "utf8");
}

function getProjectConfig() {
  const file = path.resolve(getCwdPath(), "tsconfig.json");
  return collectConfigFile(file, new Map());
}
function collectConfigFile(
  sourceFile: string,
  configMap: Map<string, Config> = new Map(),
) {
  const config: Config = JSON.parse(fs.readFileSync(sourceFile, "utf8"));
  if (config && !configMap.has(sourceFile)) {
    configMap.set(sourceFile, config);
  }
  debugger;
  if (config.references) {
    collectReferences(sourceFile, config.references, configMap);
  }
  return configMap;
}

function collectReferences(
  currentFile: string,
  references: any,
  configMap: Map<string, Config>,
) {
  if (!Array.isArray(references)) return;

  const currentDir = path.dirname(currentFile);
  references.forEach((item) => {
    const refPath =
      item !== null && typeof item === "object" ? item.path : item;
    debugger;
    const referenceFile = path.join(currentDir, refPath);
    collectConfigFile(referenceFile, configMap);
  });
}

manageConfigs();
