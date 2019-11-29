import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalcComponent } from './calc/calc.component';
import { StoreModule } from '@ngrx/store';
import { CalcReducer } from './calc/calc.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CalcEffects } from './calc/calc.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    CalcComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot( {data: CalcReducer} ), // store'u tanımla
    EffectsModule.forRoot([CalcEffects]), // effects'i tanımla
    StoreDevtoolsModule.instrument(), // devTools'u tanımla
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
