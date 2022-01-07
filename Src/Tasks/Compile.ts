import { SpawnTask } from "@Src/Utils/HelperFunctions";
import { TaskFunction, TaskFunctionCallback } from "gulp";
import { TSC } from "../Utils/Paths";

export const Compile: TaskFunction = (done: TaskFunctionCallback): void =>
{
    SpawnTask(TSC, done, ["--build"]);
};
