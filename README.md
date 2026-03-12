## Description

### By default, app is served on 3000 port (http://localhost:3000/)

## Project setup

```bash
$ npm install
```

## Environment

Copy `.env.sample` to `.env` and fill in the values. Environment variables (including `HOST`, `PORT`, and any secret keys) are loaded from `.env` using **dotenv** (see `next.config.ts`). Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Compile and run the project

```bash
# development
$ npm run dev
```
