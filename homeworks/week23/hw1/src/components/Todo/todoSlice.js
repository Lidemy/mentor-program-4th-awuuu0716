import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todosData: [],
    filter: 'all',
  },
  reducers: {
    addTodo: (state, action) => {
      const { content, id } = action.payload;
      state.todosData.push({
        content,
        isDone: false,
        id,
      });
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      state.todosData = state.todosData.filter((todo) => todo.id !== id);
    },
    clearTodo: (state) => {
      state.todosData = [];
    },
    toggleIsDone: (state, action) => {
      const id = action.payload;
      state.todosData = state.todosData.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      });
    },
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
    addTodosFromLocalStorage: (state, action) =>{
      state.todosData = action.payload;
    }
  },
});

export const {
  addTodo,
  deleteTodo,
  clearTodo,
  toggleIsDone,
  changeFilter,
  addTodosFromLocalStorage,
} = todoSlice.actions;

export const selectTodos = (state) => state.todos.todosData;
export const selectFilter = (state) => state.todos.filter;

export default todoSlice.reducer;
