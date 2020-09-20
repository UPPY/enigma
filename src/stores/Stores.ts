import { ReflectorConfig } from "../utils/Constants";

/**
 * The configuration for the rotor
 */
export interface RotorStoreState {
    /**
     * The internal wwirings for the rotor
     */
    rotorConfig: string[];
    /**
     * The initial state of the rotor
     */
    initialPostion: string;

    /**
     * The current offset for the rotor
     */
    offset: number;
  }
  
  /**
   * The current state of the enigma machine
   */
  export interface EnigmaMachineState {
    /**
     * This is immutable for a given enigma machine
     */
    selectedRotors: boolean[];
    /**
     * The configuration for all active rotors in enigma machine
     */
    rotorConfig: RotorStoreState[];
    /**
     * This is immutable for a given enigma machine
     */
    reflectorConfig: ReflectorConfig;
    /**
     * The key to be highlighted in the display board
     */
    output: string;

    /**
     * The consolidated output of the enigma machine
     */
    cumulativeOutput: string;

    /**
     * Set/Get the current encryption state
     */
    encryptionInProgress: boolean;

  }

  /**
   * The root state of enigma machine
   */
  export interface EnigmaRootState {
    /**
     * The state of enigma machine
     */
    rootState: EnigmaMachineState
  }