# DHBW Lörrach Web-Engineering Exam

## Build a chat application with frontend and backend.

### Team:

- Emre Goek
- Louis Baumgart
- Urim Miftari
- Jonas Kaiser
- Benjamin Meier

### Technologies used:

#### Backend

- Node.js
- Express
- TypeScript
- Cors
- Socket.io

#### Frontend

- React
- React Router Dom
- TypeScript
- Axios
- Chakra-UI
- Socket.io

### How to install:

1. Run `yarn install` or `npm install` in the **root directory**
2. Run `yarn start` or `npm start` to install and run the backend and frontend automatically, thanks to [concurrently](https://www.npmjs.com/package/concurrently)

### Collections

| Collection | Description      |
| ---------- | ---------------- |
| users      | Stores users     |
| rooms      | Stores rooms     |
| chats      | Stores chats     |
| messages   | Stores messages  |
| reactions  | Stores reactions |

### REST-API

#### User API

| Method | URL           | Action            |
| ------ | ------------- | ----------------- |
| POST   | /api/user     | create user       |
| GET    | /api/user/:id | get user by id    |
| PUT    | /api/user/:id | update user by id |
| DELETE | /api/user/:id | delete user by id |
| GET    | /api/users    | get all users     |

#### Room API

| Methods | URLs          | Actions           |
| ------- | ------------- | ----------------- |
| POST    | /api/room     | create room       |
| GET     | /api/room/:id | get room by id    |
| PUT     | /api/room/:id | update room by id |
| DELETE  | /api/room/:id | delete room by id |
| GET     | /api/rooms    | get all rooms     |

#### Message API

| Methods | URLs             | Actions              |
| ------- | ---------------- | -------------------- |
| POST    | /api/message     | create message       |
| GET     | /api/message/:id | get message by id    |
| PUT     | /api/message/:id | update message by id |
| DELETE  | /api/message/:id | delete message by id |
| GET     | /api/messages    | get all messages     |

### Socket-Events

#### Room Events

| Events         | Description                                                                 |
| -------------- | --------------------------------------------------------------------------- |
| chat:created   | New chat is created - Add chat into sidebar and into DB                     |
| chat:deleted   | Chat was deleted - Remove chat from sidebar and from DB                     |
| chat:joined    | Chat joined - Add user to socket room                                       |
| chat:left      | Chat left - Remove user from socket room                                    |
| room:created   | New room was created - Add room into sidebar and into DB                    |
| room:deleted   | Room was deleted - Remove room from sidebar and from DB                     |
| room:joined    | Room joined - Add user to socket room                                       |
| room:left      | Room left - Remove user from socket room                                    |
| message        | New message received - Add it into messages array                           |
| message:edited | Message was edited - Update the message by id                               |
| user:typing    | User is typing - Show Typing component if user is in same chat as the typer |
| user:notyping  | User stopped typing - Remove user from typing component                     |

#### Room or Chat?

### Todos/Questions

- FIRST LOAD ALL NECESSARY APIS AND THEN SHOW COMPONENTS
- Show unread messages
- Add notifications
- Some context menus e.g. on channel, on message
- Sort sidebar by last messages
- Exclude own user in UserSearch

1. User logs in from /
2. Choosen user is now stored in localStorage
3. Load the currentUser from localStorage
4. Check if currentUser.lastChannelId is set, if yes:
   - load room details and go to lastChannelId
5. lastChannelId wasn't set, check if /room/:id or /chat/:id is set
   - load room details and go to :id
6. lastChannelId and :id are not set
   - show EmptyRoom component
7. get messages and reactions

### Improvement for the future

- Add Redux for global state management
