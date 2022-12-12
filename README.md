# Notes

This project is created with `pnpm`, TypeScript, Tailwind CSS, and React JS.

```bash
pnpm create vite
```

## Parsing

I'm using this really cool library [typia](https://github.com/samchon/typia) to parse the data.
It seems really cool.
It kind've like Rust in that it uses the generic value to generate runtime code.
This seems to be [monomorphization](https://rustc-dev-guide.rust-lang.org/backend/monomorph.html).

## Data Fetching

Data fetching in React JS is nontrivial.
See [here](https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret), [here](https://github.com/facebook/react/issues/14326), and [here](https://www.robinwieruch.de/react-hooks-fetch-data/) for help.
