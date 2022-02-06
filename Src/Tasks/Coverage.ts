import { ExecTask } from "@Utils/HelperFunctions";
import { Paths } from "@Utils/Paths";
import { TaskFunction, TaskFunctionCallback } from "gulp";
import path from "path";

const lC8Args: string = " --reporter=lcov --reporter=html --reporter=text-summary";
const lCommand: string = `${Paths.C8} ${lC8Args} ${Paths.AVA} ${path.join("Test", "**", "*.test.ts")}`;

export const Coverage: TaskFunction = (done: TaskFunctionCallback): void => ExecTask(lCommand, done);
