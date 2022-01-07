import { GetAllTestFiles, MapArgs, GetMatchingFiles, SpawnTask } from "@Utils/HelperFunctions";
import { AVA, TEST_DIR } from "@Utils/Paths";
import { TaskFunction, TaskFunctionCallback } from "gulp";
import _ from "lodash";
import path from "path";

export const Test: TaskFunction = (done: TaskFunctionCallback): void =>
{
    const lPathArgs: string[] | undefined = MapArgs().get("path");
    const lFileArgs: string[] | undefined = MapArgs().get("file");
    process.env.ENV__LOGGING_LEVEL = "OFF";

    let lArgs: string[] = [];
    if (lPathArgs !== undefined)
    {
        const allDone: TaskFunctionCallback = _.after(lPathArgs.length, done);
        lPathArgs.forEach((aPath: string) =>
        {
            lArgs = lArgs.concat(GetAllTestFiles(path.join(TEST_DIR, aPath)));
        });
        lArgs.push("--match");
    }
    else if (lFileArgs !== undefined)
    {
        const lMatchingFiles: string[] = GetMatchingFiles(lFileArgs, "test");
        if (lMatchingFiles.length === 0)
        {
            done(new Error("Could not find any matching test.js files"));
            return;
        }

        lArgs = lMatchingFiles;
    }
    else
    {
        lArgs = [...GetAllTestFiles(TEST_DIR)];
    }

    lArgs.push("--verbose");

    SpawnTask(AVA, done, lArgs);
};
