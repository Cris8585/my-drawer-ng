import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toast";
import { PromptOptions, PromptResult } from "tns-core-modules/ui/dialogs";

import * as appSettings from "tns-core-modules/application-settings";

@Component({
    selector: "Settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
        if (appSettings.getString("userName") == undefined) {
            appSettings.setString("userName", "Usuario");
        }
    }

    doLater(fn) {
        setTimeout(fn, 1000);
    }

    ngOnInit(): void {
        /*this.doLater(() =>
            dialogs.action("Mensaje", "Cancelar", ["Opción1", "Opción2"])
                .then((result) => {
                    console.log("resultado: " + result);
                    if (result === "Opción1") {
                        this.doLater(() =>
                            dialogs.alert({
                                title: "Título 1",
                                message: "Mensaje 1",
                                okButtonText: "Botón 1"
                            }).then(() => console.log("Cerrado 1"))
                        );
                    } else if (result === "Opción2") {
                        this.doLater(() => 
                            dialogs.alert({
                                title: "Título 2",
                                message: "Mensaje 2",
                                okButtonText: "Botón 2"
                            }).then(() => console.log("Cerrado 2"))
                        );
                    }
                })
        );*/
        const toastOptions = Toast.makeText("Hello World", "short");
        
        this.doLater(() => 
            toastOptions.show()
        );
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onButtonUsuario() {
        let options: PromptOptions = {
            title: "Nombre de usuario",
            inputType: dialogs.inputType.text,
            defaultText: "username",
            okButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            cancelable: true
        }

        dialogs.prompt(options).then((result: PromptResult) => {
            if (result.result === true) {
                if(result.text.length > 0) {
                    appSettings.setString("userName", result.text);
                    console.log("userName: " + appSettings.getString("userName"));
                }
            }
        })
    }

    onButtonCorreo() {
        let options: PromptOptions = {
            title: "Correo de usuario",
            inputType: dialogs.inputType.text,
            defaultText: "username@mail.com",
            okButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            cancelable: true
        }

        dialogs.prompt(options).then((result: PromptResult) => {
            if (result.result === true) {
                if(result.text.length > 0) {
                    appSettings.setString("userMail", result.text);
                    console.log("userMail: " + appSettings.getString("userMail"));
                }
            }
        })
    }
}
