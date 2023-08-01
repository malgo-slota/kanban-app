import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import data from "../data.json";

type BoardsProviderProps = {
    children: ReactNode,
}

type Subtask = {
    title: string,
    isCompleted: boolean,
}

type Task = {
    title: string,
    description: string,
    status: string,
    subtasks: Subtask[],
}

type Column = {
    name: string,
    tasks: Task[];

}

type Board = {
    name: string,
    columns: Column[];
}

type BoardsContext = {
   boards: Board[],
   activeBoard: Board,
   setActiveBoard: (activeBoard: Board) => void,
   sidebarOpen: boolean,
   setSidebarOpen: (sidebarOpen: boolean) => void,
   closeSidebar: () => void,
}

const BoardsContext = createContext({} as BoardsContext);
export function useBoards() {
    return useContext(BoardsContext);
}
//custom hook

export function BoardsProvider({children} : BoardsProviderProps) {
  
    const [boards, setBoards] = useState(data.boards);
    const [activeBoard, setActiveBoard] = useState(data.boards[0]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebar = () => {
        setSidebarOpen(false)
    }

    return (
    <BoardsContext.Provider value={{
                                            boards,
                                            activeBoard,
                                            setActiveBoard,
                                            sidebarOpen,
                                            setSidebarOpen,
                                            closeSidebar
                                            }}>
        {children}
    </BoardsContext.Provider>
    );

}