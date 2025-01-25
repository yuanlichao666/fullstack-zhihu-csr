import fs from "fs";
import path from "path";
import { Plugin } from "vite";
import { parse } from "node-html-parser";
import { fileExists } from "@/utils/index";
import { iconfontToIconify } from "@/core/index";

export function IconfontToIconify({
  inputFile = "",
  outputDir = "",
  prefix = "",
  pkgName = "",
}) {
  return {
    name: "vite-plugin-iconfont-to-iconify",

    async buildStart() {
      const inputPath = path.resolve(inputFile);
      if (!fileExists(inputFile)) {
        throw new Error(`Input file not found: ${inputPath}`);
      }
      await iconfontToIconify(inputFile, outputDir, prefix, pkgName);
      console.log(`Iconify JSON generated at: ${outputDir}`);
    },

    // configureServer(server) {
    //   server.middlewares.use((req, res, next) => {
    //     if (req.url === `/${output}`) {
    //       const outputPath = path.resolve(output);
    //       if (fs.existsSync(outputPath)) {
    //         res.setHeader("Content-Type", "application/json");
    //         res.end(fs.readFileSync(outputPath, "utf-8"));
    //       } else {
    //         res.statusCode = 404;
    //         res.end("Iconify JSON not found");
    //       }
    //     } else {
    //       next();
    //     }
    //   });
    // },
  };
}
