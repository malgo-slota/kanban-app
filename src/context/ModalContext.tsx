import { createContext, useContext, ReactNode, useState } from "react";

type ModalProviderProps = {
    children: ReactNode,
}

type ModalContext = {
   sidebarOpen: boolean,
   setSidebarOpen: (sidebarOpen: boolean) => void,
   closeSidebar: () => void,
   addTaskModalOpen: boolean,
   setAddTaskModalOpen: (addTaskModalOpen: boolean) => void,
}

const ModalContext = createContext({} as ModalContext);
export function useModal() {
    return useContext(ModalContext);
}
//custom hook

export function ModalProvider({children} : ModalProviderProps) {
  
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [addTaskModalOpen ,setAddTaskModalOpen] = useState(false);

    const closeSidebar = () => {
        setSidebarOpen(false)
    }

    return (
    <ModalContext.Provider value={{
                                    sidebarOpen,
                                    setSidebarOpen,
                                    closeSidebar,
                                    addTaskModalOpen,
                                    setAddTaskModalOpen,
                                    }}>
        {children}
    </ModalContext.Provider>
    );

}