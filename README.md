# Teacher Administration System

## Overview
This project provides a RESTful API for teachers to manage students through basic administrative functions.  

Both teachers and students are identified using their email addresses.


## Database Design

The database schema consists of four main tables:

- **User**: Stores both teachers and students, identified by a unique email.
- **TeacherInfo**: Additional info for teachers (status, year).
- **StudentInfo**: Additional info for students (status, year).
- **TeacherStudent**: A join table representing the relationship between teachers and their registered students.

Relationships:
- Each `TeacherInfo` and `StudentInfo` is associated with `User`.
- Each teacher can register multiple students through the `TeacherStudent` relationship table.

Indexes:
1. Composite index on (userId, status) in `TeacherInfo` and `StudentInfo`
- Helps optimize filtering queries, especially when retrieving only active teachers or students.

2. Unique composite index on (teacherInfoId, studentInfoId) in `TeacherStudent` 
- Prevents duplicate teacher–student pairings (i.e. a student being registered multiple times under the same teacher).
- Improves performance when querying students registered to a specific teacher.

Assumption:
- The `TeacherStudent` relationship is used to represent class membership.
- A separate Class entity was not introduced, as all required operations (e.g., register, suspend, notify) can be effectively handled through this relationship.
- This approach was chosen for simplicity and is aligned with the given API requirements.

👉 See [`database/DDL.sql`](database/DDL.sql) for full table definitions.

<br>

## 🛠️ Prerequisites
- NodeJS v18.x.x
- Docker
- MySQL                

<br>

### Exposed Port

| S/N | Application | Exposed Port |
| --- | ----------- | ------------ |
| 1   | database    | 33306        |
| 2   | application | 3000         |

<br>

## 🚀 Commands

All commands below should be run from the project directory.

-- -
### Remove Docker Services and Volumes

To stop and remove all Docker services and delete persisted volumes (e.g., database data):

```bash
npm run remove:services
```
Use this when you’ve made changes to the database schema or want to reset all data

<br>

### Starting Project Services

This starts the Docker service (MySQL container).

After the database container is up, the schema and seed scripts located in the `database/` folder will be automatically initialized.


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

### Health Check
To confirm the API is running locally:
```
GET http://localhost:3000/api/healthcheck
```
Should return HTTP 200 OK
-- -
<br>

### 🧪 Run Unit Tests

Run all unit tests:

```bash
npm test
```

With coverage:
```bash
npm test -- --coverage 
```

Run a specific test:

```bash
npm test -- __tests__/services/studentService.test.ts
npm test -- __tests__/services/notificationService.test.ts
npm test -- __tests__/services/userService.test.ts 
```
-- -
<br>

### 📬 Postman Collection

You can test API endpoints using [Postman](https://www.postman.com/downloads/) .

Import the collection from the `postman/` folder.

Run the provided request examples to test the endpoints.