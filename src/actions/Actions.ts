/**
 * Action to calculate the enigma state
 */
export interface CalculateEnigmaState {
    type: string,
    payload: IPayload;
}

/**
 * The payload for the action
 */
export interface IPayload {
    /**
     * The positions of the rotor
     */
    positions?: string[]
    /**
     * The input key pressd
     */
    input?: string;
    /**
     * The index of the rotor to be manipulated
     */
    rotorIndex?: number;
    /**
     * The direction cloclwise/anticlockwise to turn the rotor
     */
    direction?: 1 | -1;
}