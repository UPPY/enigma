import React, {useState, useEffect, useCallback} from 'react';
import './Rotor.css';
import { Constants } from '../../../utils/Constants';

/*
    The properties of the rotor
*/
export interface IRotorProps {
    /**
     * The prewired internal configuration for the rotor
     */
    internalWiring: Array<string>

    /**
     * The initial aplhabet setting for this rotor
     */
    initialAlphabet: string;

    selected: boolean
}

/**
 * The current state of the rotor based on initial state and rotations
 */
export interface IRotorState {
    /**
     * The active key in display
     */
    currentAplhabet: string;
}

/*
    The functional component representing the Rotor used in the enigma machine
*/
export const Rotor: React.FC<IRotorProps> = (props: IRotorProps) => {

    /**
     * Set the alphabet in the state
     */
    const [currentAlphabet, setCurrentAlphabet] = useState(props.initialAlphabet);

    /**
     * Handle the rotate of a rotor
     */
    const handleRotate = useCallback((direction) => {
        setCurrentAlphabet((prevAplhabet) => { 
            let index = Constants.ALPHABETS.indexOf(prevAplhabet);
            if (direction === -1 && index == 0) {
                return 'Z';
            }
            return Constants.ALPHABETS[(index + direction) % 26];
        });
    }, [currentAlphabet]);

    let cssStyleWheel = (props.selected) ? "rotor-active-display" : "rotor-inactive-display";
    let cssStyleNav = (!props.selected) ? "rotor-no-nav-cursor" : "";
    return <div className = "rotor-wheel">
        {
            <div className = "rotor-wheel">
                <div className = { `rotor-nav-display ${cssStyleNav}`} onClick = { 
                    () => { handleRotate(1) }
                }> 
                    <div className = "rotor-digit">&#8593;</div>
                </div> 
                <div className = {`rotor-display ${cssStyleWheel}`}> 
                    <div className = "rotor-digit">
                        {currentAlphabet} 
                    </div>
                </div> 
                <div className = { `rotor-nav-display ${cssStyleNav}`} onClick = {
                    () => { handleRotate(-1) }
                }> 
                    <div className = "rotor-digit">&#8595;</div>
                </div> 
            </div>
        }
    </div>;
}