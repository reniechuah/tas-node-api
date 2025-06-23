# Teacher Administration System

This project provides a RESTful API for teachers to manage students through basic administrative functions. <br>
Both teachers and students are identified using their email addresses.


## Prerequisites
- NodeJS v18.x.x
- Docker
- MySQL                

<br>

## Exposed Port

| S/N | Application | Exposed Port |
| --- | ----------- | ------------ |
| 1   | database    | 33306        |
| 2   | application | 3000         |

<br>

## Commands

All the commands listed should be ran in project directory.
-- -

### Starting Project Services

This will start the docker services cotainer i.e. database cotainer. <br>

After the database container is up, the database schema and seed scripts located in the /database folder will be automatically initiated and applied.

```bash
npm run start:services
```

<br>

### Installing Project dependencies

```bash
npm install
```

<br>

### Starting Project application 

This will start the application in watch mode.

```bash
npm run start:dev
```

<br>

### Check local application is started

You should be able to call (GET) the following endpoint and get a 200 response

```
http://localhost:3000/api/healthcheck
```
-- -
<br>

### Run Project Unit Tests 

This will run project unit tests.

```bash
npm test
npm test -- --coverage 
```

This will run specific unit test.

```bash
npm test -- __tests__/services/studentService.test.ts
npm test -- __tests__/services/notificationService.test.ts
npm test -- __tests__/services/userService.test.ts 
```
-- -
<br>

### Postman Collection

You can use Postman Collection to test the API.

Get Postman Collection from /postman folder

Import it into [Postman](https://www.postman.com/downloads/) and test the endpoints easily.