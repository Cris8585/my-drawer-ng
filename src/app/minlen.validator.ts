import { Directive, Input } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: "[minlen]",
    providers: [{ provide: NG_VALIDATORS, useExisting: MinLenDirective, multi: true }]
})
export class MinLenDirective implements Validator {
    @Input() minlen: string;

    constructor() { }

    validate(control: AbstractControl): {[key: string]: any} {
        return !control.value || control.value.length >= (this.minlen || 2) ? null : { minlen: true };
    }
}
