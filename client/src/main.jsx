import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'flowbite'
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ThemeProvider } from './components/ThemeProvider.jsx';

let persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <PersistGate loading={null} persistor={persistor}>
  <Provider store={store}>
    <ThemeProvider
    <App />
    <ThemeProvider
  </Provider>
  </PersistGate>
)
