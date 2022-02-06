import { ExecTask } from "@Utils/HelperFunctions";
import { Path } from "@Utils/Paths";
import { TaskFunction, TaskFunctionCallback } from "gulp";
import path from "path";

const lC8Args: string = " --reporter=lcov --reporter=html --reporter=text-summary";
const lCommand: string = `${Path.C8} ${lC8Args} ${Path.AVA} ${path.join("Test", "**", "*.test.ts")}`;

export const Coverage: TaskFunction = (done: TaskFunctionCallback): void => ExecTask(lCommand, done);
