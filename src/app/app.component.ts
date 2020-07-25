import { Component, OnInit, Output, Input } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";

import * as appSettings from "tns-core-modules/application-settings";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    private userName: string;
    private userMail: string;

    constructor(private router: Router, private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

        if (appSettings.getString("userName") == undefined) {
            appSettings.setString("userName", "username");
            this.userName = appSettings.getString("userName");
            console.log("userName - undefined: " + appSettings.getString("userName"));
        } else {
            this.userName = appSettings.getString("userName");
            console.log("userName: " + appSettings.getString("userName"));
        }

        if (appSettings.getString("userMail") == undefined) {
            appSettings.setString("userMail", "username@mail.com");
            this.userMail = appSettings.getString("userMail");
            console.log("userMail - undefined: " + appSettings.getString("userMail"));
        } else {
            this.userMail = appSettings.getString("userMail");
            console.log("userMail: " + appSettings.getString("userMail"));
        }
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        this.userName = appSettings.getString("userName");
        this.userMail = appSettings.getString("userMail");

        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
