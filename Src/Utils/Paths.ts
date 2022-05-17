import fs from "fs";
import path from "path";

function DirHasGulpfile(aDir: string): boolean
{
    return (
           fs.existsSync(path.join(aDir, "Gulpfile.ts"))
        || fs.existsSync(path.join(aDir, "Gulpfile.js"))
    );
}

export function FindGulpFileDir(aStartingDir: string = process.cwd()): string
{

    // check directory & parents until we find a valid gulpfile
    let lGulpDir: string = aStartingDir;
    while (DirHasGulpfile(lGulpDir) === false)
    {
        lGulpDir = path.dirname(lGulpDir);
    }

    return path.normalize(lGulpDir);
}

export const ROOT_DIR: string      = FindGulpFileDir();
export const SRC_DIR: string       = path.join(ROOT_DIR, "Src");
export const DIST_DIR: string      = path.join(ROOT_DIR, "Dist");
export const TEST_DIST_DIR: string = path.join(DIST_DIR, "Test");
export const NODE_BIN_DIR: string  = path.join(ROOT_DIR, "node_modules", ".bin");

export const AVA: string    = path.join(NODE_BIN_DIR, "ava");
export const TSC: string    = path.join(NODE_BIN_DIR, "ttsc");
export const ESLINT: string = path.join(NODE_BIN_DIR, "eslint");
export const MDLINT: string = path.join(NODE_BIN_DIR, "markdownlint");
export const C8: string     = path.join(NODE_BIN_DIR, "c8");
// export const NYC: string    = `node ./node_modules/nyc/bin/nyc.js`;
