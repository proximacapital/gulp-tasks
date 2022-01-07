import { GetAllTestFiles, GetMatchingFiles, MapArgs } from "@Src/Utils/HelperFunctions";
import { TEST_DIR } from "@Src/Utils/Paths";
import { expect } from "chai";

suite("GetAllTestFiles");

test("correctly filters specified files", () =>
{
    const lActual: string[] = GetAllTestFiles(TEST_DIR);
    const lExpected: string[] = [
        "Dist/Test/Utils/HelperFunctions.test.js",
        "Dist/Test/Utils/MapArgs.test.js",
    ];
    expect(lActual.sort()).to.eql(lExpected.sort());
});

test("gets all files when given an empty filter", () =>
{
    const lActual: string[] = GetAllTestFiles(TEST_DIR, ".$").sort();
    const lExpected: string[] = [
        "Dist/Test/Utils/HelperFunctions.test.d.ts",
        "Dist/Test/Utils/HelperFunctions.test.js",
        "Dist/Test/TestFile.demo.d.ts",
        "Dist/Test/TestFile.demo.js",
    ].sort();
    expect(lActual).to.eql(lExpected);
});


suite("GetMatchingFiles");

test("finds demo file", () =>
{
    const lActual: string[] = GetMatchingFiles(["TestFile"], "demo");
    const lExpected: string[] = ["Dist/Test/TestFile.demo.js"];
    expect(lActual).to.eql(lExpected);
});

suite("MapArgs");

test("collects values from the same key", () =>
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
