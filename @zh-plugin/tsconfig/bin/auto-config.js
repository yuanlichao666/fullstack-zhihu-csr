import * as path from "node:path";
import { execTs } from "@zh-plugin/exec/lib/exec-ts.js";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tsFile = path.resolve(__dirname, "../core/manage-tsconfig.ts");
const tsConfig = path.resolve(__dirname, "../tsconfig.json");
execTs(tsFile, tsConfig);
