/* eslint-disable no-console */
import { GetAllTestFiles, RootPath, SpawnTask } from "@Src/Utils/HelperFunctions";
import { AVA, C8 } from "@Src/Utils/Paths";
import { TaskFunction, TaskFunctionCallback } from "gulp";

const lC8Args: string[] = ["--reporter=lcov", "--reporter=html", "--reporter=text-summary"];
const lArgs: string[] = [...lC8Args, AVA, GetAllTestFiles(RootPath("Test"), "test.ts").join(" ")];

export const Coverage: TaskFunction = (done: TaskFunctionCallback): void =>
{
    console.log(["spawn", C8, ...lArgs].join(" "));
    SpawnTask(C8, done, lArgs);
};
