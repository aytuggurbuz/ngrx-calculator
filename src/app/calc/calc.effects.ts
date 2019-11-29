// EFFECT'LERİMİZ
// NgRx effect'leri hakkında daha fazla bilgi için:
// https://ngrx.io/guide/store/actions

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable  } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import * as CalcActions from './calc.action';

// SIDE EFFECTS
@Injectable()
export class CalcEffects {
    // constructor ile Actions servisini inject et
    constructor(private action$: Actions) { }

    // ofType yardımıyla AppendOperandAction beklemeye başla
    // yakaladığında 1 saniye bekle
    // SaveAction side effectini alakalı data ile tetikle
    AppendOperand$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(CalcActions.AppendOperandAction),
            delay(1000),
            map(action => action.payload),
            map(data => CalcActions.SaveAction({ payload: data }))
        )
    );

    // ofType yardımıyla ResultAction beklemeye başla
    // yakaladığında 1 saniye bkle
    // SaveAndClearAction side effectini tetikle, payload'u gönder
    Result$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(CalcActions.ResultAction),
            delay(1000),
            map(action => action.payload),
            map(data => CalcActions.SaveAndClearAction({ payload: data })),
        )
    );

    // ofType ile ClearAction action'ını beklemeye başla
    // yakaladığında 1 saniye bekle
    // ClearAfterResultAction side effectini çalıştır (payload almayan side effect)
    Clear$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(CalcActions.ClearAction),
            delay(1000),
            map(data => CalcActions.ClearAfterResultAction())
        )
    );
}
