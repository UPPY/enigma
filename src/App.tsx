import React from 'react';
import './App.css';
import { EnigmaMachine } from './views/base/EnigmaMachine';
import { GenericFooter } from './views/common/GenericFooter';
import { GenericHeader } from './views/common/GenericHeader';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { calculateEnigmaMachineState } from './reducers/EnigmaReducers';
import { Constants } from './utils/Constants';

function App() {
  return (
    <div className="enigma-app">
      <div className="enigma-app-header">
        <GenericHeader title = 'Enigma Simulator'></GenericHeader>
      </div>
      <div className="enigma-machine">
        <Provider store = { createStore(calculateEnigmaMachineState, Constants.DEFAULT_STORE_STATE.rootState)} >
          <EnigmaMachine/>
        </Provider>
      </div>
      <div className="enigma-app-footer">
        <GenericFooter hasCopyRight = {true}></GenericFooter>
      </div>
    </div>
  );
}

export default App;
