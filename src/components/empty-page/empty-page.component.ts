import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, NgModule } from '@angular/core';

/**
 * 缺省页
 * @export
 * @class DefaultPageComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'empty-page',
  templateUrl: './empty-page.component.html',
  styleUrls: ['./empty-page.component.scss']
})
export class EmptyPageComponent implements OnInit {

  @Input() text: string = '暂无数据';
  @Input() style: any;            // 传入样式
  constructor() { }

  ngOnInit() {
  }

}
@NgModule({
  imports: [CommonModule],
  exports: [EmptyPageComponent],
  declarations: [EmptyPageComponent]
})
export class EmptyPageModule { }

