import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-funcionalidad',
  templateUrl: './funcionalidad.component.html'
})
export class FuncionalidadComponent implements OnInit {

  constructor(
    private routerExtensions: RouterExtensions
  ) { }

  ngOnInit(): void {
  }

  onNavButton(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: "fade"
      }
    });
  }
}
