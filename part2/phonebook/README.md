# Phonebook App

A full-stack phonebook application built as part of the **FullStackOpen** course. This application allows users to store, manage, and update contact information (names and phone numbers) in a database.

---

## Features

- **Add Contacts:** Save a person's name and phone number to the phonebook.
- **View All Contacts:** Display all saved contacts in an intuitive interface.
- **Delete Contacts:** Remove a contact from the phonebook.
- **Update Existing Contacts:** Edit phone numbers for existing contacts.
- **Validation:** Prevent duplicate entries for names.
- **Notifications:** Display success and error messages for user actions.

---

## Technologies Used

### Frontend:
- **React**: Built the user interface for displaying and managing contacts.
- **Axios**: For making HTTP requests to the backend API.
- **CSS**: Styled the components for a clean and responsive design.

### Backend:
- **Node.js**: Backend server built with Express.
- **RESTful API**: For handling requests and managing contact data.
- **JSON Server (Development)**: Used as a mock backend for testing during early stages.

### Database:
- **MongoDB**: Stores contact information persistently.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
