# Frame
### Frame your art, DIYs and memes....
It is an online plateform for sharing art, DIYs and memes. It is open source also means you can also contribute to Frame.

## Technologies in use
| Technology     | Reason                                                         |
| ---------------|:--------------------------------------------------------------:|
| React          | for making components live                                     | 
| graphql        | for single endpoint and to avoid over fetching                 |   
| nodejs         | as backend                                                     |  
|typescript      | for reducing bugs and decorator support for graphql            |     
|type-orm        | for migartions because typescript in in use and type orm is<br>made for it| 
|Postgresql      | for relations |
|Redux           | for state management for scalability|
|Graphql-request | as client for graphql bcoz it is simple and dont have head <br>ache of cache like apollo server and we are also using redux so|
|SCSS            | as preprocessor for css for mixins and variables|
|JWT-token and argon| to keep users logged in and argor for bcrypting password.|
|Pusher          |for realtime notification service not in use|
## setting up local enviroment
have node, postgresql installed.
* create database  `CREATE DATABASE database name`
* create .env file under .env.example and fill all variables like .env.example.
* `cd server` and `yarn install` 
* `yarn start` if you have filled .env variable properly and everythink goes well you will see `server has started!`
* starting server for dev run `yarn watch` and split terminal and run `yarn dev`
* `cd ..` to get to root dir and `cd client` and `yarn install`
* to start client run `yarn start`
#### wow you are good to go!
## contribution guide
make sure to create issue before adding new feature to Frame and make sure to clear all unused consoles and to resolve all typescript errors. 
the design idea is like https://www.figma.com/file/mZmE4N7OXK2Te4TWDAeCNV/Untitled?node-id=0%3A1
