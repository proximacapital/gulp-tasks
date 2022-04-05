import { SpawnTask } from "@Src/Utils/HelperFunctions";
import { ESLINT, MDLINT } from "@Src/Utils/Paths";
import GulpClient, { TaskFunction, TaskFunctionCallback } from "gulp";

const lLinters: Map<string, string> = new Map([
    ["eslint", ESLINT],
    ["mdlint", MDLINT],
]);

function LintFactory(aLinter: string, aFix: boolean): TaskFunction
{
    const lArgs: string = aFix ? ". --fix" : ".";

    const lCommand: string | undefined = lLinters.get(aLinter);
    if (lCommand === undefined)
    {
        throw new Error("Undefined Linter");
    }

    return (done: TaskFunctionCallback): void => SpawnTask(lCommand, done, [lArgs]);
}

export const ESLintCheck: TaskFunction = LintFactory("eslint", false);
GulpClient.task("eslint", ESLintCheck);
export const ESLintFix: TaskFunction = LintFactory("eslint", true);
GulpClient.task("eslint-fix", ESLintFix);

export const MDLintCheck: TaskFunction = LintFactory("mdlint", false);
GulpClient.task("mdlint", MDLintCheck);
export const MDLintFix: TaskFunction = LintFactory("mdlint", true);
GulpClient.task("mdlint-fix", MDLintFix);

export const Lint: TaskFunction = GulpClient.parallel("eslint", "mdlint");
export const LintFix: TaskFunction = GulpClient.parallel("eslint-fix", "mdlint-fix");
