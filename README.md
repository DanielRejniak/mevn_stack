# MEVN Stack

MVP ready stack consisting of Mongo, Express, Vue and Node. The aim of the stack is to allow the users quickly implement bussines logic rather than spending time on time consuming infrastructure setup.

The stack implemtns secure authorization and registration through use of Firebase, authenticated user can make use of protected routes and API endpints that are baked in to the application. 

Mongo database authenticated allows the users to persist any data which can be later used to implement furhter logic. 

## Starting Application Through Docker

* Ensure the firebase properties are added on the frontend side.
* Ensure the firebase service file is added on the backend side.
* Ensure the database config on the backend side is configured.
* Once <strong>all of the above</strong> are doen then go ahead a run the command bellow.

```
docker-compose up --build
```