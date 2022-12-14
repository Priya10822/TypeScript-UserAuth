# User Authentication Using Express, NodeJS, JWT & TypeScript

## Description
This project provides Authentication services to the user by providing Signup/Register and Login/Logout APIs. It has various layers of authorization and authentication to provide maximum possible security. Feature includes login, logout, register, email or username validation and user authentication using jsonwebtoken. Can be used as starter for other Node.JS applications using Node.js, Express, JWT, mongoose, typescript and more.

## Usage

### Install All Packages
```bash
  npm install express ejs mongoose bcryptjs connect-flash cookie-parser express-session memorystore jsonwebtoken body-parser
```
### Install Nodemon for Development
```bash
  npm install -D nodemon
```
### Install TypeScript & Types for Packages
TypeScript is available as a package on the npm registry available as "typescript".

```bash
  npm i -D typescript ts-node @types/node @types/express
```
```bash
   npm i -D  @types/express-session @types/cookie-parser @types/connect-flash @types/bcryptjs @types/body-parser @types/jsonwebtoken
```

## User signup & login

- Check for the valid email id and username when user register.
- Login form allows users to login to the website after they have created their account using the signup form.
- jsonwebtoken used for authenciationg the user

## End Points
**POST** - http://localhost:8000/signup

**POST** - http://localhost:8000/login

## Parameters
| Parameter         | type        |      description                                    |
| -----------------  | ----------- | ---------------------------------------------------- |
| username | string | username of the user |
| email | string | email id of the user |
| password | string | user password |
| confirmpassword | string | confirm user password |


## API

| Method | URI               | Middleware |
| ------ | ----------------- | ---------- |
| POST   | /signup           |            |
| POST   | /login            |            |
| POST   | /logout           |  auth      |
| POST   | /profile          |  auth      |


