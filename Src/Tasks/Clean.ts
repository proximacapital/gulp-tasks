import { Path } from "@Utils/Paths";
import del from "del";
import { TaskFunction, TaskFunctionCallback } from "gulp";
import path from "path";

export const Clean: TaskFunction = (done: TaskFunctionCallback): void =>
{
    del(path.join(Path.Dist, "**", "*"), { force: true });
    done();
};
