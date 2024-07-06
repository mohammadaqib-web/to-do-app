import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: []
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        add_task: (state, action) => {
            state.tasks.push({ name: action.payload.name, isCompleted: false });
        },
        remove_task: (state, action) => {
            state.tasks = state.tasks.filter((task, index) => index !== action.payload.index);
        },
        edit_task: (state, action) => {
            const task = state.tasks[action.payload.index];
            if (task) {
                task.name = action.payload.name;
            }
        },
        toggleTaskCompletion: (state, action) => {
            const { index, isCompleted } = action.payload;
            state.tasks[index].isCompleted = isCompleted;
          }
    }
});

export const { add_task, remove_task, edit_task, toggleTaskCompletion } = todoSlice.actions;
export default todoSlice.reducer;
