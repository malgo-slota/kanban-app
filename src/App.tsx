import { Home } from './pages/Home';
import { BoardsProvider } from './context/BoardsContext';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <>
    <Provider store={store}>
       <BoardsProvider>
        <Home />
      </BoardsProvider>
    </Provider>
    </>
  );
}

export default App;
