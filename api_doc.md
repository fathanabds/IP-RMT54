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

&nbsp;

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

&nbsp;

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

&nbsp;

## 4. POST /user-recipes

Request:

- headers:

Description:

- Save the recipe by RecipeId

```json
{
  "authorization": "Bearer <token>"
}
```

- body:

```json
{
  "title": "Best Potato Cheese Soup in a bread bowl",
  "image": "https://img.spoonacular.com/recipes/634927-312x231.jpg",
  "calories": 750,
  "protein": "26g",
  "fat": "45g",
  "carbs": "58g"
}
```

_Response (201 - Created)_

```json
{
  "id": 3,
  "UserId": 2,
  "RecipeId": 3
}
```

&nbsp;

## 5. GET /user-recipes

Request:

- headers:

Description:

- Show current user recipes

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "UserId": 1,
    "RecipeId": 1,
    "favorite": false,
    "createdAt": "2024-10-29T10:01:35.482Z",
    "updatedAt": "2024-10-29T10:01:35.482Z",
    "Recipe": {
        "id": 1,
        "title": "Best Potato Cheese Soup in a bread bowl",
        "image": "https://img.spoonacular.com/recipes/634927-312x231.jpg",
        "calories": 750,
        "protein": "26g",
        "fat": "45g",
        "carbs": "58g",
        "createdAt": "2024-10-29T10:01:35.446Z",
        "updatedAt": "2024-10-29T10:01:35.446Z"
    	}
	},
	...,
]
```

&nbsp;

## 6. DELETE /user-recipes/:id

Description:

- Delete user recipe by id

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Recipe has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
