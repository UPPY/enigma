import React from 'react';
import { Constants}  from '../../../utils/Constants';
import './Keyboard.css';

/**
 * The properties of the keyboard
 */
export interface IKeyboardProps {

    /**
     * Specifies if the board needs to operate as an input or output (LED blink simulation)
     */
    mode: 'input' | 'output';

    /**
     * Specifies the key to be highlighted
     */
    highlight?: string;

    /**
     * Handler for Key pressed event
     */
    transitionEnigmaMachine?: (key: string) => void;
}

/**
 *  The functional component representing the Keyboard used in the enigma machine.
 *  For now it lays it in format [9, 8, 9].
 *  @Todo Support flexible layout
 */
export const Keyboard: React.FC<IKeyboardProps> = ({mode, highlight = '', transitionEnigmaMachine = () => {}}) => {
    const layout = [9, 8, 9];
    return <div className = 'enigma-keyboard'>
        {
            getKeyBoardContent(layout, mode, highlight, transitionEnigmaMachine)
        }
    </div>
}

/**
 * Gives the keyboard based on layout and the mode
 * @param layout 
 * @param alphaBetStyle 
 */
const getKeyBoardContent = (layout: Array<number> = [9, 8, 9], 
    mode: string,
    highlight: string,
    transitionEnigmaMachine: Function): JSX.Element => {
    let counter = 0;
    return <div className = {(mode === 'input' ? 'input-texture': 'display-texture')}>
        {
            layout.map((columns, cIndex) => {
                let keys = Array(columns).fill(0).map((_, index) => {
                    let currentAlphabet = Constants.ALPHABETS[counter++];
                    return (mode === 'input') ? 
                    <a className = 'enigma-key typewriter-key' onClick = {() => {
                        transitionEnigmaMachine(currentAlphabet);
                    }} href = '#'> {currentAlphabet} </a>
                    : <div className = "enigma-key gloweffect-key" 
                        style = {{ border: (currentAlphabet === highlight) ? 'solid 2px #FF0000' : 'solid 2px #1c87c9'}}>{currentAlphabet} </div>
                });
                keys.push(<br></br>);
                return keys;
            })
        }
    </div>;
};