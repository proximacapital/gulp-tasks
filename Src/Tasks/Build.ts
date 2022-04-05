import GulpClient, { TaskFunction } from "gulp";
import { Compile } from "./Compile";
import { Copy } from "./Copy";
import { Lint } from "./Lint";
import { Test } from "./Test";

GulpClient.task("compile", Compile);
GulpClient.task("copy", Copy);
export const Build: TaskFunction = GulpClient.parallel("copy", "compile");

export const BuildTest: TaskFunction = GulpClient.series(Build, Test);
export const BuildCheckTest: TaskFunction = GulpClient.series(Build, Lint, Test);
