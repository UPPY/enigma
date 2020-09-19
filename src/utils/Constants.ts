import { EnigmaRootState } from "../stores/Stores";

/**
 * Constants used in enigma machine
 */
export class Constants {
    /**
     * The list of all alphabets
     */
    public static readonly ALPHABETS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    /**
     * The mapping of alphabets to indices
     */
    public static readonly REVERSE_MAPPING: Mapping  = {
        'A': 0, 'B': 1,'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
        'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 
        'W': 22, 'X': 23, 'Y': 24, 'Z': 25
    };

    /**
     * The internal wirings for the 5 rotors
     */
    public static readonly INTERNAL_WIRINGS = [
        "WHETAJIVPNYSQZLCFKORUDMGBX".split(''),
        "fvpjiaoyedrzxwgctkuqsbnmhl".toUpperCase().split(''),
        "ajdksiruxblhwtmcqgznpyfvoe".toUpperCase().split(''),
        "ekmflgdqvzntowyhxuspaibrcj".toUpperCase().split(''),
        "RIAFVGTHODLZMXQCUKSJNBEYWP".split('')
    ];

    /**
     * The reflector config
     */
    public static readonly REFLECTOR_CONFIG: ReflectorConfig = {
        'A': 'N', 'N': 'A',
        'B': 'J', 'J': 'B',
        'C': 'O', 'O': 'C',
        'D': 'P', 'P': 'D',
        'E': 'R', 'R': 'E',
        'F': 'U', 'U': 'F',
        'G': 'V', 'V': 'G',
        'H': 'Q', 'Q': 'H',
        'I': 'S', 'S': 'I',
        'Z': 'T', 'T': 'Z',
        'K': 'X', 'X': 'K',
        'L': 'Y', 'Y': 'L',
        'M': 'W', 'W': 'M'
    };

    public static DEFAULT_STORE_STATE: EnigmaRootState = {
        rootState: {
            output: '',
            cumulativeOutput: '',
            selectedRotors: [false, true, true, true, false],
            rotorConfig: [{
                initialPostion: "A",
                offset: 0,
                rotorConfig: Constants.INTERNAL_WIRINGS[1]
            }, {
                initialPostion: "A",
                offset: 0,
                rotorConfig: Constants.INTERNAL_WIRINGS[2]
            }, {
                initialPostion: "A",
                offset: 0,
                rotorConfig: Constants.INTERNAL_WIRINGS[3]
            }],
            reflectorConfig: Constants.REFLECTOR_CONFIG
        }
    };
}

export interface Mapping {
    [key: string]: number
}

export type ReflectorConfig = {
    [key: string]:  string
}