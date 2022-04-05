/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import * as cp from "child_process";
import * as fs from "fs";
import * as gulp from "gulp";
import { join } from "path";
import { DIST_DIR, ROOT_DIR, SRC_DIR, TEST_DIST_DIR } from "./Paths";

export const RootPath = (aPath: string = ""): string => join(ROOT_DIR, aPath);
export const DistPath = (aPath: string = ""): string => join(DIST_DIR, aPath);
export const SrcPath = (aPath: string = ""): string => join(SRC_DIR, aPath);

export const SpawnTask = (command: string, done: gulp.TaskFunctionCallback, args: string[] | undefined): void =>
{
    let lCP: cp.ChildProcess;
    if (args !== undefined)
    {
        lCP = cp.spawn(command, args, { stdio: "inherit" });
    }
    else
    {
        lCP = cp.spawn(command, { stdio: "inherit" });
    }

    let lError: Error | null = null;
    lCP.on("error", (error: Error) => { lError = error; });

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

export const SpawnTaskSync = (command: string, done: gulp.TaskFunctionCallback, args: string[] | undefined): void =>
{
    try
    {
        cp.spawnSync(command, args ?? [], { stdio: "inherit" });
        done();
    }
    catch (error: any)
    {
        done(error);
    }
};

export const ExecTask = (command: string, done: gulp.TaskFunctionCallback): void =>
{
    const lCP: cp.ChildProcess = cp.exec(command, (error: cp.ExecException | null, sout: string, serr: string) =>
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
    GetAllTestFiles(TEST_DIST_DIR, `.${aFileType}.js$`).forEach((aFile: string) =>
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
        const lDirFiles: string[] = fs.readdirSync(aDirectory);

        for (const lFileName of lDirFiles)
        {
            const lFilePath: string = join(aDirectory, lFileName);
            if (fs.statSync(lFilePath).isDirectory() === true)
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

export function ProcessExitCode(error: cp.ExecException | null = null): void
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
