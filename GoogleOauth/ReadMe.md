=> full documentation - https://github.com/ankurdotio/Difference-Backend-video/tree/main/025-googleoauth

=> new packages :-
npm i passport: Authentication middleware.
npm i passport-google-oauth20: Google OAuth 2.0 strategy for Passport.
npm i morgan - it log the request in terminal


=> what is password
- it is a middleware which we use to add continue with google, facebook type feature you can read more about it here
https://www.passportjs.org/packages/

=> steps :-
1. create new project in google cloud console
2. open APIs and Services
3. click oAuth consent screen -> get started
 -  fill app name (anything) and support email(it will be used to send emails to users)
 -  audience - external
 -  contact information - email
 -  finish - continue
4. go back and click APIs and services after that click credentials
 - create credentails -> oAuth client ID
 - choose "web application"
 - set authorized redirect URI's
 ```http://localhost:3000/auth/google/callback ```
 - click create
 - note down CLIENT ID and CLIENT SECRET