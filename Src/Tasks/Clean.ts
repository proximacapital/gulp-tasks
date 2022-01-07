import del from "del";
import { TaskFunction, TaskFunctionCallback } from "gulp";
import path from "path";
import { DIST_DIR } from "../Utils/Paths";

export const Clean: TaskFunction = (done: TaskFunctionCallback): void =>
{
    del(path.join(DIST_DIR, "**", "*"), { force: true });
    done();
};
