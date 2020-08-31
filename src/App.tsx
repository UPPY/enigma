import React from 'react';
import logo from './logo.svg';
import './App.css';
import { EnigmaMachine } from './views/base/EnigmaMachine';
import { GenericFooter } from './views/common/GenericFooter';
import { GenericHeader } from './views/common/GenericHeader';

function App() {
  return (
    <div className="enigma-app">
      <div className="enigma-app-header">
        <GenericHeader title = 'Enigma Simulator' subtitle = 'A reference implementation'></GenericHeader>
      </div>
      <div className="enigma-machine">
        <EnigmaMachine selectedRotors = {[true, true, false, false, true]} initialConfiguration = "JLY"></EnigmaMachine>
      </div>
      <div className="enigma-app-footer">
        <GenericFooter hasCopyRight = {true}></GenericFooter>
      </div>
    </div>
  );
}

export default App;
