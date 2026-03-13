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

## To use the project with the Docker

### To compile the project
```bash
docker build -t internship_fe .
```
### To compile the project with custom args
```bash
docker build -t internship_fe --build-arg NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key_here .
```

### To run the project after
```bash
docker run -d internship_fe
```
### Compile and run the project using Docker compose without cache

```bash
npm run docker:up:nocache
```

### To stop and remove all containers use

```bash
docker compose down -v
```
