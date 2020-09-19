import React from 'react';
import './Rotor.css';
import { Constants } from '../../../utils/Constants';
import { EnigmaMachineState } from '../../../stores/Stores';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

/*
    The properties of the rotor
*/
export interface IRotorOwnProps {
    /**
     * The index of the rotor
     */
    rotorIndex: number;
    /**
     * Is the rotor selected
     */
    selected: boolean;
}

/**
 * The state props for the rotor
 */
export interface IRotorStateProps {
    /**
     * The current alphabet
     */
    currentAlphabet: string;
}

/**
 * The state props for the rotor
 */
export interface IRotorDispatchProps {
    /**
     * Handle the rotate of the rotor
     */
    onRotate?: (index: number, direction: 1 | -1) => void
}

type IRotorProps = IRotorOwnProps & IRotorStateProps & IRotorDispatchProps;

/**
 * Map the state to rotor props
 * @param state 
 * @param ownProps 
 */
const mapStateToRotorProps = (state: EnigmaMachineState, ownProps: IRotorOwnProps) => {
    if (ownProps.selected) {
        let rotor = state.rotorConfig[ownProps.rotorIndex!];
        let index = (Constants.REVERSE_MAPPING[rotor.initialPostion] + rotor.offset) % 26;
        return {
            currentAlphabet: Constants.ALPHABETS[index]
        };
    } else {
        return {
            currentAlphabet: '$'
        }
    }
}

/**
 * Map the dispatch action to rotate reducer
 * @param dispatch 
 */
const mapDispatchToRotorProps= (dispatch: Dispatch,  ownProps: IRotorOwnProps) => {
    return {
        onRotate: (index: number, direction: 1 | -1) => {
            if (ownProps.selected) {
                dispatch({
                    type: 'TURN_ROTOR_AT_GIVEN_POSITION',
                    payload : {
                        rotorIndex: index,
                        direction: direction
                    }
                })
            }
        }
    };
}


/*
    The functional component representing the Rotor used in the enigma machine
*/
export const Rotor = (props: IRotorProps) => {

    let cssStyleWheel = (props.selected) ? "rotor-active-display" : "rotor-inactive-display";
    let cssStyleNav = (!props.selected) ? "rotor-no-nav-cursor" : "";
    return <div className = "rotor-wheel">
        {
            <div className = "rotor-wheel">
                <div className = { `rotor-nav-display ${cssStyleNav}`} onClick = { 
                    () => { props.onRotate!(props.rotorIndex, 1) }
                }> 
                    <div className = "rotor-digit">&#8593;</div>
                </div> 
                <div className = {`rotor-display ${cssStyleWheel}`}> 
                    <div className = "rotor-digit">
                        {props.currentAlphabet} 
                    </div>
                </div> 
                <div className = { `rotor-nav-display ${cssStyleNav}`} onClick = {
                    () => { props.onRotate!(props.rotorIndex, -1) }
                }> 
                    <div className = "rotor-digit">&#8595;</div>
                </div> 
            </div>
        }
    </div>;
}

/**
 * The configured rotor component
 */
export const ConfiguredRotor = connect(mapStateToRotorProps, mapDispatchToRotorProps)(Rotor);