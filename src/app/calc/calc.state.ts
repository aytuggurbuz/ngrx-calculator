// State'in yapısı
export default class CalcState {
    Memory: string;
}

// State'in ilk değeri
export const initializeState = () => {
    return { Memory: '' };
};
