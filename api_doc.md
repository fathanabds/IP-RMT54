# spoonazing API Documentation

## Models

### User

```md
- email : string, required, unique, isEmail
- name : string, required
- password : string, required
```

### Recipe

```md
- title : string, required
- image : string, required
- calories : integer, required
- protein : string, required
- fat : string, required
- carbs : string, required
```

### UserRecipe

```md
- UserId : integer, required
- RecipeId : integer, required
- favorite : boolean, required, (default: false)
```

## Endpoints

List of available endpoints:

- `POST /register`
- `POST /login`

## 1. POST /register

Request

- body:

```json
{
  "email": "string",
  "name": "string",
  "password": "string"
}
```

Response (201 - Created)

```json
{
  "id": "integer",
  "email": "string",
  "name": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
```

## 2. POST /login

Request

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (200 - OK)

```json
{
  "access_token": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid email/password"
}
```

## 3. POST /google-login

Request:

- headers:

```json
{
  "token": "string"
}
```

Response (200 - OK)

```json
{
  "access_token": "string"
}
```
