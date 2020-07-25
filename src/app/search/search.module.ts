import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SearchRoutingModule } from "./search-routing.module";
import { SearchComponent } from "./search.component";
import { DetalleComponent } from "../detalle/detalle.component";
import { SearchFormComponent } from './search-form.component';
import { MinLenDirective } from "../minlen.validator";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SearchRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        SearchComponent,
        DetalleComponent,
        SearchFormComponent,
        MinLenDirective
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchModule { }
