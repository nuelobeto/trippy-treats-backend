# Trippy Treats Backend

## Table of Contents

1. [Base Url](#base-url)
2. [Auth APIs](#auth-apis)

## Base Url

```
https://proud-deer-kilt.cyclic.app
```

## Auth APIs

```javaScript
### Regiter

endpoint: ${BASE_URL}/register
method: POST
example payload: {
    name: nuel,
    email: nuelobeto@gmail.com
    password: nwibyephd2
    phone: 09012345678
}
requires token: false
```

```javaScript
### Login

endpoint: ${BASE_URL}/login
method: POST
example payload: {
    email: nuelobeto@gmail.com
    password: nwibyephd2
}
requires token: false
```

```javaScript
### Forgot Password

endpoint: ${BASE_URL}/forgot-password
method: POST
example payload: {
    email: nuelobeto@gmail.com
}
requires token: false
```

```javaScript
### Update Password

endpoint: ${BASE_URL}/update-password/:userId
method: PUT
example payload: {
    password: new_password
}
requires token: false
```
