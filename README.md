# Musify-API
Musify-API is a project based on the project with the same name proposed in the MEAN2 Course of Victor Robles on Udemy.

The original project uses an API coded with Node-Express-MongoDB and Angular as FrontEnd, all in the same repository, for learning purposes i will separate API in this repository and FrontEnd with Angular on another.

Also, i hope to work on a version of the FrontEnd App using ReactJS, after i complete Angular project.

For this Express API i've been trying to implement best practices and uses libaries not included in the course, for example, Joi for request params validations, helmet for security, or cors to enable cors protection.

API Runs on Port 8000, unless another Port is configured with and environment file.


# Install
```
git clone https://github.com/danielherrerab/musify-api.git
cd musify-api
npm install
```
# API Requests
```
POST http://localhost:8000/auth/login
POST http://localhost:8000/auth/singup
```

# Authentication
API uses JWT for user authentication, token are returned on http response as 'token', after login or sign up successfully
config.js defaults
```js
export const JWT_DAYS_TO_EXPIRE = 30 // Time that token will be valid, in days
export const JWT_SECRET_SIGNATURE = 'ThisIsTheSecretForJWTGenerationChangeItBeforeUseItPleaseXoXo' // Secret phrase used to authenticate token
export const JWT_HEADER = 'Authorization' // Name of the header that will be used to look for the token
```

