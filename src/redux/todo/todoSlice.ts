import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface todoState {
  id: number,
  text: string,
  completed: boolean
}
const initialState: todoState[] = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: todoState = {
        id: Date.now(),
        text: action.payload,
        completed: false
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;