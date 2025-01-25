import { IconSet, exportJSONPackage } from "@iconify/tools";
import { parse } from "node-html-parser";
import path from "path";
import fs from "fs";

function readAndMatchContent(iconfontFile: string) {
  debugger;
  const iconfontJsContent = fs.readFileSync(iconfontFile, "utf-8");
  const match = iconfontJsContent.match(/<svg>[\s\S]+?<\/svg>/);

  if (!match || !match[0]) {
    throw new Error("Invalid iconfont.js content. Could not find SVG string.");
  }

  const svgContent = match[0];
  return svgContent;
}

function transformContentToIconSet(prefix: string, content: string) {
  const root = parse(content);
  const symbols = root.querySelectorAll("symbol");
  const icons = {};

  symbols.forEach((symbol) => {
    const id = symbol.getAttribute("id")?.replace("icon-", "");
    const viewBox = symbol.getAttribute("viewBox");
    const paths = symbol.querySelectorAll("path");

    if (id && viewBox) {
      icons[id] = {
        body: paths
          .map((p) => {
            p.setAttribute("fill", "currentColor");
            return p.outerHTML;
          })
          .join(""),
        width: parseInt(viewBox.split(" ")[2], 10),
        height: parseInt(viewBox.split(" ")[3], 10),
      };
    }
  });

  return new IconSet({
    prefix,
    icons,
  });
}

async function exportIconSetToPackage(
  outputDir: string,
  pkgName: string,
  iconSet: IconSet
) {
  const pkgPath = path.join(outputDir, pkgName);
  await exportJSONPackage(iconSet, {
    target: pkgPath,
    package: {
      name: pkgName,
      version: "1.0.0",
      bugs: "https://github.com/iconify/iconify/issues",
      homepage: "https://github.com/iconify/iconify",
    },
    cleanup: true,
    /*
     customFiles: {
         'README.md': 'README!',
     },
     */
  });
}

export function iconfontToIconify(
  inputFile: string,
  outputDir: string,
  prefix: string,
  pkgName: string
) {
  return Promise.resolve()
    .then(readAndMatchContent.bind(null, inputFile))
    .then(transformContentToIconSet.bind(null, prefix))
    .then(exportIconSetToPackage.bind(null, outputDir, pkgName));
}
