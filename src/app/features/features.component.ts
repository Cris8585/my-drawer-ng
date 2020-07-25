import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-features',
  templateUrl: './features.component.html'
})
export class FeaturesComponent implements OnInit {

  constructor(
    private routerExtensions: RouterExtensions
  ) { }

  ngOnInit(): void {
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  onNavButton(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: "fade"
      }
    });
  }
}
