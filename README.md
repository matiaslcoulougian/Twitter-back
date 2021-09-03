# Emergencias API 💪

## Getting Started

Install postgres locally or use Docker.
In order to get a local postgres started via Docker just run the following docker-compose command.

```sh
docker-compose up -d

# Set database url to point to postgres
export DATABASE_URL='postgresql://postgres:postgres@localhost:5432/emergencias_dev'

# Run the setup
npm run db:reset
```

1. Install dependencies: `npm install`
2. Setup your local postgres database by running `npm run db:reset`. You will need to have postgress installed locally.
3. Start dev server: `npm run dev`

## Generating GraphQL Types

Whenever graphql schema files are updated, you might need to run graphql codegen to generate the updated types. When that happens, run `npm run build`.

## Folder Structure

- `directives`: Folder for all apollo directives. See https://www.apollographql.com/docs/apollo-server/schema/creating-directives/ for doc on adding custom directives.
- `generated`: Generated typescript files
- `components`: App components
- `db`: DB related logic
- `config`: App configuration and env vars
- `app`: The GraphQL API itself and related configurations
- `types`: Custom TypeScript types
- `errors`: Custom errors and error handling for the app
- `logger`: Custom logger for the app

## Issues

- Objection.js has an typing issue where some find queries (ie `findById`, `findOne`) should return `undefined` but TypeScript return type does not contain undefined. This should be considered when writing code right now. There is a fix that is being worked on right now. https://github.com/Vincit/objection.js/pull/1651

## Trouble shooting

### Dockerized database

If when you run `npm run db:reset` you find a message similar to `Failed to reset database password authentication failed for user "<YOUR_USER_NAME>` then must be because your docker database is taking basic user configuration from your local postresql setup.

I order to solve this problem we are going to run the following commands:

```
$ psql
$ ALTER USER <YOUR_USER_NAME> WITH PASSWORD 'postgres';
$ exit;
```

Then try to run again docker, export and reset command:
`docker-compose up -d`
`export DATABASE_URL='postgresql://postgres:postgres@localhost:5432/emergencias_dev'`
`npm run db:reset`

## Setting up node

It is recommended to install [n](https://github.com/tj/n) to manage multiple node versions on your machine. You can also use nvm or some other nodejs version managers.

1. Install `n` via homebrew or npm. `brew install n`
2. Install `avn` to automatically switch to the node version for your projects.
3. Install the node version specified in the package.json file.
4. Run `npm install` to install all project packages.
