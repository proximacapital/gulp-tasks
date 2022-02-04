import finder from "find-package-json";
import path from "path";

// crawl up parent directories until we find the package.json of the calling software
let lRootDir: string = process.cwd();
for (const lPackageJson of finder())
{
    lRootDir = path.dirname(lPackageJson.__path);
}

export const ROOT_DIR: string = path.normalize(lRootDir);
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
