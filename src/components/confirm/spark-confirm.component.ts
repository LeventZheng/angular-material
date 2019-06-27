import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnInit, Output, AfterViewInit } from '@angular/core';
import { LeaveDirectiveModule } from '../../../directives/leave.directive';

/**
 * 确认框
 * @export
 * @class SparkConfirmComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'spark-confirm',
    styleUrls: [ 'spark-confirm.component.css'],
    templateUrl: 'spark-confirm.component.html'
})
export class SparkConfirmComponent implements OnInit, AfterViewInit {

    @Input() title: string;
    @Input() content: string;
    @Input() canceltext: string;
    @Input() confirmtext: string;
    @Input() transclude: boolean;
    @Input() hideCancel: boolean;
    @Input() btnBoxCustom: boolean;
    @Input() confirmdisable: boolean;
    @Input() clickMaskCloseModal: boolean = true;
    @Input() canDrag: boolean;
    @Input() redConfirm: boolean;

    @Output() onclose = new EventEmitter();
    @Output() onconfirm = new EventEmitter();
    constructor() { }

    ngOnInit() {
      // document.body.style.overflowY = 'hidden';
    }

    ngAfterViewInit() {
      if (this.canDrag) {
        this.initDrag(document.querySelector('.js-drag-content .head'), document.querySelector('.js-drag-content'));
      }
    }

    initDrag(head, content) {
      let dragging = false,
        offsetX,
        offsetY,
        hasResetMargin = false;

      head.addEventListener('mousedown', (e) => {
        dragging = true;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
      });

      document.addEventListener('mousemove', (e) => {
        if (!dragging) {
          return;
        }
        // margin会影响拖动，需要重置为0
        if (!hasResetMargin) {
          content.style.marginLeft = 0;
          content.style.marginTop = 0;
          hasResetMargin = true;
        }
        content.style.left = e.clientX - offsetX + 'px';
        content.style.top = e.clientY - offsetY + 'px';
      });

      document.addEventListener('mouseup', () => {
        dragging = false;
      });
    }

    onMousewheel(event) {
        event.preventDefault();
    }

    close() {
        // document.body.style.overflowY = 'auto';
        this.onclose.emit();
    }
    confirm() {
        // document.body.style.overflowY = 'auto';
        this.onconfirm.emit();
    }

    clickMask() {
      if (this.clickMaskCloseModal) {
        this.close();
      }
    }
}
@NgModule({
    imports: [CommonModule, LeaveDirectiveModule],
    exports: [SparkConfirmComponent],
    declarations: [SparkConfirmComponent]
})
export class SparkConfirmModule { }
