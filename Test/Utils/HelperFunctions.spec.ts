import { SetRoot } from "@Src/SetPath";
SetRoot(process.cwd());

import { GetAllTestFiles, GetMatchingFiles, MapArgs } from "@Utils/HelperFunctions";
import { Paths } from "@Utils/Paths";
import { expect } from "chai";
import * as path from "path";

suite("GetAllTestFiles");

test("correctly filters specified files", function()
{
    const lActual: string[] = GetAllTestFiles(Paths.TestDist);
    const lExpected: string[] = ["Utils/MapArgs.test.js"]
        .map((aPath: string) => path.join(Paths.TestDist, aPath))
        .sort();

    expect(lActual.sort()).to.eql(lExpected.sort());
});

test("gets all files when given an empty filter", function()
{
    const lActual: string[] = GetAllTestFiles(Paths.TestDist, ".$").sort();
    const lExpected: string[] = [
        "TestFile.demo.d.ts",
        "TestFile.demo.js",
        "Utils/HelperFunctions.spec.d.ts",
        "Utils/HelperFunctions.spec.js",
        "Utils/MapArgs.test.d.ts",
        "Utils/MapArgs.test.js",
    ]
        .map((aPath: string) => path.join(Paths.TestDist, aPath))
        .sort();
    expect(lActual).to.eql(lExpected);
});


suite("GetMatchingFiles");

test("finds demo file", function()
{
    const lActual: string[] = GetMatchingFiles(["TestFile"], "demo");
    const lExpected: string[] = [path.join(Paths.TestDist, "TestFile.demo.js")];
    expect(lActual).to.eql(lExpected);
});

suite("MapArgs");

test("collects values from the same key", function()
{
    const lArgs: string[] = ["--files", "file1", "file2", "-p", "1", "-v"];
    const lMap: Map<string, string[]> = new Map([
        ["files", ["file1", "file2"]],
        ["p", ["1"]],
        ["v", []],
    ]);

    const lResult: Map<string, string[]> = MapArgs(lArgs);

    expect(lResult).to.eql(lMap);
});
