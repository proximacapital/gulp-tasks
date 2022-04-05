import { DistPath, RootPath } from "@Src/Utils/HelperFunctions";
import * as gulp from "gulp";
import * as path from "path";

const Root = (aPath: string = ""): NodeJS.ReadWriteStream => gulp.src(RootPath(aPath));
const DistDest = (aPath: string = ""): NodeJS.ReadWriteStream => gulp.dest(DistPath(aPath));

gulp.task("copy tsconfig.json", (done: gulp.TaskFunctionCallback): void =>
{
    Root("tsconfig.json").pipe(DistDest());
    done();
});
gulp.task("copy Config/", (done: gulp.TaskFunctionCallback): void =>
{
    Root(path.join("Config", "**", "*")).pipe(DistDest("Config"));
    Root(path.join("Config", "**", ".*")).pipe(DistDest("Config"));
    done();
});
gulp.task("copy .nvmrc", (done: gulp.TaskFunctionCallback): void =>
{
    Root(".nvmrc").pipe(DistDest());
    done();
});

export const Copy: gulp.TaskFunction = gulp.parallel(
    "copy tsconfig.json",
    "copy Config/",
    "copy .nvmrc",
);
