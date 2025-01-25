import { glob } from "glob";

export function match(matchStr: string) {
  return glob.sync(matchStr);
}
