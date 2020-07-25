import { Injectable } from "@angular/core";
import { Noticia } from "../models/noticia.model";
import { NoticiaReview } from "../models/noticia-review.model";
import { request, getJSON } from "tns-core-modules/http";

import * as appSettings from "tns-core-modules/application-settings";

const sqlite = require("nativescript-sqlite");

@Injectable()
export class NoticiasService {
    private api: String;
    
    public noticiaElegida: Noticia | null;
    public noticiaCounter: number;

    public reviewsNoticia: Array<NoticiaReview> = [];
    public review: NoticiaReview;

    constructor() {
        appSettings.setString("api", "https://9e50bfab5190.ngrok.io");
        this.api = appSettings.getString("api");

        if (appSettings.getString("noticiaCounter") == undefined) {
            appSettings.setString("noticiaCounter", ""+8);
            console.log("Undefined: " + appSettings.getString("noticiaCounter"));
            this.noticiaCounter = Number(appSettings.getString("noticiaCounter"));
        } else {
            console.log("noticiaCounter: " + appSettings.getString("noticiaCounter"));
            this.noticiaCounter = Number(appSettings.getString("noticiaCounter"));
        }

        /* this.getDB((db) => {
            console.dir(db);
            db.each("select * from logs",
                (err, fila) => console.log("Fila: ", fila),
                (err, totales) => console.log("Filas totales", totales)
            );
        }, () => console.log("Error on getDB")); */
    }

    getDB(fnOk, fnError) {
        return new sqlite("my_db_logs", (err, db) => {
            if (err) {
                console.error("Error al abrir DB!", err);
            } else {
                console.log("BD abierta: ", db.isOpen() ? "Si" : "No");
                db.execSQL("CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, texto TEXT)")
                    .then((id) => {
                        console.log("CREATE TABLE OK");
                        fnOk(db);
                    }, (error) => {
                        console.log("CREATE TABLE ERROR", error);
                        fnError(error);
                    });
            }
        });
    }

    resetCounter(): void {
        console.log(appSettings.getString("noticiaCounter"));
        appSettings.remove("noticiaCounter");
        console.log(appSettings.getString("noticiaCounter"));
    }

    bucarNoticia(n: string) {
        this.buscarDB(n);

        return getJSON(this.api + "/news?q=" + n);
    }

    agregarNoticia(n: Noticia): Noticia {
        this.noticiaCounter++;
        appSettings.setString("noticiaCounter", ""+this.noticiaCounter);
        
        this.postNoticia(n);

        return n;
    }

    postNoticia(n: Noticia) {
        return request({
            url: this.api + "/news",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                nuevo: n
            })
        })
    }

    postFavorita(n: Noticia) {
        return request({
            url: this.api + "/favs",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                nuevo: n
            })
        })
    }

    deleteFavorita(n: Noticia) {
        return request({
            url: this.api + "/favs",
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                favorita: n
            })
        })
    }

    obtenerReviews(idNoticia: number) {
        return getJSON(this.api + "/news/reviews?q=" + idNoticia);
    }

    subirReview() {
        return request({
            url: this.api + "/news/reviews",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                nuevo: this.review
            })
        });
    }

    agregarReviewInicial(idNoticia: number) {
        this.review = new NoticiaReview();
        
        this.review.id = 0;
        this.review.comentario = "Excelente nota!";
        this.review.usuario = "Carlos Pérez";
        this.review.puntaje = 4.3;
        this.review.idNoticia = idNoticia;

        this.subirReview();
    }

    agregarReview(idNoticia: number): NoticiaReview {
        const i = this.noticiaElegida.countReview;

        this.review = new NoticiaReview();
        this.review.id = i;
        this.review.comentario = "Comentario " + i;
        this.review.usuario = "Usuario " + i;
        this.review.puntaje = 4.5;
        this.review.idNoticia = idNoticia;

        console.log("reviewCount: " + i);
        console.log("Review: " + this.review);

        this.subirReview();

        this.noticiaElegida.countReview++;

        return this.review;
    }

    buscarDB(s: string) {
        this.getDB((db) => {
            db.execSQL("INSERT INTO logs (texto) VALUES (?)", [s],
                (err, id) => console.log("Nuevo id: ", id)
            );
        }, () => console.log("Error on buscarDB"));
    }

    buscar(s: string) {
        this.buscarDB(s);

        return getJSON(this.api + "/get?q=" + s);
    }

    obtenerFavoritas() {
        return getJSON(this.api + "/favs");
    }
}
