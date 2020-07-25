export class Noticia {
    id: number;
    titulo: string;
    categoria: string;
    nota: string;
    countReview: number;
    favorita: boolean;
    leyendo: boolean;

    constructor (
        id: number,
        titulo: string,
        categoria: string,
        nota: string,
        countReview: number,
    ) {
        this.id = id;
        this.titulo = titulo;
        this.categoria = categoria;
        this.nota = nota;
        this.countReview = countReview;
        this.favorita = false;
        this.leyendo = false;
    }
}
