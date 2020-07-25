import { Noticia } from "../models/noticia.model";
import { Action } from "@ngrx/store";
import { NoticiasService } from "./noticias.service";
import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

// ESTADO
export interface NoticiasState {
    noticias: Noticia[];
    noticiaSugerida: Noticia;
    noticiaLeyendo: Noticia;
    noticiasLeyendo: Noticia[];
}

export function initializeNoticiaState() {
    return {
        noticias: [],
        noticiaSugerida: null,
        noticiaLeyendo: null,
        noticiasLeyendo: []
    };
}

// ACCIONES
export enum NoticiasActionTypes {
    INIT_MY_DATA = "[Noticias] Init My Data",
    NUEVA_NOTICIA = "[Noticias] Nueva",
    SUGERIR_NOTICIA = "[Noticias] Sugerir",
    LEER_NOTICIA = "[Noticias] Leer"
}

export class InitMyDataAction implements Action {
    type = NoticiasActionTypes.INIT_MY_DATA;
    constructor (public titulares: Noticia[]) { }
}

export class NuevaNoticiaAction implements Action {
    type = NoticiasActionTypes.NUEVA_NOTICIA;
    constructor (public noticia: Noticia) { }
}

export class SugerirNoticiaAction implements Action {
    type = NoticiasActionTypes.SUGERIR_NOTICIA;
    constructor (public noticia: Noticia) { }
}

export class LeerNoticiaAction implements Action {
    type = NoticiasActionTypes.LEER_NOTICIA;
    constructor (public noticia: Noticia) { }
}

export type NoticiasActions = InitMyDataAction | NuevaNoticiaAction | SugerirNoticiaAction | LeerNoticiaAction;

// REDUCERS
export function reducerNoticias (
    state: NoticiasState,
    action: NoticiasActions
): NoticiasState {
    switch (action.type) {
        case NoticiasActionTypes.INIT_MY_DATA: {
            console.log("reducerNoticias - INIT_MY_DATA")
            const titulares: Noticia[] = (action as InitMyDataAction).titulares;
            console.log(titulares);
            return {
                ...state,
                noticias: titulares.map((n) => 
                    new Noticia(
                        n.id,
                        n.titulo,
                        n.categoria,
                        n.nota,
                        n.countReview
                    ))
            };
        }
        case NoticiasActionTypes.NUEVA_NOTICIA: {
            console.log("reducerNoticias - NUEVA_NOTICIA")
            console.log(state.noticias);
            console.log(state.noticiaSugerida);
            return {
                ...state,
                noticias: [...state.noticias, (action as NuevaNoticiaAction).noticia]
            };
        }
        case NoticiasActionTypes.SUGERIR_NOTICIA: {
            console.log("reducerNoticias - SUGERIR_NOTICIA")
            return {
                ...state,
                noticiaSugerida: (action as SugerirNoticiaAction).noticia
            };
        }
        case NoticiasActionTypes.LEER_NOTICIA: {
            console.log("reducerNoticias - LEER_NOTICIA")
            return {
                ...state,
                noticiaLeyendo: (action as LeerNoticiaAction).noticia,
                noticiasLeyendo: [...state.noticiasLeyendo, (action as LeerNoticiaAction).noticia]
            };
        }
    }

    return state;
}

// EFFECTS
@Injectable()
export class NoticiasEffects {
    @Effect()
    nuevoAgregado$: Observable<Action> = this.actions$.pipe (
        ofType(NoticiasActionTypes.NUEVA_NOTICIA),
        map((action: NuevaNoticiaAction) => new SugerirNoticiaAction(action.noticia))
    );

    constructor(private actions$: Actions) { }
}
