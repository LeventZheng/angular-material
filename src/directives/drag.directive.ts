import { Renderer2 } from '@angular/core';
import { Directive, Input, ElementRef, HostListener, OnInit, OnDestroy} from '@angular/core';

/**
 * 拖拽事件
 * 使用方法：需要添加拖拽的元素标签上加id,margin的样式要用style来写
 */
@Directive({
  selector: '[Drag]'
})
export class DragDirective implements OnInit, OnDestroy {

  dragDiff = [];
  isMousedown = false;
  id: string;
  documentMoveListener;
  documentUpListener;
  @Input() hasBorder: boolean = false;  // 是否有拖拽边界
  @Input() border: Array<number>;       // 拖拽的边界依次为maxT、maxL、minT、minL上右下左边界
  constructor(
    el: ElementRef,
    private renderer: Renderer2
  ) {
    this.id = el.nativeElement.id;
  }

  ngOnInit() {
    this.documentMoveListener = this.renderer.listen('document', 'mousemove', (e) => {
      this.handleMove(e, 1);
    });
    this.documentUpListener = this.renderer.listen('document', 'mouseup', (e) => {
      this.handleEnd();
    });
  }

  ngOnDestroy() {
    this.documentMoveListener();
    this.documentUpListener();
  }

  @HostListener('mousedown', ['$event']) onMousedown(e) {
    // 互动题选择题目内容区不允许拖拽
    if(e.path.includes(document.querySelector('.chose_question .container'))) return;
    this.handleStart(e, 1);
  }
  @HostListener('touchstart', ['$event']) onTouchstart(e) {
    // 互动题选择题目内容区不允许拖拽
    if(e.path.includes(document.querySelector('.chose_question .container'))) return;
    this.handleStart(e, 2);
  }
  handleStart(e, type) {
    this.isMousedown = true;
    if (type ==1) {
      this.dragDiff = [e.clientX, e.clientY];
    } else {
      this.dragDiff = [e.touches[0].clientX, e.touches[0].clientY];
    }
  }

  // @HostListener('mousemove', ['$event']) onMousemove(e) {
  //   this.handleMove(e, 1);
  // }
  @HostListener('touchmove', ['$event']) onTouchmove(e) {
    this.handleMove(e, 2);
  }
  handleMove(e, type) {
    if(this.isMousedown){
      let oX;  // 横向偏移量
      let oY;  // 纵向偏移量
      if (type == 1) {
        oX = e.clientX - this.dragDiff[0];
        oY = e.clientY - this.dragDiff[1];
      } else {
        oX = e.touches[0].clientX - this.dragDiff[0];
        oY = e.touches[0].clientY - this.dragDiff[1];
      }
      let can = document.getElementById(this.id);
      let ml = can.style.marginLeft.length > 0 ? Number.parseInt(can.style.marginLeft.substr(0, can.style.marginLeft.length - 2)):0;  // 横向原有量
      let mt = can.style.marginTop.length > 0 ? Number.parseInt(can.style.marginTop.substr(0, can.style.marginTop.length - 2)):0;     // 纵向原有量
      let lastMl = ml + oX;
      let lastMt = mt + oY;
      // 处理左右拖拽
      if (this.hasBorder){
          // 限制左右拖拽的范围
          if (lastMl>this.border[3] && lastMl < this.border[1]) can.style.marginLeft = lastMl + 'px';
      } else {
          can.style.marginLeft = lastMl + 'px';
      }
      // 处理上下拖拽
      if(this.hasBorder) {
          // 限制上下的拖拽范围
          if (lastMt>this.border[2] && lastMt<this.border[0]) can.style.marginTop = lastMt + 'px';
      } else {
          can.style.marginTop = lastMt + 'px';
      }
      // 缓存当前鼠标距离
      if (type == 1) {
        this.dragDiff = [e.clientX, e.clientY];
      } else {
        this.dragDiff = [e.touches[0].clientX, e.touches[0].clientY];
      }
    }
  }

  // @HostListener('mouseup', ['$event']) onMouseup(e) {
  //   console.log('mouseup',e);
  //   this.handleEnd();
  // }
  // @HostListener('mouseout', ['$event']) onMouseout(e) {
  //   console.log('mouseout',e);
  //   this.handleEnd();
  // }
  @HostListener('touchend', ['$event']) onTouchend(e) {
    this.handleEnd();
  }
  handleEnd() {
    this.isMousedown&&(this.isMousedown = false);
  }
}
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [DragDirective],
  declarations: [DragDirective],
  providers: [],
})
export class DragDirectiveModule { }
