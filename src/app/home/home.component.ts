import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform"
import { Noticia } from "../models/noticia.model";
import { Store } from "@ngrx/store";
import { AppState } from "../app.module";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    android: string;
    leyendo: Array<Noticia> = [];

    constructor(
        private store: Store<AppState>
    ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        if (isAndroid) {
            this.android = "Android exclusive";
        }

        this.store.select((state) => state.noticias.noticiasLeyendo)
            .subscribe((data) => {
                const ns = data;
                console.log("HOME - ns");
                console.log(ns);
                if (ns != null) {
                    ns.map((n) => this.leyendo.push(n));
                    console.log("HOME - leyendo");
                    console.log(this.leyendo);
                }
            })
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
