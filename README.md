This is a NODEJS TASK APP (CRUD BOILERPLATE) that can be reconfigured for any app.

Comes with bcrypt authentication, jwt tokens, email capability, all CRUD routes configured, task-owner relation, cascade delete, file uploads, error handling, sorting, pagination, and filtering.

To run locally

1. git clone
2. cd task-manager
3. run npm i or yarn
4. npm run dev or yarn run dev

To run jest test suite run npm run test or yarn run test

Configured for MongoDB

Make sure to set environment variables for PORT, SENDGRID_API_KEY, JWT_SECRET, MONGODB_URL in a Config directory at the root of your project. Inside Config directory add test.env and dev.env each with those 4 variables.

To deploy:
Set the same environment variables for heroku except the PORT variable can be left out.
Heroku Environment variables can be set through the command line or directly on heroku.com.
