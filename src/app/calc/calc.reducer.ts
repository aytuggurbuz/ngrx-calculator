// REDUCER'IMIZ
// NgRx reducer'ları hakkında daha fazla bilgi için:
// https://ngrx.io/guide/store/reducers

import { Action, createReducer, on } from '@ngrx/store';
import * as CalcActions from './calc.action';
import CalcState, { initializeState } from './calc.state';

// ilk değeri oluştururken state dosyasında tanımladığımız
// initialState değerini kullan
export const initialState = initializeState();

// reducer fonksiyonu
// bu uygulamada sadece side effectleri çalıştırır
const reducer = createReducer(
    initialState,
    // spread operatörü kullanacağız, spread operatörü hakkında daha fazla bilgi için:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    on(CalcActions.SaveAndClearAction, (state: CalcState) => {
        // state'i olduğu gibi al (spread operatörü), state'in içindeki
        // Memory değişkenini eval et (matematiksel değerini al),
        // dönen değeri yeni state'in Memory'si olarak ata
        // tslint:disable-next-line: no-eval
        return { ...state, Memory: eval(state.Memory) };
    }),
    // { payload } syntax'ı ile action ile gelen payload'u okuyoruz
    on(CalcActions.SaveAction, (state: CalcState, { payload }) => {
        // state'i olduğu gibi al, Memory stringine payload'u concatenate et
        return { ...state, Memory: state.Memory + payload };
    }),
    on(CalcActions.ClearAfterResultAction, (state: CalcState) => {
        // Memory'ye boş string ata
        return { ...state, Memory: '' };
    })
);

// uygulamada kullanılacak reducer'ı dışarı aç
export function CalcReducer(state: CalcState | undefined, action: Action) {
    return reducer(state, action);
}
