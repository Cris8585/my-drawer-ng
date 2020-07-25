import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    NativeScriptCommonModule,
    ProductsRoutingModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ProductsModule { }
