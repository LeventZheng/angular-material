import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { IconModule } from '../icon/icon.component'
import {CommonUtils} from "../../../utils/common.utils";

/**
 * checkbox
 * @export
 * @class CheckboxComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'radiobox',
  styleUrls: [ 'radioBox.component.scss'],
  templateUrl: 'radioBox.component.html'
})
export class RadioBoxComponent implements OnInit {

  uuid = CommonUtils.generateUUID();
  constructor() {

  }

  @Input() checked: boolean;
  /** 需要显示的名称*/
  @Input() label: string;

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  ngOnInit() {

  }

  radioChange(){
    this.checked = true;
    this.onChange.emit();
  }

}
@NgModule({
  imports: [CommonModule],
  exports: [RadioBoxComponent],
  declarations: [RadioBoxComponent]
})
export class RadioBoxModule { }
