# TS Compiler Return Types

I've run into an issue while trying to obtain the return type of a function that returns a union with null.

I may be going about this completely the wrong way, but essentially the compiler appears to strip out nulls, and I don't know why.

## Setup

I'm running node 10 and npm 6. If you're using nvm you can simply run `nvm use` (and `nvm i` if you don't have node 10 installed).

Install dependencies with:

```shell
npm ci
```

## Build

The TypeScript will be compiled into the `build` directory when you run:

```shell
npm run build
```

## Tests

To run the build and then run a test script that outputs some info and checks the return types simply run:

```shell
npm test
```

## Structure

`src/find-types.ts` is a test script that runs on `src/example.ts`, which contains a few sample functions.
