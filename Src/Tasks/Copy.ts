import { DistDest, Root } from "@Src/Utils/HelperFunctions";
import gulp, { TaskFunction } from "gulp";
import path from "path";

export const Copy: TaskFunction = gulp.parallel(
    () => Root("tsconfig.json").pipe(DistDest()),
    () => Root(path.join("Config", "**", "*")).pipe(DistDest("Config")),
    () => Root(path.join("Config", "**", ".*")).pipe(DistDest("Config")),
    () => Root(".nvmrc").pipe(DistDest()),
);
