# Frame

### Frame your art, DIYs and memes....

It is an online plateform for sharing art, DIYs and memes. It is open source also means you can also contribute to Frame.

## setting up local enviroment

have node, postgresql installed.

- create database `CREATE DATABASE database name`
- create .env file under .env.example and fill all variables like .env.example.
- `cd server` and `yarn install`
- `yarn start` if you have filled .env variable properly and everythink goes well you will see `server has started!`
- starting server for dev run `yarn watch` and split terminal and run `yarn dev`
- `cd ..` to get to root dir and `cd client` and `yarn install`
- to start client run `yarn start`

#### wow you are good to go!

## contribution guide

make sure to create issue before adding new feature to Frame and make sure to clear all unused consoles and to resolve all typescript errors.
the design idea is like [FIGMA-design link](https://www.figma.com/file/mZmE4N7OXK2Te4TWDAeCNV/Untitled?node-id=0%3A1)
Know more about what stack frame is using on [STACK.md](https://github.com/tanay-pingalkar/Frame/blob/main/STACK.md)
