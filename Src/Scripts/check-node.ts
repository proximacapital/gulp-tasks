#!/usr/bin/env node

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/typedef */
import * as fs from "fs";
import { RootPath } from "..";

const lActualVersion = process.versions.node.trim();
const lExpectedVersion = fs.readFileSync(RootPath(".nvmrc")).toString().trim();

if (lActualVersion !== lExpectedVersion)
{
    console.error(`
    The current node version is ${lActualVersion} but the expected version is ${lExpectedVersion}.
    Please update your node version.
  `);
    process.exit(1);
}
else
{
    console.log(`
    The current node version is ${lActualVersion} and the expected version is ${lExpectedVersion}.
    Everything is fine.
  `);
    process.exit(0)
}
