import { DistPath, RootPath } from "@Src/Utils/HelperFunctions";
import * as gulp from "gulp";
import * as path from "path";

const Root = (aPath: string = ""): NodeJS.ReadWriteStream => gulp.src(RootPath(aPath));
const DistDest = (aPath: string = ""): NodeJS.ReadWriteStream => gulp.dest(DistPath(aPath));

export const Copy: gulp.TaskFunction = gulp.parallel(
    () => Root("tsconfig.json").pipe(DistDest()),
    () => Root(path.join("Config", "**", "*")).pipe(DistDest("Config")),
    () => Root(path.join("Config", "**", ".*")).pipe(DistDest("Config")),
    () => Root(".nvmrc").pipe(DistDest()),
);
