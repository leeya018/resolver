import * as types from "./types";

// INITIALIZES CLOCK ON SERVER
// export const serverRenderClock = () => (dispatch) =>
//   dispatch({
//     type: types.TICK,
//     payload: { light: false, ts: Date.now() },
//   })

// INITIALIZES CLOCK ON CLIENT
export const startClock = () => (dispatch) =>
  setInterval(() => {
    dispatch({ type: types.TICK, payload: { light: true, ts: Date.now() } });
  }, 1000);

// INCREMENT COUNTER BY 1
export const incrementCount = () => ({ type: types.INCREMENT });

// DECREMENT COUNTER BY 1
export const decrementCount = () => ({ type: types.DECREMENT });

// RESET COUNTER
export const resetCount = (number) => ({
  type: types.RESET,
  payload: { number },
});

export const addTodo = (todo) => ({
  type: types.ADD_TODO,

  payload: {
    id: Date.now(),
    name: todo.name,
    solutions: todo.solutions,
    done: false,
  },
});

export const toggle = (id) => ({ type: types.TOGGLE_TODO, payload: { id } });
export const remove = (id) => ({ type: types.REMOVE_TODO, payload: { id } });

export const counterError = (text) => ({
  type: types.COUNTER_ERROR,
  payload: { text },
});

export const todosError = (text) => ({
  type: types.TODOS_ERROR,
  payload: { text },
});

export const updateChosen = (data) => ({
  type: types.UPDATE_CHOSEN,
  payload: data,
});

export const initData = (data) => ({
  type: types.INIT_DATA,
  payload: data,
});

export const updateTodo = (data) => ({
  type: types.UPDATE_TODO,
  payload: data,
});
