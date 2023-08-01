import { Home } from './pages/Home';
import { BoardsProvider } from './context/BoardsContext';



function App() {

  


  return (
    <>
      <BoardsProvider>
        <Home />
      </BoardsProvider>    
    </>
  );
}

export default App;
