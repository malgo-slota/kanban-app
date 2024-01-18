import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

const boardsSlice = createSlice ({
    name: "boards",
    initialState: data.boards,
    reducers: {
        addBoard: (state, action) => {
            const payload = action.payload;
            const board = {
                name: payload.name,
                columns: [],
            };
            board.columns = payload.boardColumns;
            board.name = payload.boardName;
            state.push(board);
        }
    }
})

export const { addBoard } = boardsSlice.actions;
export default boardsSlice;