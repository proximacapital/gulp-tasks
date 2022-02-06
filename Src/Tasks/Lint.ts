import { ExecTask } from "@Utils/HelperFunctions";
import { Path } from "@Utils/Paths";
import GulpClient, { TaskFunction, TaskFunctionCallback } from "gulp";

const lLinters: Map<string, string> = new Map([
    ["eslint", Path.ESLINT],
    ["mdlint", Path.ESLINT],
]);

function LintFactory(aLinter: string, aFix: boolean): TaskFunction
{
    const lArgs: string = aFix ? " . --fix" : " .";

    const lCommand: string | undefined = lLinters.get(aLinter);
    if (lCommand === undefined)
    {
        throw new Error("Undefined Linter");
    }

    return (done: TaskFunctionCallback): void => ExecTask(lCommand + lArgs, done);
}

export const ESLintCheck: TaskFunction = LintFactory("eslint", false);
export const ESLintFix: TaskFunction = LintFactory("eslint", true);

export const MDLintCheck: TaskFunction = LintFactory("mdlint", false);
export const MDLintFix: TaskFunction = LintFactory("mdlint", true);

export const Lint: TaskFunction = GulpClient.parallel(ESLintCheck, MDLintCheck);
export const LintFix: TaskFunction = GulpClient.parallel(ESLintFix, MDLintFix);
