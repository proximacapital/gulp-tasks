import fs from "fs";
import path from "path";

const DirHasGulpfile = (aDir: string): boolean => fs.readdirSync(aDir)
    .some((aFile: string) => /^[Gg]ulpfile\.[tj]s$/.test(path.basename(aFile)));

// crawl up parent directories until we find the gulpfile of the calling software
let lGulpDir: string = process.cwd();
while (DirHasGulpfile(lGulpDir) === false)
{
    lGulpDir = path.dirname(lGulpDir);
}

export const ROOT_DIR: string = path.normalize(lGulpDir);
export const DIST_DIR: string = path.join(ROOT_DIR, "Dist");
export const SRC_DIR: string = path.join(ROOT_DIR, "Src");
export const TEST_DIR: string = path.join(DIST_DIR, "Test");
export const NODE_BIN_DIR: string = path.join(ROOT_DIR, "node_modules", ".bin");

const BinPath = (aCommand: string): string => path.join(NODE_BIN_DIR, aCommand);

export const AVA: string = BinPath("ava");
export const TSC: string = BinPath("ttsc");
export const ESLINT: string = BinPath("eslint");
export const MDLINT: string = BinPath("markdownlint");
export const C8: string = BinPath("c8");
