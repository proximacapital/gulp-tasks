import {
    Build,
    BuildCheckTest,
    BuildTest,
    Clean,
    Compile,
    Copy,
    Coverage,
    Demo,
    ESLintCheck,
    ESLintFix,
    Lint,
    LintFix,
    MDLintCheck,
    MDLintFix,
    SpawnTask,
    Test,
} from "@Src/index";
import gulp, { TaskFunctionCallback } from "gulp";

// ***** Base Tasks *****
gulp.task("build", Build);
gulp.task("clean", Clean);
gulp.task("compile", Compile);
gulp.task("coverage", Coverage);
gulp.task("copy", Copy);
gulp.task("demo", Demo);
gulp.task("eslint", ESLintCheck);
gulp.task("eslint-fix", ESLintFix);
gulp.task("lint", Lint);
gulp.task("lint-fix", LintFix);
gulp.task("mdlint", MDLintCheck);
gulp.task("mdlint-fix", MDLintFix);
gulp.task("test", Test);

// ***** Custom Tasks *****
gulp.task("start", (done: TaskFunctionCallback): void =>
{
    SpawnTask("node", done, [ "Dist/Src/App.js" ]);
});

// ***** Aliases *****
gulp.task("tests-all", gulp.task("test"));
gulp.task("build-test", BuildTest);
gulp.task("build-lint-test", BuildCheckTest);
