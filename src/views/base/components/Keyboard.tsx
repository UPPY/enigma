import * as React from 'react';
import { Constants}  from '../../../utils/Constants';
import './Keyboard.css';
/*
    The properties of the keyboard
*/
export interface IKeyboardProps {
    // Specifies if the board needs to operate as an input or output (LED blink simulation)
    mode: 'input' | 'output';
}

/*
    The functional component representing the Keyboard used in the enigma machine.
    For now it lays it in format [9, 8, 9].
    @Todo Support flexible layout
*/
export const Keyboard: React.FC<IKeyboardProps> = (props: IKeyboardProps) => {
    let alphaBetStyle = props.mode ;
    const layout = [9, 8, 9];
    return <div className = 'enigma-keyboard'>
        {
            getKeyBoardContent(layout, alphaBetStyle)
        }
    </div>
}

/**
 * 
 * @param layout Gives the keyboard based on validations
 * @param alphaBetStyle 
 */
const getKeyBoardContent = (layout: Array<number> = [9, 8, 9], alphaBetStyle: string): JSX.Element => {
    let counter = 0;
    let alphabets = Constants.ALPHABETS;
    return <div className = {(alphaBetStyle === 'input' ? 'input-texture': 'display-texture')}>
        {
            layout.map((columns, cIndex) => {
                let keys = Array(columns).fill(0).map((_, index) => {
                    counter = counter++;
                    let ret = (alphaBetStyle === 'input') ? 
                    <a className = 'enigma-key typewriter-key'> {alphabets[counter++]} </a>
                    : <div className = "enigma-key gloweffect-key">{alphabets[counter++]} </div>
                    return ret;
                });
                keys.push(<br></br>);
                return keys;
            })
        }
    </div>;
};