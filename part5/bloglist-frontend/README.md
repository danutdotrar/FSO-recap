# Blog List App

A full-stack blog management application built as part of the **FullStackOpen** course. This app provides a fully functional backend and frontend for managing blogs, featuring user authentication, CRUD operations, and comprehensive testing.

---

## Features

- **User Authentication**: Secure login system using JSON Web Tokens (JWT).
- **CRUD Operations**: Create, read, update, and delete blogs.
- **Global State Management**: Efficient handling of application state using Redux.
- **Responsive Design**: Frontend built with React for a seamless user experience.
- **Testing**: Comprehensive backend and frontend tests using Jest and Supertest.

---

## Technologies Used

### Frontend:
- **React**: Building the user interface.
- **Redux**: Managing global application state.
- **Axios**: Communicating with the backend via HTTP requests.
- **CSS**: Styling the application for responsive design.

### Backend:
- **Node.js**: Runtime environment for JavaScript.
- **Express**: Web framework for creating RESTful APIs.
- **MongoDB**: Database for storing user and blog data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **JSON Web Tokens (JWT)**: For user authentication and authorization.

### Testing:
- **Jest**: Testing framework for unit and integration tests.
- **Supertest**: Library for testing HTTP endpoints.

---

## API Endpoints

| Method | Endpoint         | Description                                |
|--------|------------------|--------------------------------------------|
| POST   | `/api/login`      | Authenticate user and return a token.     |
| GET    | `/api/blogs`      | Fetch all blogs.                          |
| POST   | `/api/blogs`      | Add a new blog (requires authentication). |
| DELETE | `/api/blogs/:id`  | Delete a blog by ID (requires authentication). |
| PUT    | `/api/blogs/:id`  | Update a blog by ID (requires authentication). |
| POST   | `/api/users`      | Register a new user.        

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
