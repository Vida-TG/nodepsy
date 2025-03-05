# Nodepsy

A command-line tool for generating and managing Node.js backend projects.

## Overview
Nodepsy helps you quickly create Node.js backend applications with Express and MongoDB. It provides commands for generating APIs, managing authentication, and handling deployments.

## Quick Start
```bash
# Install globally
npm install -g nodepsy

# Create a new project
nodepsy new my-api

# Navigate to project
cd my-api

# Install dependencies
npm install

# Start the server
npm start
```

## Tech Stack
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Docker support
- GitHub Actions CI/CD

## Features
- Node project scaffolding
- API generation
- User management
- Database models
- Deployment tools

## Installation
### Prerequisites
- Node.js >= 14
- MongoDB (for local development)

### Global Installation
```bash
npm install -g nodepsy
```

## Usage
### Create a new project
Creates a new Node.js project with Express and MongoDB setup.

```bash
nodepsy new my-project
nodepsy new my-api --stack node-mongo
```

Options:
- `--stack`: Technology stack to use (default: node-mongo)

### Generate API endpoints
Generates API endpoints with controllers and routes.

```bash
nodepsy generate api users --crud
nodepsy generate api products --graphql
```

Options:
- `--crud`: Generate CRUD endpoints
- `--graphql`: Generate GraphQL API (coming soon)

### Create database models
Creates Mongoose models with specified fields.

```bash
nodepsy add model user --fields "name:String, email:String"
nodepsy add model product --fields "title:String, price:Number, inStock:Boolean"
```

Supported field types:
- String
- Number
- Boolean
- Date
- ObjectId

### Authentication
JWT token management and mock user generation.

```bash
nodepsy auth generate --user admin
nodepsy auth verify <token>
nodepsy auth mock --count 10
```

### Environment & Deployment
Configure environment variables and deployment settings.

```bash
nodepsy env set MONGODB_URI=mongodb://localhost:27017
nodepsy deploy --platform heroku
nodepsy setup ci --github
```

## Project Structure
Generated project structure and file organization.

```
my-project/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── app.js
├── tests/
├── package.json
└── .env
```

## Generated API Endpoints
When using the `--crud` option, the following endpoints are created:

```
GET    /api/resource     # List all resources
GET    /api/resource/:id # Get single resource
POST   /api/resource     # Create resource
PUT    /api/resource/:id # Update resource
DELETE /api/resource/:id # Delete resource
```

## Troubleshooting

### Common Issues
1. **MongoDB Connection**: Ensure MongoDB is running locally or update MONGODB_URI
2. **Port Conflict**: Change PORT in .env if 3000 is in use
3. **Dependencies**: Run `npm install` after generating new components

### Error Messages
- `Error: Cannot find module`: Run `npm install` in project directory
- `MongoError: connect ECONNREFUSED`: Start MongoDB service

## Contributing
Contributions are welcome! Please check our contributing guidelines.

## License
MIT
