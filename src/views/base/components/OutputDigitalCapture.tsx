import React from 'react';
import { EnigmaMachineState } from './../../../stores/Stores'
import { connect } from 'react-redux';
import './OutputDigitalCapture.css';

/**
 * The interface for the 
 */
export interface IOutputDigitalCaptureProps {
    output: string;
}

/**
 * Map the application state to input keyboard
 * @param state 
 */
const mapStateToCumulativeDigitalCaptureProps = (state:EnigmaMachineState): IOutputDigitalCaptureProps => {
    return {
        output: state.cumulativeOutput
    };
};

/**
 * The component corresponding to the digital capture
 * @param props
 */
export const OutputDigitalCapture = (props: IOutputDigitalCaptureProps) => {
    
    return (<div className = 'enigma-message-display'>
        {props.output}
    </div>);
}

export const CumulativeOutputDigitalCapture = connect(mapStateToCumulativeDigitalCaptureProps)(OutputDigitalCapture); 