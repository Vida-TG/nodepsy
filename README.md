# Nodepsy

A command-line tool for generating and managing Node.js backend projects.

## Overview
Nodepsy helps you quickly create Node.js backend applications with Express and MongoDB. It provides commands for generating APIs, managing authentication, and handling deployments.

## Features
- Nodejs barebone
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
```

### Generate API endpoints
```bash
nodepsy generate api users --crud
```

### Create database models
```bash
nodepsy add model user --fields "name:String, email:String"
```

### Authentication
```bash
nodepsy auth generate --user admin
```
