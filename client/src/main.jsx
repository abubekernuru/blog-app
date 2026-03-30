import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'flowbite'
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <PersistGate loading={null} persistor={persistor}>
  <Provider store={store}>
    <App />
  </Provider>
  </PersistGate>
)
