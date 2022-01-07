import { MapArgs, GetMatchingFiles, SpawnTask } from "@Src/Utils/HelperFunctions";
import { TaskFunction, TaskFunctionCallback } from "gulp";
import * as Paths from "../Utils/Paths";

export const Demo: TaskFunction = (done: TaskFunctionCallback): void =>
{
    // get file name args
    const lFileArgs: string[] | undefined = MapArgs().get("file");
    if (lFileArgs === undefined || lFileArgs.length === 0)
    {
        done(new Error("ERROR: Must supply file name list via `--file fileName`"));
        return;
    }

    // filter demos to those matching file input
    const lMatchingFiles: string[] = GetMatchingFiles(lFileArgs, "demo");
    if (lMatchingFiles.length === 0)
    {
        done(new Error("Could not find any matching demo.js files"));
        return;
    }

    // run demos
    lMatchingFiles.unshift("--fail-fast");
    SpawnTask(Paths.AVA, done, lMatchingFiles);
};
