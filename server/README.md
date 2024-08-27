### DB creation

Install `docker` and `docker-compose` and run `docker`.

Run following command to launch MySQL server:

```bash
$ docker-compose up
```

## Installation

```bash
$ npm install
```

## Migration

To create migration:

```bash
$ npx knex migrate:make create_questions_table
```

To migrate:

```bash
$ npx knex migrate:latest
```