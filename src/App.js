import { Home } from './pages/Home';
import { ModalProvider } from './context/ModalContext';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {

  return (
    <>
    <Provider store={store}>
       <ModalProvider>
        <Home />
      </ModalProvider>
    </Provider>
    </>
  );
}

export default App;
