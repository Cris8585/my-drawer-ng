import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { NoticiasService } from "../domain/noticias.service";
import { RouterExtensions } from "nativescript-angular/router";
import { Noticia } from "../models/noticia.model";
// import { View, Color } from "tns-core-modules/ui/page";
import * as Toast from "nativescript-toast";
import { Store } from "@ngrx/store";
import { AppState } from "../app.module";
import { NuevaNoticiaAction } from "../domain/noticias-state.model";
import { GestureEventData } from "tns-core-modules/ui/gestures";

@Component({
    selector: "Search",
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {
    // idNoticia: number;
    noticia: Noticia;
    // resultados: Array<Noticia>;
    resultados: Array<string>;
    resultadosNoticias: Array<Noticia>;

    @ViewChild("layout", { static: false }) layout: ElementRef;

    constructor(
        private noticias: NoticiasService, 
        private store: Store<AppState>,
        private routerExtensions: RouterExtensions
    ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.store.select((state) => state.noticias.noticiaSugerida)
            .subscribe((data) => {
                const ns = data;
                if (ns != null) {
                    Toast.makeText("Sugerimos leer: " + ns.titulo, "short").show();
                }
            })
    }

    onButtonTap(): void {
        this.noticias.resetCounter();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onItemTap(x): void {
        this.noticias.noticiaElegida = this.resultadosNoticias[x.index];

        this.store.dispatch(new NuevaNoticiaAction(this.noticias.noticiaElegida));
    }

    onTap(args: GestureEventData, x: Noticia) {
        console.log("Tap");
        console.log("Object that triggered the event: " + args.object);
        console.log("View that triggered the event: " + args.view);
        console.log("Event name: " + args.eventName);

        console.log(x.favorita);
        if (x.favorita === false) {
            x.favorita = true;
            this.noticias.postFavorita(x);
            Toast.makeText("'" + x.titulo + "' se agregó a Favoritos", "short").show();
        } else {
            x.favorita = false;
            this.noticias.deleteFavorita(x);
            Toast.makeText("'" + x.titulo + "' se quitó de Favoritos", "short").show();
        }
        console.log(x.favorita);
    }

    onNavButton(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        })
    }

    buscarNoticia(n: string) {
        console.dir("buscarNoticia: " + n);
        this.noticias.bucarNoticia(n).then((r: any) => {
            console.log("Resultados buscarNoticia: " + JSON.stringify(r));
            this.resultadosNoticias = r;
        }, (e) => {
            console.log("ERROR buscarNoticia: " + e);
            Toast.makeText("Error en la búsqueda").show();
        });
    }

    agregarNoticia(): void {
        if(this.noticias.noticiaCounter > 0) {
            let idNoticia = this.noticias.noticiaCounter;

            this.noticia = new Noticia(
                idNoticia,
                "Noticia " + idNoticia,
                "General",
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                this.noticia.countReview = 1
            );
            
            this.noticias.agregarReviewInicial(this.noticia.id);
            this.noticias.agregarNoticia(this.noticia);
        }
    }
}
