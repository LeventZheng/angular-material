import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { IconModule } from '../icon/icon.component';

/**
 * checkbox
 * @export
 * @class CheckboxComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'checkbox',
  styleUrls: [ 'checkbox.component.scss'],
  templateUrl: 'checkbox.component.html'
})
export class CheckboxComponent implements OnInit {

  constructor() {

  }

  @Input() checked: boolean = false;
  @Input() name: string;
  @Input() labelStyle: any;
  @Input() checkboxStyle: any;
  @Input() disabled: boolean = false;
  @Input() iconSize = 16;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  ngOnInit() {

  }

  onClick() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onChange.emit({ checked: this.checked})
    }
  }

}
@NgModule({
  imports: [CommonModule,IconModule],
  exports: [CheckboxComponent],
  declarations: [CheckboxComponent]
})
export class CheckboxModule { }
