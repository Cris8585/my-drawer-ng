import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ns-search-form',
  template: `
  <FlexboxLayout flexDirection="row">
    <TextField #texto="ngModel" [(ngModel)]="textFieldValue" hint="Ingresar texto..." required minlen="4" class="h2" style="width:625px"></TextField>
    <Label *ngIf="texto.hasError('required')" text="*" class="h2" style="width:625px"></Label>
    <Label *ngIf="!texto.hasError('required') && texto.hasError('minlen')" text="4+" class="h2" style="width:625px"></Label>
  </FlexboxLayout>
  <Button text="Buscar" (tap)="onButtonTap()" *ngIf="texto.valid"></Button>
  `
})
export class SearchFormComponent implements OnInit {
  textFieldValue: string = "";

  @Output() search: EventEmitter<string> = new EventEmitter();
  @Input() inicial: string;

  ngOnInit(): void {
    this.textFieldValue = this.inicial;
  }

  onButtonTap(): void {
    console.log(this.textFieldValue);
    if (this.textFieldValue.length > 2) {
      this.search.emit(this.textFieldValue);
    }
  }
}
