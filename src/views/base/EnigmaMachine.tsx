import * as React from 'react';
import { Keyboard } from './components/Keyboard';
import { Rotor } from './components/Rotor';
import './EnigmaMachine.css';
import { Constants } from '../../utils/Constants';

/*-
 The properties passed to the enigma machine initialization
*/
export interface IEnigmaMachineProps  {
    // Should be 3 out of 5 pre wired rotors
    selectedRotors: Array<boolean>
    // The initial configuration of the 3 selected rotors
    initialConfiguration: string

}

/**
 * The functional component representing the Overall UI for the enigma machine
 */
export const EnigmaMachine: React.FC<IEnigmaMachineProps> = (props: IEnigmaMachineProps) => {
    let rotorPositions = props.initialConfiguration.split("");
    let counter = 0;
    return <div className = "enigma-machine-root">
        <div className = 'enigma-io'>
            <Keyboard mode = 'output'></Keyboard>
            <p></p>
            <Keyboard mode = 'input'></Keyboard>
        </div>
        <div className = 'enigma-rotor-array'>
        {
            Constants.INTERNAL_WIRINGS.map((wiring, index) => {
                    var selected = props.selectedRotors[index];
                    return (<Rotor internalWiring = {wiring} 
                        initialAlphabet = {(selected) ? rotorPositions[counter++] : '-1'}
                        selected = {selected}></Rotor>);
            })
        }
        </div>
    </div>;
};