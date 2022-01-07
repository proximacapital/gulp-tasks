import { ExecTask } from "@Src/Utils/HelperFunctions";
import { AVA, C8 } from "@Src/Utils/Paths";
import { TaskFunction, TaskFunctionCallback } from "gulp";
import path from "path";

const lC8Args: string = " --reporter=lcov --reporter=html --reporter=text-summary";
const lCommand: string = `${C8} ${lC8Args} ${AVA} ${path.join("Test", "**", "*.test.ts")}`;

export const Coverage: TaskFunction = (done: TaskFunctionCallback): void => ExecTask(lCommand, done);
