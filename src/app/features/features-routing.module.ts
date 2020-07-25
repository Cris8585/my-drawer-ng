import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { FeaturesComponent } from "./features.component";
import { FuncionalidadComponent } from "./funcionalidad/funcionalidad.component";

const routes: Routes = [
    { path: "", component: FeaturesComponent },
    { path: "funcionalidad", component: FuncionalidadComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class FeaturesRoutingModule { }
