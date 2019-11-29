// ACTION'LARIMIZ
// NgRx action'ları hakkında daha fazla bilgi için:
// https://ngrx.io/guide/store/actions

import { createAction, props } from '@ngrx/store';

//  ---calculator action'ları --- //
// tetiklenen bazı action'lar tetikleyen koddan props parametresi ile payload alır
// bu action 1-9 arası rakamlara ve +-*/ gibi operatörlere tıklandığında çalışır
export const AppendOperandAction = createAction('[Calc] - Append Operand', props<{ payload: any }>());
// eşittir butonu event listener'ı tarafından tetiklenir
export const ResultAction = createAction( '[Calc] - Result', props<{ payload: any }>() );
// temizle butonu event listener'ı tarafından tetiklenir
export const ClearAction = createAction('[Calc] - Clear');
// ResultAction tarafından tetiklenir (side effect)
export const SaveAndClearAction = createAction('[Calc] - Save and Clear', props<{ payload: any }>());
// AppendOperandAction tarafından tetiklenir (side effect)
export const SaveAction = createAction('[Calc] - Save', props<{ payload: any }>());
// ClearAction tarafından tetiklenir (side effect)
export const ClearAfterResultAction = createAction('[Calc] - Clear After Result');

// --- calculator action'ları --- //