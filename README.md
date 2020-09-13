# Rest API
Modulo de API para el proyecto [SlickLearn](https://github.com/slicklearn/slicklearn)  
Todas las operaciones del backend se realizan aquí.

## Index
- [Endpoints](#endpoints)
  - [Register](#register-endpoint)
  - [Login](#login-endpoint)
  - [Check Session](#checksession-endpoint)
  - [Logout](#logout-endpoint)
  - [Update Username](#update-username-endpoint)
  - [Update Password](#update-password-endpoint)

## Endpoints
#### Register Endpoint
**Endpoint** `http://localhost:2000/auth/register`  
**Method** `POST`  
**Required Values** `username`, `email` and `password`  
**Description** Este Endpoint es el encargado de registrar nuevos usuarios a la base de datos.  

<hr>

#### Login Endpoint
**Endpoint** `http://localhost:2000/auth/login`  
**Method** `POST`  
**Required Values** `email` and `password`  
**Description** Este Endpoint es el encargado de autenticar a nuevos usuarios y guardar la sesion en una Cookie.  

<hr>

#### Checksession Endpoint
**Endpoint** `http://localhost:2000/auth/checksession`  
**Method** `GET`  
**Required Values** none  
**Description** Este Endpoint devuelve si el usuario tiene una sesión iniciada y si es así devuelve los datos del mismo.  

<hr>

#### Logout Endpoint
**Endpoint** `http://localhost:2000/auth/logout`  
**Method** `GET`  
**Required Values** none  
**Description** Este Endpoint destruye la sesión actual del usuario en caso de estar logeado.  

<hr>

#### Update Username Endpoint
**Endpoint** `http://localhost:2000/account/updateusername`  
**Method** `POST`  
**Required Values** `username`  
**Description** Este Endpoint actualiza el nombre a un usuario.  

<hr>

#### Update Password Endpoint
**Endpoint** `http://localhost:2000/account/updatepassword`  
**Method** `POST`  
**Required Values** `oldPassword` and `newPassword`    
**Description** Este Endpoint actualiza la contraseña del usuario, se require la antigua contraseña.  
