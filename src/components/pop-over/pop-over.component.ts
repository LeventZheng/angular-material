import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, OnChanges, NgModule } from '@angular/core';

/**
 * 带箭头的气泡弹框
 * @export
 * @class PopOverComponent
 * @implements {OnInit}
 * @implements {OnChanges}
 */
@Component({
  selector: 'spark-pop-over',
  templateUrl: './pop-over.component.html',
  styleUrls: ['./pop-over.component.scss']
})
export class PopOverComponent implements OnInit, OnChanges {

  @Input() style: any;            // 传入样式
  @Input() className: string;     // black黑色背景，pop_top顶部弹出
  constructor() { }

  ngOnChanges() {}

  ngOnInit() {
  }

}
@NgModule({
  imports: [CommonModule],
  exports: [PopOverComponent],
  declarations: [PopOverComponent]
})
export class PopOverModule { }
