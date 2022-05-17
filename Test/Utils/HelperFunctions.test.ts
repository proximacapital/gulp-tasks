import { GetAllTestFiles, GetMatchingFiles, MapArgs } from "@Src/Utils/HelperFunctions";
import { TEST_DIST_DIR } from "@Src/Utils/Paths";
import test, { ExecutionContext } from "ava";
import * as path from "path";

test("Correctly filters specified files", (t: ExecutionContext) =>
{
    const lActual: string[] = GetAllTestFiles(TEST_DIST_DIR).sort();
    const lExpected: string[] = [
        "Utils/GetGulpFileDir.test.js",
        "Utils/HelperFunctions.test.js",
    ]
        .map((aPath: string) => path.join(TEST_DIST_DIR, aPath))
        .sort();

    t.deepEqual(lActual, lExpected);
});

test("Gets all files when given an empty filter", (t: ExecutionContext) =>
{
    const lActual: string[] = GetAllTestFiles(TEST_DIST_DIR, ".$").sort();
    const lExpected: string[] = [
        "TestFile.demo.d.ts",
        "TestFile.demo.js",
        "Utils/GetGulpFileDir.test.d.ts",
        "Utils/GetGulpFileDir.test.js",
        "Utils/HelperFunctions.test.d.ts",
        "Utils/HelperFunctions.test.js",
    ]
        .map((aPath: string) => path.join(TEST_DIST_DIR, aPath))
        .sort();
    t.deepEqual(lActual, lExpected);
});

test("Finds demo file", (t: ExecutionContext) =>
{
    const lActual: string[] = GetMatchingFiles(["TestFile"], "demo");
    const lExpected: string[] = [path.join(TEST_DIST_DIR, "TestFile.demo.js")];
    t.deepEqual(lActual, lExpected);
});

test("MapArgs collects values correctly", (t: ExecutionContext) =>
{
    const lArgs: string[] = ["--files", "file1", "file2", "-p", "1", "-v"];
    const lMap: Map<string, string[]> = new Map([
        ["files", ["file1", "file2"]],
        ["p", ["1"]],
        ["v", []],
    ]);

    const lResult: Map<string, string[]> = MapArgs(lArgs);

    t.deepEqual(lResult, lMap);
});
