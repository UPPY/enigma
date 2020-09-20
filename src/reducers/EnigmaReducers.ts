import { RotorStoreState, EnigmaMachineState } from "../stores/Stores";
import { CalculateEnigmaState } from "../actions/Actions";
import { Constants, ReflectorConfig } from "../utils/Constants";

/**
 * REDUCER ACTION - The reducer for the overall enigma machine.
 * This calculates the output value based on the input key.
 * 
 * It also transitions the rotors appropriately once the output is calculated
 * 
 * @param state 
 * @param action 
 */
export const calculateEnigmaMachineState = (
        enigmaState: EnigmaMachineState = Constants.DEFAULT_STORE_STATE.rootState, 
        action: CalculateEnigmaState
    ):  EnigmaMachineState => {
    switch(action.type) {
        case 'CALCULATE_ENIGMA_STATE':  
            let { rotorConfig, reflectorConfig } = enigmaState;
            enigmaState.output = getOutputValue(rotorConfig, reflectorConfig, action.payload.input!);
            enigmaState.cumulativeOutput += enigmaState.output;
            let newRotorConfig = calculateEnigmaRotorSetState(enigmaState.rotorConfig);
            return {
                ...enigmaState, rotorConfig: newRotorConfig
            };
        case 'SET_INITIAL_ROTOR_POSITIONS':
            let currentState = getInitialState(rotorConfig, action.payload.positions!);
            return {
                ...enigmaState, rotorConfig: currentState
            };
        case 'TURN_ROTOR_AT_GIVEN_POSITION':
            let rotors = enigmaState.rotorConfig.map((rotor, index) => {
                if (index !== action.payload.rotorIndex!) {
                    return {...rotor};
                } else {
                    return {...rotor, 
                        initialPostion: transitionRotorByOneWithoutCarry(rotor, action.payload.direction!)};
                }
            });
            return {
                ...enigmaState, rotorConfig: [...rotors]
            }; 
        case 'START_ENIGMA_ENCRYPTION':
             return {
                    ...enigmaState,
                    encryptionInProgress: true
                };   
        case 'RESET_ENIGMA_ENCRYPTION':
            let initialRotorConfig = resetState(enigmaState.rotorConfig);
            return {
                    ...enigmaState,
                    rotorConfig: initialRotorConfig,
                    cumulativeOutput: '',
                    output: '',
                    encryptionInProgress: false
                };
        case 'UNDO_LAST_KEY_STROKE':
            let transitionedRotors = transitionRotorSetByOneWithCarry(enigmaState.rotorConfig, -1);
            let message = enigmaState.cumulativeOutput;
            message = message.slice(0, message.length -1);
            return {
                ...enigmaState,
                output: '',
                cumulativeOutput: message,
                rotorConfig: transitionedRotors,
            }                             
        default:
            return enigmaState;
    }
}

/**
 * 
 * @param rotor Move the rotor by one step in clockwise or anti clockwise direction
 */
const transitionRotorByOneWithoutCarry = (rotor: RotorStoreState, direction: 1 | -1) => {
    let initialPositionIndex = Constants.ALPHABETS.indexOf(rotor.initialPostion);
    initialPositionIndex = (initialPositionIndex === 0) ? 26: initialPositionIndex;
    const newInitialPosition = Constants.ALPHABETS[(initialPositionIndex + direction!) % 26];
    return newInitialPosition;
}

/**
 * @param state
 * @param action 
 */
const calculateEnigmaRotorSetState = (state: RotorStoreState[]) => {
    let rotatedState = transitionRotorSetByOneWithCarry(state, 1);
    return rotatedState;  
}

/**
 * Get the initial state of the rotors
 * @param rotors
 */
const getInitialState = (rotors: RotorStoreState[], positions: string[]) => {
    if (rotors.length !== positions.length) return rotors;
    for(let i = rotors.length - 1; i >= 0; i--) {
      rotors[i] = { ...rotors[i], offset: 0, initialPostion: positions[i]}
    }
    return rotors;
}

/**
 * Get the initial state of the rotors for reset
 * @param rotors
 */
const resetState = (rotors: RotorStoreState[]) => {
    for(let i = rotors.length - 1; i >= 0; i--) {
      rotors[i] = { ...rotors[i], offset: 0}
    }
    return rotors;
}

/**
 * Get the output value from the enigma
 * @param rotors 
 * @param reflectorConfig 
 * @param input 
 */
const transitionRotorSetByOneWithCarry = (rotors: RotorStoreState[], direction: 1 | -1) => {
    let carry = true;
    for(let i = rotors.length - 1; i >= 0; i--) {
        if (carry) {
            rotors[i] = calculateEnigmaRotorState(rotors[i], direction);
            let currentRotorIndex = Constants.REVERSE_MAPPING[rotors[i].initialPostion] +  rotors[i].offset;
            carry = currentRotorIndex === 26;
        }
    }
    return rotors;
}
/**
 * @param state 
 * @param action 
 */
const calculateEnigmaRotorState = (state: RotorStoreState, direction: 1 | -1) => {
    let newOffset = (state.offset + direction) % 26;
    newOffset = (newOffset < 0) ? (26 + newOffset) : newOffset;
    return {...state, offset: newOffset};
}
/**
 * Get the output value from the enigma
 * 
 * @param rotors 
 * @param reflectorConfig 
 * @param input 
 */
const getOutputValue = (rotors: RotorStoreState[], reflectorConfig: ReflectorConfig, input: string) => {
    let inputIndex = Constants.REVERSE_MAPPING[input];
    let out = '';
    for(let i = rotors.length - 1; i >= 0; i--) {
        const rotorConfig = rotors[i].rotorConfig;
        let totalOffset = Constants.REVERSE_MAPPING[rotors[i].initialPostion] + rotors[i].offset;
        inputIndex = (inputIndex + totalOffset) % 26;
        out = rotorConfig[inputIndex];
        inputIndex = (Constants.REVERSE_MAPPING[out] - totalOffset);
        inputIndex = (inputIndex < 0) ? 26 + inputIndex : inputIndex;
    }
    out = reflectorConfig[Constants.ALPHABETS[inputIndex]];
    inputIndex = Constants.REVERSE_MAPPING[out];
    // Now calculate the output using a reverse circuit 
    // Use the same variable
    for(let i = 0; i < rotors.length; i++) {
        const rotorConfig = rotors[i].rotorConfig;
        let totalOffset = Constants.REVERSE_MAPPING[rotors[i].initialPostion] + rotors[i].offset;
        inputIndex = (inputIndex + totalOffset) % 26;
        out = Constants.ALPHABETS[inputIndex];
        out = getReversedValue(rotorConfig, out);
        inputIndex = Constants.REVERSE_MAPPING[out] - totalOffset;
        inputIndex = (inputIndex < 0) ? 26 + inputIndex : inputIndex;
    }
    return Constants.ALPHABETS[inputIndex];
}

/**
 * Get the reversed value
 * @param rotorConfig
 * @param out 
 * @param string 
 */
const getReversedValue = (rotorConfig: string[], out: string) => {
    let map: ReflectorConfig = {};
    rotorConfig.forEach((item, index) => {
        map[item] = Constants.ALPHABETS[index]
    });
    return map[out];
}


