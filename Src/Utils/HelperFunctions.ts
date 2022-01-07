/* eslint-disable no-console */
import { ChildProcess, exec, ExecException, spawn } from "child_process";
import { readdirSync, statSync } from "fs";
import gulp, { TaskFunctionCallback } from "gulp";
import { join } from "path";
import { DIST_DIR, ROOT_DIR, SRC_DIR, TEST_DIR } from "./Paths";

export const RootPath = (aPath: string = ""): string => join(ROOT_DIR, aPath);
export const Root = (aPath: string = ""): NodeJS.ReadWriteStream => gulp.src(RootPath(aPath));

export const DistPath = (aPath: string = ""): string => join(DIST_DIR, aPath);
export const DistDest = (aPath: string = ""): NodeJS.ReadWriteStream => gulp.dest(DistPath(aPath));

export const SrcPath = (aPath: string = ""): string => join(SRC_DIR, aPath);

export const SpawnTask = (command: string, done: TaskFunctionCallback, args: string[] | undefined): void =>
{
    let lCP: ChildProcess;
    if (args !== undefined)
    {
        lCP = spawn(command, args, { stdio: "inherit" });
    }
    else
    {
        lCP = spawn(command, { stdio: "inherit" });
    }

    let lError: Error | null = null;
    lCP.on("error", (error: Error) => lError = error);

    // catch non-zero exit statuses so that CI can understand when task fails
    lCP.on("close", (code: number) =>
    {
        if (lError !== null)
        {
            done(lError);
        }
        else if (code !== 0)
        {
            done(new Error(`Task returned exit code ${code}`));
        }
        else
        {
            done();
        }
    });
};

export const ExecTask = (command: string, done: TaskFunctionCallback): void =>
{
    const lCP: ChildProcess = exec(command, (error: ExecException | null, sout: string, serr: string) =>
    {
            serr && console.error(serr);
            ProcessExitCode(error);
            done(error);
    });

    if (lCP.stdout !== null) { lCP.stdout.pipe(process.stdout); }

    done();
};

export const GetMatchingFiles = (aFileArgs: string[], aFileType: string): string[] =>
{
    // filter files to those matching requested arguments
    const lRegex: RegExp = new RegExp(`^.*(${aFileArgs.join("|")})\\.${aFileType}\\.js$`);
    const lMatchingFiles: string[] = [];
    GetAllTestFiles(TEST_DIR, `.${aFileType}.js$`).forEach((aFile: string) =>
    {
        if (lRegex.test(aFile)) { lMatchingFiles.push(aFile); }
    });

    return lMatchingFiles;
};

export const GetAllTestFiles = (aTopDirectory: string, aFilter: string = "test.js$"): string[] =>
{
    const lFilter: RegExp = new RegExp(aFilter);
    // getTestsFromDir is called recursively until we run out of directories, this function must have access to lFiles
    // in its scope during execution. as such it is not save to move it from the getAllTestFiles scope
    const lFiles: string[] = [];
    function GetTestsFromDir(aDirectory: string): void
    {
        const lDirFiles: string[] = readdirSync(aDirectory);

        for (const lFileName of lDirFiles)
        {
            const lFilePath: string = join(aDirectory, lFileName);
            if (statSync(lFilePath).isDirectory() === true)
            {
                GetTestsFromDir(lFilePath);
            }
            else if (lFilter.test(lFileName))
            {
                lFiles.push(lFilePath);
            }
        }
    }
    GetTestsFromDir(aTopDirectory);

    return lFiles;
};

export function ProcessExitCode(error: ExecException | null = null): void
{
    if (error !== null)
    {
        console.error(`exec error: ${error}`);
        process.exit(1);
    }
}

export function MapArgs(aArgs: string[] = process.argv): Map<string, string[]>
{
    const lMap: Map<string, string[]> = new Map();
    let inProgressArg: string | undefined = undefined;

    for (let i: number = 0; i < aArgs.length; ++i)
    {
        let currentArg: string = aArgs[i];

        if (currentArg[0] === "-")
        {
            currentArg = currentArg.slice(1);
            if (currentArg[0] === "-")
            {
                currentArg = currentArg.slice(1);
            }

            inProgressArg = currentArg;
        }
        else if (inProgressArg !== undefined)
        {
            const lTmpArgs: string[] = lMap.get(inProgressArg) ?? [];
            lTmpArgs.push(currentArg);
            lMap.set(inProgressArg, lTmpArgs);
            // inProgressArg = undefined;
        }
    }

    if (inProgressArg !== undefined && lMap.get(inProgressArg) === undefined)
    {
        lMap.set(inProgressArg, []);
    }

    return lMap;
}
