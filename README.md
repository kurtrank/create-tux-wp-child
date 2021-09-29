# create-tux-wp-child

A simple scaffolding tool to generate a new WordPress theme based on [tux-wp-child](https://github.com/thelearninghouse/tux-wp-child).

## Requirements

- [Node 14+](https://nodejs.org/)
- Read access to the [TUX child starter repo](https://github.com/thelearninghouse/tux-wp-child) (since the repo is currently private)

## Setup

Create a new repo with the format `tux-wp-abbr`, where "abbr" is the school's initials. Then run the following in your local themes directory:

```sh
npx https://github.com/kurtrank/create-tux-wp-child/ abbr
```

### Options

`--branch=branch-name` can be passed as a second argument, and `branch-name` will be used as the starting point for the new theme. This allows for better testing before updates to the starter are merged.

This is primarily used with the beta branch:

```sh
npx https://github.com/kurtrank/create-tux-wp-child/ abbr --branch=beta
```
