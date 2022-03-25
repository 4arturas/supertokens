# Supertokens

```bash
docker run -p 3567:3567 \
    --name supertokens \
    -e POSTGRESQL_USER="x" \
    -e POSTGRESQL_PASSWORD="x" \
    -e POSTGRESQL_HOST="x" \
    -e POSTGRESQL_PORT="5432" \
    -e POSTGRESQL_DATABASE_NAME="x" \    
    -d registry.supertokens.io/supertokens/supertokens-postgresql
````

# Change refresh, access tokens validity, link
## Default values: refresh=144000, access=3600
```bash
docker run -p 3567:3567 \
    --name supertokens \
    -e POSTGRESQL_USER="x" \
    -e POSTGRESQL_PASSWORD="x" \
    -e POSTGRESQL_HOST="x" \
    -e POSTGRESQL_PORT="5432" \
    -e POSTGRESQL_DATABASE_NAME="x" \
    -e REFRESH_TOKEN_VALIDITY=144000 \
    -e ACCESS_TOKEN_VALIDITY=3600 \
    -d registry.supertokens.io/supertokens/supertokens-postgresql
````

# Check docker logs
```bash
docker logs supertokens -f
````