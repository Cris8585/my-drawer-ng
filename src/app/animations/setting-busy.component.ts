import { Component } from "@angular/core";
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";

@Component({
    selector: 'ns-setting-busy',
    template: `
    <Button text="Probar" 
        (tap)="(activityIndicator.busy = !activityIndicator.busy)"
        class="btn btn-primary btn-active">
    </Button>
    <ActivityIndicator #activityIndicator
        busy="true"
        (busyChange)="cambio($event)"
        width="100"
        height="100"
        class="activity-indicator">
    </ActivityIndicator>
    `
})
export class SettingBusyComponent {
    cambio(e) {
        let indicator = <ActivityIndicator>e.object;
        console.log("indicator.busy: " + indicator.busy);
    }
}
