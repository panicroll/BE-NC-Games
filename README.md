# Northcoders House of Games API

## Environment Setup

To connect to the databases locally create two files in the project root directory: `.env.development` and `.env.test`.

Within .env.development add:
```
PGDATABASE=nc_games
```
Within .env.test add:
```
PGDATABASE=nc_games_test
```

(Check /db/setup.sql to ensure that these database names match)