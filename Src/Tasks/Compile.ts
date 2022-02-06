import { SpawnTask } from "@Utils/HelperFunctions";
import { Path } from "@Utils/Paths";
import { TaskFunction, TaskFunctionCallback } from "gulp";

export const Compile: TaskFunction = (done: TaskFunctionCallback): void =>
{
    SpawnTask(Path.TSC, done, ["--build"]);
};
