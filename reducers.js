import { combineReducers } from "redux";
import * as types from "./types";

const chosenTodo = (state = null, { type, payload }) => {
  switch (type) {
    case types.UPDATE_CHOSEN:
      // console.log("I just got invorke");
      return payload;
      break;

    default:
      return state;
      break;
  }
};

const initialTodos = [
  {
    name: "get an error . but dont know what to do ",
    solutions: [
      "check where is the error come from ",
      "if you are not sure , click on the error to get lead to the page",
      "check what that menan",
      "what was the last change that cause that ",
      "find soltions online to the problem ",
      "check with Avi ",
      "be confidence in your self , you are finding solutions to something that next time  , will take a sec for you  ",
      "I believe in you , only believe in your self ,",
    ],
  },
  {
    name: "collect",
    solutions: ["hello world", "connect"],
  },
];
// TODO REDUCER
const todoReducer = (state = initialTodos, { type, payload }) => {
  switch (type) {
    case types.INIT_DATA:
      return payload;
      break;
    case types.ADD_TODO:
      return [...state, payload];
      break;
    case types.TOGGLE_TODO:
      return state.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });
      break;
    case types.REMOVE_TODO:
      return state.filter((todo) => todo.id !== payload.id);
      break;

    default:
      return state;
      break;
  }
};

// COUNTER REDUCER
const counterReducer = (state = 0, { type, payload }) => {
  switch (type) {
    case types.INCREMENT:
      return state + 1;
    case types.DECREMENT:
      return state - 1;
    case types.RESET:
      return payload.number;
    default:
      return state;
  }
};

// INITIAL TIMER STATE
const initialTimerState = {
  lastUpdate: 0,
  light: false,
};

// TIMER REDUCER
const timerReducer = (state = initialTimerState, { type, payload }) => {
  switch (type) {
    case types.TICK:
      return {
        lastUpdate: payload.ts,
        light: !payload.light,
      };
    default:
      return state;
  }
};

const initialErrorState = {
  counter: "",
  todos: "",
  clock: "",
};

const errorReducer = (state = initialErrorState, { type, payload }) => {
  console.log({ type });
  switch (type) {
    case types.COUNTER_ERROR:
      return { ...state, counter: payload.text };

      break;
    case types.TODOS_ERROR:
      return { ...state, todos: payload.text };

      break;

    default:
      return state;
      break;
  }
};
// COMBINED REDUCERS
const reducers = {
  counter: counterReducer,
  timer: timerReducer,
  todos: todoReducer,
  error: errorReducer,
  chosen: chosenTodo,
};

export default combineReducers(reducers);
