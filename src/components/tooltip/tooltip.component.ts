import { CommonModule } from '@angular/common';
import {NgModule, ViewEncapsulation} from '@angular/core';
import { EventEmitter, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';

/**
 * tooltip提示框
 * @export
 * @class TooltipComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'tooltip',
    styleUrls: [ 'tooltip.component.scss'],
    templateUrl: 'tooltip.component.html'
})
export class TooltipComponent implements OnInit, AfterViewInit {
    @Input() vertPos: 'top'|'bottom';             // 箭头在垂直方向的位置
    @Input() horzPos: 'left'|'right'|'middle';    // 箭头在水平方向的位置
    @Input() width: number;
    @Input() content: string;
    @ViewChild('wrapper') wrapper;
    public arrowOffset = 30;
    constructor(private el: ElementRef) { }

    ngOnInit() {
        // document.body.style.overflowY = 'hidden';
    }

    ngAfterViewInit() {
      const parentPos = this.el.nativeElement.parentElement.getBoundingClientRect();
      this.wrapper.nativeElement.style.width = this.width || parentPos.width + 'px';
      const selfPos = this.wrapper.nativeElement.getBoundingClientRect();
      if (this.vertPos === 'bottom') {
        this.wrapper.nativeElement.style.left = parentPos.left - selfPos.width / 2 + parentPos.width / 2 + 'px';
        this.wrapper.nativeElement.style.top = parentPos.top - selfPos.height - 5 + 'px';
      }
      if (this.vertPos === 'top') {
        this.wrapper.nativeElement.style.left = parentPos.left - selfPos.width + parentPos.width + 'px';
        this.wrapper.nativeElement.style.top = parentPos.top + parentPos.height + 5 + 'px';
      }
    }
}
@NgModule({
    imports: [CommonModule],
    exports: [TooltipComponent],
    declarations: [TooltipComponent]
})
export class TooltipModule { }
