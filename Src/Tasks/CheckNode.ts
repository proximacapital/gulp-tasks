import { RootPath } from "@Utils/HelperFunctions";
import fs from "fs";
import { TaskFunction, TaskFunctionCallback } from "gulp";

export const CheckNode: TaskFunction = (done: TaskFunctionCallback) =>
{
    const lExpected: string = fs.readFileSync(RootPath(".nvmrc")).toString();
    const lActual: string = process.version;

    if (lActual.trim() !== lExpected.trim())
    {
        done(new Error(`Invalid Node version. Expected: ${lExpected}. Received: ${lActual}`));
    }

    done();
};
