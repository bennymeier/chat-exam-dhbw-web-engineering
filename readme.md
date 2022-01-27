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

### REST-API

#### User API

| Methods | URLs          | Actions           |
| ------- | ------------- | ----------------- |
| POST    | /api/user     | create user       |
| GET     | /api/user/:id | get user by id    |
| PUT     | /api/user/:id | update user by id |
| DELETE  | /api/user/:id | delete user by id |
| GET     | /api/users    | get all users     |

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

| Events       |
| ------------ |
| room:created |
| room:deleted |
| room:joined  |
| room:left    |

#### Room or Chat?

isRoom: boolean;

### Todos/Questions
- Show last message in sidebar
- Sort sidebar by last messages
- Exclude own user in UserSearch
- Multiple 1-1 chats currently possible - yes/no?

1. User logs in from /
2. Choosen user is now stored in localStorage
3. Load the currentUser from localStorage
4. Check if currentUser.lastRoomId is set, if yes:
   - load room details and go to lastRoomId
5. lastRoomId wasn't set, check if /room/:id or /chat/:id is set
   - load room details and go to :id
6. lastRoomId and :id are not set
   - show EmptyRoom component
7. get messages and reactions
