import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";
import { RouterExtensions } from 'nativescript-angular/router';
import { NoticiasService } from '../domain/noticias.service';
import { Noticia } from '../models/noticia.model';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { NoticiaReview } from '../models/noticia-review.model';
import * as Toast from "nativescript-toast";

@Component({
  selector: 'ns-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {
  private noticia: Noticia;

  private reviews: Array<NoticiaReview> = [];
  private review: NoticiaReview;

  constructor(
    private routerExtensions: RouterExtensions,
    private noticias: NoticiasService
  ) { }

  ngOnInit(): void {
    this.noticia = this.noticias.noticiaElegida;

    this.cargarReviews();
  }

  cargarReviews() {
    console.dir("cargarReviews idNoticia: " + this.noticia.id);
    this.noticias.obtenerReviews(this.noticia.id).then((r: any) => {
      console.log("Reviews de la noticia: " + JSON.stringify(r));
      this.reviews = r;
    }, (e) => {
      console.log("ERROR cargarReviews: " + e);
      Toast.makeText("Error cargando reviews").show();
    });
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  goBack(): void {
    this.routerExtensions.backToPreviousPage();
  }

  onPull(e) {
    // console.log(e);
    
    const pullRefresh = e.object;

    setTimeout(() => {
      this.reviews.push(this.noticias.agregarReview(this.noticia.id));
      pullRefresh.refreshing = false;
    }, 2000);
  }

  doLater(fn) {
    setTimeout(fn, 1000);
  }

  onItemTap(x): void {
    console.log("Tap arguments: ", x);
    this.review = this.reviews[x.index];
    console.log(this.review);
    this.doLater(() =>
      dialogs.action(
        "Editar review de " + this.review.usuario, 
        "Cancelar", 
        [
          "Editar comentario", 
          "Cambiar puntaje"
        ]).then((result) => {
          // console.log("Resultado: " + result);
          if (result === "Editar comentario") {
            this.doLater(() =>
              dialogs.prompt({
                title: "Editar review de " + this.review.usuario, 
                message: "Escribe el nuevo comentario: ",
                inputType: dialogs.inputType.text,
                okButtonText: "Guardar",
                cancelButtonText: "Cancelar"
              }).then(r => {
                // console.log("Dialog result: " + r.result + ", text: " + r.text);
                this.review.comentario = r.text;
              })
            );
          } else if (result === "Cambiar puntaje") {
            this.doLater(() => 
              dialogs.prompt({
                title: "Editar review de " + this.review.usuario, 
                message: "Actualiza el puntaje: ",
                inputType: dialogs.inputType.number,
                okButtonText: "Guardar",
                cancelButtonText: "Cancelar"
              }).then(r => {
                // console.log("Dialog result: " + r.result + ", text: " + r.text);
                this.review.puntaje = +r.text;
              })
            );
          }
        }
      )
    );
  }
}
