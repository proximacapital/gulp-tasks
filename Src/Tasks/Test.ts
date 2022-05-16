import { GetAllTestFiles, GetMatchingFiles, MapArgs, SpawnTask } from "@Utils/HelperFunctions";
import { AVA, TEST_DIST_DIR } from "@Utils/Paths";
import { TaskFunction, TaskFunctionCallback } from "gulp";
import path from "path";

export const Test: TaskFunction = (done: TaskFunctionCallback): void =>
{
    const lPathArgs: string[] | undefined = MapArgs().get("path");
    const lFileArgs: string[] | undefined = MapArgs().get("file");
    process.env.ENV__LOGGING_LEVEL = "OFF";

    let lArgs: string[] = [];
    if (lPathArgs !== undefined)
    {
        lPathArgs.forEach((aPath: string) =>
        {
            lArgs = lArgs.concat(GetAllTestFiles(path.join(TEST_DIST_DIR, aPath)));
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
        lArgs = [...GetAllTestFiles(TEST_DIST_DIR)];
    }

    lArgs.push("--verbose");
    lArgs.push("-T");
    lArgs.push("300s");

    // eslint-disable-next-line no-console
    console.log(["spawn", AVA, ...lArgs].join(" "));
    SpawnTask(AVA, done, lArgs);
};
