# Blog List App

A full-stack application built as part of the **FullStackOpen** course. This app provides a backend for managing a list of blogs, with full CRUD functionality, user authentication, and robust error handling. It is designed to explore best practices for backend development and testing.

---

## Features

- **CRUD Operations**: Create, read, update, and delete blog entries.
- **User Authentication**: Users can register, log in, and perform actions based on their authentication.
- **Database Integration**: Persistent data storage with MongoDB.
- **Error Handling**: Robust error messages and middleware for validation.
- **Testing**: Comprehensive unit and integration testing for the backend.

---

## Technologies Used

### Backend:
- **Node.js**: Runtime environment.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: Database for storing user and blog data.
- **Mongoose**: ODM library for MongoDB schema modeling.
- **JSON Web Tokens (JWT)**: Authentication and authorization.
- **Jest & Supertest**: Testing framework and tools for integration testing.

### Tools:
- **Postman**: Testing and debugging APIs.
- **ESLint & Prettier**: Code formatting and linting.
- **Git & GitHub**: Version control and repository management.

---

## API Endpoints

| Method | Endpoint            | Description                                |
|--------|---------------------|--------------------------------------------|
| POST   | `/api/login`         | Log in a user and receive a token.         |
| GET    | `/api/blogs`         | Fetch all blog posts.                      |
| POST   | `/api/blogs`         | Add a new blog post (authenticated users). |
| DELETE | `/api/blogs/:id`     | Delete a blog post by ID (authenticated).  |
| PUT    | `/api/blogs/:id`     | Update a blog post by ID (authenticated).  |
| POST   | `/api/users`         | Register a new user.                       |

---
