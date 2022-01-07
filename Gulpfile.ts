import { DIST_DIR } from "@Src/Utils/Paths";
import { CheckNode } from "@Tasks/CheckNode";
import { ESLintCheck, ESLintFix, Lint, LintFix, MDLintCheck, MDLintFix } from "@Tasks/Lint";
import gulp, { TaskFunctionCallback } from "gulp";
import {
    Build,
    BuildCheckTest,
    BuildTest,
    Clean,
    Compile,
    Copy,
    Coverage,
    Demo,
    ExecTask,
    Test,
} from ".";

gulp.task("check-node", CheckNode);
gulp.task("clean", Clean);
gulp.task("compile", Compile);
gulp.task("copy", Copy);
gulp.task("build", Build);
gulp.task("eslint-check", ESLintCheck);
gulp.task("eslint-fix", ESLintFix);
gulp.task("mdlint-check", MDLintCheck);
gulp.task("mdlint-fix", MDLintFix);
gulp.task("lint-check", Lint);
gulp.task("lint-fix", LintFix);
gulp.task("test", Test);
gulp.task("demo", Demo);
gulp.task("coverage", Coverage);

gulp.task("start", (done: TaskFunctionCallback): void =>
{
    ExecTask(`node ${DIST_DIR}/Src/App.js`, done);
});

// ----------
// Aliases:
gulp.task("tests-all", gulp.task("test"));
gulp.task("build-test", BuildTest);
gulp.task("build-check-test", BuildCheckTest);
gulp.task("build-lint-test", BuildCheckTest);

