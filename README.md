# Spoonazing

A web-based application to search for and store food based on calories with REST API server.

## Authors

- [@fathanabds](https://github.com/fathanabds)

## Deployment

Client: [https://ip-p2-h8.web.app/](https://ip-p2-h8.web.app/)

Server: [https://fase2.fathanabds.online](https://fase2.fathanabds.online)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Server:

`SPOON_API_KEY`

`JWT_KEY`

`GOOGLE_CLIENT_ID`

## Features

- User Authentication: Signup, Login, Login with Google
- Recipes: View All Recipes from 3rd Party API (Spoonacular), Add Recipe to Wishlist, Remove Recipe from Wishlist
- AI Generated Calorie Needs

## Installation

Install dependencies with npm

```bash
  cd client
  npm install
```

```bash
  cd server
  npm install
```

## Running Tests

To run tests, run the following command

```bash
  cd server
  npm run test
```

## Documentation

[API Documentation](https://github.com/fathanabds/IP-RMT54/blob/main/api_doc.md)
