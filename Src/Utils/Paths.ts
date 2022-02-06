import path from "path";


let lRootDir: string | undefined;
/**
 * SetRoot will set the root for all relative paths in your project. this is
 * rqeuired because all of the tasks in `gulp-tasks` that work with standardized
 * paths will need to know where the root they are starting from is.
 *
 * It is required to SetRoot as the first step in any Gulpfile that inherits
 * `gulp-tasks`.
 *
 * @param aRootDir - the root of your project, where you Gulpfile is located
 * @throws if any other exports are used prior to calling SetRoot
 *
 * @example
 * Intended Usage inside Gulpfile.ts:
 * ```
 * import { SetRoot } from "@proxima-oss/gulp-tasks";
 * SetRoot(\_\_dirname);
 *
 * // imports...
 * // task declarations...
 * ```
**/
export function SetRoot(aRootDir: string): void
{
    lRootDir = aRootDir;
}

export class Paths
{
    public static get Root(): string
    {
        if (lRootDir === undefined) { throw new Error("please call Setup prior to running tasks"); }

        return lRootDir;
    }

    private static BinPath(aCommand: string): string
    {
        return path.join(this.NodeBin, aCommand);
    }

    public static get Src(): string     { return path.join(this.Root, "Src"); }
    public static get Test(): string    { return path.join(this.Root, "Test"); }
    public static get Dist(): string    { return path.join(this.Root, "Dist"); }
    public static get NodeBin(): string { return path.join(this.Root, "node_modules", ".bin"); }

    public static get AVA(): string     { return Paths.BinPath("ava"); }
    public static get TSC(): string     { return Paths.BinPath("ttsc"); }
    public static get ESLINT(): string  { return Paths.BinPath("eslint"); }
    public static get MDLINT(): string  { return Paths.BinPath("markdownlint"); }
    public static get C8(): string      { return Paths.BinPath("c8"); }
}

