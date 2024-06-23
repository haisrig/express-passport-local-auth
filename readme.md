## Express-Passport-Local-Auth

This repo contains Node Express API built using _Typescript_.

Implemented authentication using _Passport_. It uses _MongoDB_ to as a data store and the express sessions get stored in the mongodb.

It has the below endpoint.
1. /api/login             -  **POST**
2. /api/login/status      -  **GET**
3. /api/logout            -  **POST**
4. /api/user              -  **GET**
5. /api/user              -  **POST**
6. /api/user/:username    -  **PATCH**
7. /api/user/:username    -  **DELETE**