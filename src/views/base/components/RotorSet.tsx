import React from 'react';
import { connect } from 'react-redux';
import { EnigmaMachineState } from '../../../stores/Stores';
import { Constants } from '../../../utils/Constants';
import { ConfiguredRotor } from './Rotor';

/**
 * The properties passed to the rotor set for initialization
 */
export interface IRotorSetProps  {
    /**
     * Should be 3 out of 5 pre wired rotors
     */
    selectedRotors?: Array<boolean>
}

/**
 * Retrieve the props from the application state.
 * @param state
 */
const mapStateToEnigmaRotorSetProps = (state: EnigmaMachineState = Constants.DEFAULT_STORE_STATE.rootState): IRotorSetProps => {
    return {
        selectedRotors: state.selectedRotors
    };
}

/**
 *  The view that represents the set of rotors. 
 */
const RotorSet = ({selectedRotors}: IRotorSetProps) => {
    let counter = 0;
    return (
    <div>
    {
        Constants.INTERNAL_WIRINGS.map((wiring, index) => {
                var selected = selectedRotors![index];
                return (<ConfiguredRotor 
                    selected = {selected}
                    rotorIndex = {(selected) ? counter++ : -1}></ConfiguredRotor>);
        })
    }
    </div>);
}

export const ConfiguredRotorSet = connect(mapStateToEnigmaRotorSetProps, null)(RotorSet);