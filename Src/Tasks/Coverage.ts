/* eslint-disable no-console */
import { SpawnTask } from "@Src/Utils/HelperFunctions";
import { AVA, C8 } from "@Src/Utils/Paths";
import { TaskFunction, TaskFunctionCallback } from "gulp";

const lArgs: string[] = [
    "--reporter=lcov", "--reporter=html", "--reporter=text-summary",
    AVA,
    "--verbose",
    "-T", "300s",
    "Dist/Test/**/*.test.js",
];

//     "Dist/Test/**/*.test.js",
// GetAllTestFiles(DistPath("Test"), "test.ts").join(" "),
// GetAllTestFiles(RootPath("Test"), "test.ts").join(" "),

export const Coverage: TaskFunction = (done: TaskFunctionCallback): void =>
{
    console.log(["spawn", C8, ...lArgs].join(" "));
    SpawnTask(C8, done, lArgs);
};
