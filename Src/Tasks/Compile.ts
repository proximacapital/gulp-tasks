import { SpawnTask } from "@Utils/HelperFunctions";
import { Paths } from "@Utils/Paths";
import { TaskFunction, TaskFunctionCallback } from "gulp";

export const Compile: TaskFunction = (done: TaskFunctionCallback): void =>
{
    SpawnTask(Paths.TSC, done, ["--build"]);
};
