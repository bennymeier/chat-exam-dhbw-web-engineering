import { combineReducers, applyMiddleware, createStore } from 'redux';
import { authReducer } from './reducers/auth';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { errorReducer } from './reducers/error';

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  // chat: chatReducer,
  // users: usersReducer,
  // currentProject: projectReducer,
  // issueTypes: issueTypeReducer,
  // kanbanTypes: kanbanTypeReducer,
  // priorities: priorityReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(reduxThunk))
  );
  return store;
};
