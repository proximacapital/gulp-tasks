import fs from "fs";
import path from "path";

export function FindGulpFileDir(aStartingDir: string = process.cwd()): string
{
    const DirHasGulpfile = (aDir: string): boolean => (
        fs.existsSync(path.join(aDir, "Gulpfile.ts"))
     || fs.existsSync(path.join(aDir, "Gulpfile.js"))
     || fs.existsSync(path.join(aDir, "gulpfile.ts"))
     || fs.existsSync(path.join(aDir, "gulpfile.js"))
    );

    // check directory & parents until we find a valid gulpfile
    let lGulpDir: string = aStartingDir;
    while (DirHasGulpfile(lGulpDir) === false)
    {
        lGulpDir = path.dirname(lGulpDir);
    }

    return path.normalize(lGulpDir);
}

export const ROOT_DIR: string = FindGulpFileDir();
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
