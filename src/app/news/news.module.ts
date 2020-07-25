import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { NewsComponent } from './news.component';
import { NewsRoutingModule } from './news-routing.module';

@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    NativeScriptCommonModule,
    NewsRoutingModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class NewsModule { }
