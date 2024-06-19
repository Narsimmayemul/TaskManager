# Task Management API

## Overview

The Task Management API is a RESTful service built using Node.js, Express.js, and MongoDB. It allows users to manage their tasks by providing endpoints for creating, reading, updating, and deleting tasks. Each task can have attributes such as title, description, due date, priority, and status.

## Features

- User authentication with JWT
- CRUD operations for tasks
- Due date validation
- User-specific tasks

## Prerequisites

- Node.js (v14 or later)
- MongoDB (v4.2 or later)

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/task-management-api.git
cd task-management-api
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/task-manager-api
JWT_SECRET=your_jwt_secret
```

### Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

### User Authentication

#### Sign Up

- **URL**: `/api/users/signup`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "testuser",
    "password": "password"
  }
  ```
- **Response**: 
  ```json
  {
    "user": {
      "username": "testuser"
    },
    "token": "jwt_token"
  }
  ```

#### Sign In

- **URL**: `/api/users/signin`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "testuser",
    "password": "password"
  }
  ```
- **Response**: 
  ```json
  {
    "user": {
      "username": "testuser"
    },
    "token": "jwt_token"
  }
  ```

### Task Management

#### Create a Task

- **URL**: `/api/tasks`
- **Method**: `POST`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Body**:
  ```json
  {
    "title": "Test Task",
    "description": "Test description",
    "dueDate": "2024-12-31",
    "priority": "high",
    "status": "pending"
  }
  ```
- **Response**: 
  ```json
  {
    "task": {
      "_id": "task_id",
      "title": "Test Task",
      "description": "Test description",
      "dueDate": "2024-12-31T00:00:00.000Z",
      "priority": "high",
      "status": "pending",
      "owner": "user_id"
    }
  }
  ```

#### Get User Tasks

- **URL**: `/api/tasks`
- **Method**: `GET`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Response**:
  ```json
  [
    {
      "_id": "task_id",
      "title": "Test Task",
      "description": "Test description",
      "dueDate": "2024-12-31T00:00:00.000Z",
      "priority": "high",
      "status": "pending",
      "owner": "user_id"
    }
  ]
  ```

#### Get Task by ID

- **URL**: `/api/tasks/:id`
- **Method**: `GET`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "task_id",
    "title": "Test Task",
    "description": "Test description",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "priority": "high",
    "status": "pending",
    "owner": "user_id"
  }
  ```

#### Update a Task

- **URL**: `/api/tasks/:id`
- **Method**: `PATCH`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Body**:
  ```json
  {
    "description": "Updated description"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "task_id",
    "title": "Test Task",
    "description": "Updated description",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "priority": "high",
    "status": "pending",
    "owner": "user_id"
  }
  ```

#### Delete a Task

- **URL**: `/api/tasks/:id`
- **Method**: `DELETE`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "task_id",
    "title": "Test Task",
    "description": "Test description",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "priority": "high",
    "status": "pending",
    "owner": "user_id"
  }
  ```

## Running Tests

### Install Test Dependencies

```bash
npm install --save-dev jest supertest
```

### Run Tests

```bash
npm test
```

The tests are located in the `src/tests` directory and use `jest` and `supertest` for testing the API endpoints.
