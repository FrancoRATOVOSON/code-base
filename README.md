# code-base

My code-base boilerplate

## Initialization

After cloning the repos, you must install `docker` and run a `postgresql` container.

`docker run -itd -e POSTGRES_USER=dbuser -e POSTGRES_PASSWORD=db_password -p 5432:5432 -v /data-location:/var/lib/postgresql/data --name postgresql postgres`
