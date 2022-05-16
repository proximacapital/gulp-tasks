import { FindGulpFileDir } from "@Src/Utils/Paths";
import test, { ExecutionContext } from "ava";
import fs from "fs";
import path from "path";

test("Correct when given no input", (t: ExecutionContext) =>
{
    t.deepEqual(FindGulpFileDir(), path.resolve(__dirname, "../../"));
});

const lFilters: string[] = [
    "Gulpfile.ts",
    "Gulpfile.js",
];

function TestFileFilter(aFileName: string): void
{
    test(`${aFileName} triggers end of crawl`, (t: ExecutionContext) =>
    {
        // arrange
        const lGulpFile: string = path.resolve(__dirname, `../${aFileName}`);
        fs.writeFileSync(lGulpFile, "test file");

        // act
        const lResult: string = FindGulpFileDir(__dirname);

        // assert
        t.deepEqual(lResult, path.dirname(lGulpFile));
        fs.rmSync(lGulpFile);
    });
}

lFilters.forEach(TestFileFilter);
