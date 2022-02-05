import { FindGulpFileDir } from "@Src/Utils/Paths";
import { expect } from "chai";
import fs from "fs";
import path from "path";

suite("GetGulpFileDir");

test("Correct when given no input", function()
{
    expect(FindGulpFileDir()).to.eq(path.resolve(__dirname, "../../"));
});

const lFilters: string[] = [
    "Gulpfile.ts",
    "Gulpfile.js",
    "gulpfile.ts",
    "gulpfile.js",
];

function TestFileFilter(aFileName: string): void
{
    test(`${aFileName} triggers end of crawl`, function()
    {
        // arrange
        const lGulpFile: string = path.resolve(__dirname, `../${aFileName}`);
        fs.writeFileSync(lGulpFile, "test file");

        // act
        const lResult: string = FindGulpFileDir(__dirname);

        // assert
        expect(lResult).to.eq(path.dirname(lGulpFile));
        fs.rmSync(lGulpFile);
    });
}

lFilters.forEach(TestFileFilter);
