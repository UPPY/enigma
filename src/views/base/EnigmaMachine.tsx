import React from 'react';
import { Keyboard, IKeyboardProps } from './components/Keyboard';
import { ConfiguredRotorSet } from './components/RotorSet';
import { EnigmaCommands, ConfiguredEnigmaCommands } from './components/EngimaCommands';
import { EnigmaMachineState } from '../../stores/Stores';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CumulativeOutputDigitalCapture } from './components/OutputDigitalCapture'
import './EnigmaMachine.css';

/**
 * Map the application state to keyboard input
 * @param state
 */
const mapStateToInputKeyboardProps = (state:EnigmaMachineState): IKeyboardProps => {
    return {
        mode: 'input',
        enabled: state.encryptionInProgress
    };
};

/**
 * Map the application state to input keyboard
 * @param state
 */
const mapStateToOutputKeyboardProps = (state:EnigmaMachineState): IKeyboardProps => {
    return {
        mode: 'output',
        enabled: state.encryptionInProgress,
        highlight: state.output,
    };
};

/**
 * Map the application state to display board
 * @param dispatch
 */
const mapDispatchToInputKeyboardProps = (dispatch: Dispatch)  => {
    return {
        transitionEnigmaMachine: (key: string) => {
            dispatch({
                type: 'CALCULATE_ENIGMA_STATE',
                payload: {
                    input: key
                }
            });
        }
    };
};
/**
 * Input board
 */
const InputKeyBoard = connect(mapStateToInputKeyboardProps, mapDispatchToInputKeyboardProps)(Keyboard);
/**
 * Output board
 */
const DisplayBoard = connect(mapStateToOutputKeyboardProps)(Keyboard);

/**
 * The functional component representing the Overall UI for the enigma machine
 */
export const EnigmaMachine = () => {
    /**
     * Create the UI for the enigma machine
     */
    return (<div className = "enigma-machine-root">
            <div className = 'enigma-digital-display'>
                <CumulativeOutputDigitalCapture/>
            </div>
            <div className = 'enigma-io-display'>
                <DisplayBoard/>
             </div>
            <div className = 'enigma-io-keyboard'>
                <InputKeyBoard/>
                <ConfiguredEnigmaCommands/>
            </div>
            <div className = 'enigma-rotor-set'>
                <ConfiguredRotorSet/>
             </div>
        </div>);
};


