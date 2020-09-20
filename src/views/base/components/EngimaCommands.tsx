import React from 'react';
import { Dispatch } from 'redux';
import { EnigmaMachineState } from '../../../stores/Stores';
import './Keyboard.css';
import './EnigmaCommands.css';
import { connect } from 'react-redux';

/**
 * The interface for enigma commands
 */
export interface IEnigmaCommandProps {
    /**
     * Is encryption in progress
     */
    inProgress?: boolean;
    /**
     * The captured message hitherto
     */
    message?: string;
    /**
     * Undo the last 
     */
    undoLastKeyStroke?: () => void;
    /**
     * Reset teh enigma to initial state
     */
    resetEnigmaToInitialState?: () => void;
    /**
     * Start the enigma encryption
     */
    startEnigmaEncryption?: () => void;
}

export const mapStateToEnigmaCommandProps = (state: EnigmaMachineState): IEnigmaCommandProps => {
    return {
        inProgress: state.encryptionInProgress,
        message: state.cumulativeOutput
    }
}

export const mapDispatchToEnigmaCommandProps = (dispatch: Dispatch): IEnigmaCommandProps => {
    return {
        undoLastKeyStroke: () => {
            dispatch({
                type: 'UNDO_LAST_KEY_STROKE'
            });
        },
        resetEnigmaToInitialState: () => {
            dispatch({
                type: 'RESET_ENIGMA_ENCRYPTION'
            })
        },
        startEnigmaEncryption: () => {
            console.log("Starting the machine");
            dispatch({
                type: 'START_ENIGMA_ENCRYPTION'
            });
        }
    }
}

/**
 * The list of commands for the enigma machine
 * @param props T
 */
export const EnigmaCommands: React.FC<IEnigmaCommandProps> = (props: IEnigmaCommandProps) => {
    const undoClass = (props.inProgress && props.message!.length > 0) ? 'typewriter-key-enabled': 'typewriter-key-disabled';
    const resetClass = (props.inProgress) ? 'typewriter-key-enabled': 'typewriter-key-disabled';
    const startEncryptionClass = (!props.inProgress) ? 'typewriter-key-enabled': 'typewriter-key-disabled';
    return (<div className = 'enigma-command-controls'>
        <a id = 'enigma-undo-last-operation' className = {`enigma-key ${undoClass}`} 
            onClick = {() => {props.undoLastKeyStroke!()}} href = '#'> &#9003;</a>

        <a id = 'enigma-reset' className = {`enigma-key ${resetClass}`}  
            onClick = {() => { props.resetEnigmaToInitialState!() }} href = '#'> &#9642;</a>

        <a id = 'start-encryption' className = {`enigma-key ${startEncryptionClass}`}  
            onClick = {() => { props.startEnigmaEncryption!() }} href = '#'> &#9658;</a>                
    </div>);
}

export const ConfiguredEnigmaCommands = connect(mapStateToEnigmaCommandProps, mapDispatchToEnigmaCommandProps)(EnigmaCommands);