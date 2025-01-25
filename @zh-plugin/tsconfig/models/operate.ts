import { Config } from "@/utils/json2ts/tsconfig.renamed";

export function addFilesToInclude(files: string[], config: Config) {
  config.include = Array.from(
    new Set([...(config.include as Array<string>), files]),
  );
  return config;
}

export function addFilesToExclude(files: string[], config: Config) {
  config.include = Array.from(
    new Set([...(config.include as Array<string>), files]),
  );
  return config;
}
