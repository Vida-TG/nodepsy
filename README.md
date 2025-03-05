# Nodepsy

A command-line tool for generating and managing Node.js backend projects.

## Overview
Nodepsy helps you quickly create Node.js backend applications with Express and MongoDB. It provides commands for generating APIs, managing authentication, and handling deployments.

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
```bash
npm install -g nodepsy
```

## Usage
### Create a new project
```bash
nodepsy new my-project
nodepsy new my-api --stack node-mongo
```

### Generate API endpoints
```bash
nodepsy generate api users --crud
nodepsy generate api products --graphql
```

### Create database models
```bash
nodepsy add model user --fields "name:String, email:String"
nodepsy add model product --fields "title:String, price:Number, inStock:Boolean"
```

### Authentication
```bash
nodepsy auth generate --user admin
nodepsy auth verify <token>
nodepsy auth mock --count 10
```

### Environment & Deployment
```bash
nodepsy env set MONGODB_URI=mongodb://localhost:27017
nodepsy deploy --platform heroku
nodepsy setup ci --github
```

## Project Structure
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
