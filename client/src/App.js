import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './components/app/store'; 
import AppRoute from './AppRoute'; 

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppRoute />
      </Provider>
    </div>
  );
}

export default App;