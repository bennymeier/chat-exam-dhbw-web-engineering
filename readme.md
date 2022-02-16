# DHBW Lörrach Web-Engineering Exam

## Build a chat application with frontend and backend.

### Team:

- Emre Goek
- Louis Baumgart
- Urim Miftari
- Jonas Kaiser
- Benjamin Meier

### Technologies used:

All frameworks, languages or libraries are used because they are:

- Actively maintained
- Saves much time in development
- Used by millions of users

#### Backend

- **Node.js**

  Easy backend language because it's JavaScript based and it's fast because of it's threads.

- **Express**

  Good addition on top of Node.js, it's lightweight and helps for a more organized MVC architecture. Its routing system is easy for building APIs, without we have to manage our own routing.

- **TypeScript**
  The best superset for JavaScript! Typings makes it a lot easier for new developers and it prevents errors because we know what which type we're getting and which type we have to set. Without we have to test or have to check the types.
- **Cors**

  Web browsers prevent unknown websites from accessing our application programming interfaces and services. This way, our server shares its resources only with clients that are on the same domain.
  E.g. our API has the port `3000` and our frontend runs on port `3001`. It's different and we can't acces our API, so we have to enable cors to do it. Therefore we need this package, it enables everything for us and works as middleware in Express.

- **Socket.io**

  Socket.io could be named as a layer of real WebSockets. In the following list are some good benefits of using Socket.io.

  - Autoconnect
  - Namespaces
  - Rooms
  - Subscription service
  - Good logging support

#### Frontend

- **React**

  With its synthetical sugar called JSX it's easy to write down our components. More benefits listed below:

  - Speed
  - Flexibility
  - Usability
  - Reusable components
  - Good library additions to use: React-Select (our user select list), Chakra-UI (our UI framework)
  - Mobile app development -> React Native

- **React Router Dom**

  Enables dynamic routing in our web app. It allows us to display pages, e.g. `/login` shows the `<LoginComponent />`

- **TypeScript**
- **Axios**

  - Supports older browsers (not like the native `fetch()`)
  - Way to abort requests
  - Way for response timeouts
  - Supports upload progress
  - Performs automatic JSON data transformation

- **Chakra-UI**

  - Looks good!
  - Finished components
  - Good accessibility
  - Intuitive component APIs

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

### Important!

Neither the backend nor the frontend is secured! The API-Calls are not safe because there is no real login!
With a login the API would be saved by a JWT-Token send with every API-Request! So keep in mind that you can do anything with the API, e.g. you can delete every message also the messages sent by others, you can remove or add every user to a channel...

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

### Improvements

- Implement infinity loading for:
  - messages
  - userlist
  - roomlist
- Show unread messages
- Use debouncers for input fields
- Sort sidebar by last messages
- Some context menus e.g. on channel, on message
- Exclude own user in UserSearch
- Add native notifications (for incoming messages)
- Add more skeletons
- Add reactions to messages
- Add Redux for global state management and to prevent unnecessary re-renderings

### How we search and open the last chat

1. User logs in from `/`
2. Choosen user is now stored in localStorage
3. Load the `currentUser` from localStorage
4. Check if `currentUser.lastChannelId` is set, if yes:
   - load room details and go to `lastChannelId`
5. `lastChannelId` wasn't set, check if `/room/:id` or `/chat/:id` is set
   - load room details and go to `:id`
6. `lastChannelId` and `:id` are not set
   - show `<EmptyRoom />` component
7. get messages and reactions
