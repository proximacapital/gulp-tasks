# gulp-tasks

`gulp-tasks` represents a core collection of gulp tasks for Proxima's TypeScript
repositories.

## Motivation

We ought to DRY up our gulpfiles, and the easiest way to do that is to create a
repo that actually contains all of our common gulp tasks. If a particular
application (or service) needs bespoke tasks, they can still be written inside
that particular repo.

## Usage

This package is meant to used in such a way that individual tasks (typed as
`Gulp.TaskFunction`s) can be imported as needed. Checkout the `Gulpfile.ts` at
the root level for an example.

## Bonus

It turns out, there's no need to write our Gulpfile's in `js` -- properly
configuring `ts-node` and `tsconfig-paths` allows for Gulp to transpile
`Gulpfile.ts` with zero issues.

## Contributing

NPM releases are published automatically via a github workflow (read: whenever
anyone publishes a github release). So, the easiest way to prepare this package
 for publication is via `np`:

```bash
np --no-publish --branch prod
```

This will draft a github release for you to fill in and then publish,
triggering the workflow.
