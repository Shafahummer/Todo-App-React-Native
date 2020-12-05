import React from 'react';
import MainContainer from './src/screens/MainContainer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './src/reducers/reducer'


const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  )
}
export default App;