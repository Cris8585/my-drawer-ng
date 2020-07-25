import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { GestureEventData } from "tns-core-modules/ui/gestures/gestures"
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout"
import { Noticia } from "../models/noticia.model";
import { NoticiasService } from "../domain/noticias.service";
import * as Toast from "nativescript-toast";
import { Store } from "@ngrx/store";
import { AppState } from "../app.module";
import { LeerNoticiaAction } from "../domain/noticias-state.model";

@Component({
    selector: "Featured",
    templateUrl: "./featured.component.html"
})
export class FeaturedComponent implements OnInit {
    misFavoritas: Array<Noticia> = [];
    hayFavoritas: boolean = false;

    @ViewChild("layout", { static: false }) layout: ElementRef;

    constructor(
        private noticias: NoticiasService,
        private store: Store<AppState>
    ) { }

    ngOnInit(): void {
        this.getFavoritas();
    }

    getFavoritas() {
        this.noticias.obtenerFavoritas().then((f: any) => {
            this.misFavoritas = f;
            console.log(this.misFavoritas);
            console.log(this.misFavoritas.length);

            if (this.misFavoritas.length == 0) {
                this.hayFavoritas = false;
            } else if (this.misFavoritas.length > 0) {
                this.hayFavoritas = true;
            }
            
            console.log(this.hayFavoritas);
        })
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onTap(args: GestureEventData, x: Noticia) {
        console.log(x.favorita);
        x.favorita = false;
        this.noticias.deleteFavorita(x);
        this.getFavoritas();
    }

    onRead(args: GestureEventData, x: Noticia) {
        console.log(x.leyendo);
        if (x.leyendo === false) {
            x.leyendo = true;
            // this.noticias.postFavorita(x);
            // Toast.makeText("'" + x.titulo + "' se agregó a Favoritos", "short").show();
            this.store.dispatch(new LeerNoticiaAction(x));
            
            this.store.select((state) => state.noticias.noticiaLeyendo)
            .subscribe((data) => {
                const ns = data;
                if (ns != null) {
                    Toast.makeText("Leyendo '" + ns.titulo + "'", "short").show();
                }
            })
        } else {
            x.leyendo = false;
            // this.noticias.deleteFavorita(x);
            // Toast.makeText("'" + x.titulo + "' se quitó de Favoritos", "short").show();
        }
        console.log(x.leyendo);
    }

    onLongPress(args: GestureEventData) {
        console.log("Object that triggered the event: " + args.object);
        console.log("View that triggered the event: " + args.view);
        console.log("Event name: " + args.eventName);

        const grid = <GridLayout>args.object;
        grid.rotate = 0;
        grid.animate({
            rotate: 360,
            duration: 2000
        })
    }
}
