import { MapArgs } from "@Src/Utils/HelperFunctions";
import test, { ExecutionContext } from "ava";

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
