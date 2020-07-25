import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';
import { FuncionalidadComponent } from './funcionalidad/funcionalidad.component';

@NgModule({
  declarations: [
    FeaturesComponent,
    FuncionalidadComponent
  ],
  imports: [
    NativeScriptCommonModule,
    FeaturesRoutingModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class FeaturesModule { }
