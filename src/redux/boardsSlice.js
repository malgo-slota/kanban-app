import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

const boardsSlice = createSlice ({
    name: "boards",
    initialState: data.boards,
    reducers: {
        addBoard: (state, action) => {
            const isActive = state.length > 0 ? false : true;
            const payload = action.payload;
            const board = {
                name: payload.name,
                isActive,
                columns: [],
            };
            board.columns = payload.boardColumns;
            board.name = payload.boardName;
            state.push(board);
        },
        setBoardActive: (state, action) => {
            state.map((board, index) => {
                index === action.payload.index
                ? (board.isActive = true)
                : (board.isActive = false);
                return board;
            });
        },
        addNewTask: (state, action) => {
            const title = action.payload.title;
            const description = action.payload.description;
            const status = action.payload.status;
            const subtasks = action.payload.subtasks;
            const newColIndex = action.payload.newColIndex;
            const task = {title, description, status, subtasks};
            const board = state.find((board) => board.isActive);
            const column = board.columns.find((col, index) => index === newColIndex);
            column.tasks.push(task);
        },
        editTask: (state, action) => {
            const title = action.payload.title;
            const description = action.payload.description;
            const status = action.payload.status;
            const subtasks = action.payload.subtasks;
            const colIndex = action.payload.colIndex;
            const taskIndex = action.payload.taskIndex;
            const board = state.find((board) => board.isActive);
            const column = board.columns[colIndex];
            const task = column.tasks[taskIndex];
            task.title = title;
            task.description = description;
            task.status = status;
            task.subtasks = subtasks;            
        },
        setSubtaskIsCompleted: (state, action) => {
            const colIndex = action.payload.colIndex;
            const taskIndex = action.payload.taskIndex;
            const board = state.find((board) => board.isActive);
            const column = board.columns[colIndex];
            const task = column.tasks[taskIndex];
            const subtask = task.subtasks.find((subtask, i) => i === action.payload.subtaskIndex);
            subtask.isCompleted = !subtask.isCompleted;
        },
        setNewTaskStatus: (state, action) => {
            const newColIndex = action.payload.newColIndex;
            const colIndex = action.payload.colIndex;
            const taskIndex = action.payload.taskIndex;
            const board = state.find((board) => board.isActive);
            const columns = board.columns;
            const column = columns.find((col, i) => i === colIndex);
            const task = column.tasks.find((task, i) => i === taskIndex);
            if (colIndex === newColIndex) return;
            task.status = action.payload.status;
            column.tasks = column.tasks.filter((task, i) => i !== taskIndex);
            const newCol = columns.find((col, i) => i === newColIndex);
            newCol.tasks.push(task);
        },
        editBoard: (state, action) => {
            const board = state.find((board) => board.isActive);
            board.name = action.payload.newBoardName;
            board.columns = action.payload.updatedColumns;
        },
        deleteBoard: (state) => {
            const board = state.find((board) => board.isActive);
            state.splice(state.indexOf(board), 1);
        },
        deleteTask: (state, action) => {
            const payload = action.payload;
            const board = state.find((board) => board.isActive);
            const col = board.columns.find((col, i) => i === payload.colIndex);
            col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
        },
    }
})

export const { addBoard } = boardsSlice.actions;
export default boardsSlice;