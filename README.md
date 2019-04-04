To run locally

Requirements: MongoDBCommunnityServer
https://www.mongodb.com/download-center/community

You can download the MongoDB Community Server from the MongoDB download page. The download is a zip file. Unzip the contents, change the folder name to "mongodb", and move it to your users home directory. From there, create a "mongodb-data" directory in your user directory to store the database data.
You can start the server using the following command. Make sure to swap out "/Users/Andrew/" with the correct path to your users home directory.
/Users/Andrew/mongodb/bin/mongod --dbpath=/Users/Andrew/mongodb-data

1. git clone
2. cd lead-generators
3. delete node_modules and package-lock.json if present
4. run npm i or yarn
5. create config directory in root of project with test.env and dev.env files with the env variables listed below
   a) PORT=3000
   b) SEND_GRID_API_KEY= get your own api key
   c) JWT_SECRET= can be any password
   d) For development MONGODB_URL= MONGODB_URL=mongodb://127.0.0.1:27017/taskapp  (or any name you want to give your dev db)
6. npm run dev or yarn run dev

To run jest test suite run npm run test or yarn run test

If you want a GUI for your database use either Robo3t or MongoDB Compass.

Make sure to set environment variables for PORT, SENDGRID_API_KEY, JWT_SECRET, MONGODB_URL in a Config directory at the root of your project. Inside Config directory add test.env and dev.env each with those 4 variables.

To deploy:
Set the same environment variables for heroku/dokku except the PORT variable can be left out.
Heroku Environment variables can be set through the command line or directly on heroku.com.
Dokku environments variables can be set from the command line only.
dokku config:set appname KEY=value KEY_2=value2 KEY_3=value3
