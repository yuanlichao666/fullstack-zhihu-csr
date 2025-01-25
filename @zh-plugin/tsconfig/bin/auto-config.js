import * as path from "node:path";
import { execTs } from "@zh-plugin/exec/lib";

const tsFile = path.resolve(__dirname, "../core/manage-tsconfig.ts");
const tsConfig = path.resolve(__dirname, "../tsconfig.json");
execTs(tsFile, tsConfig);
