import { Paths } from "@Utils/Paths";
import del from "del";
import { TaskFunction, TaskFunctionCallback } from "gulp";
import path from "path";

export const Clean: TaskFunction = (done: TaskFunctionCallback): void =>
{
    del(path.join(Paths.Dist, "**", "*"), { force: true });
    done();
};
