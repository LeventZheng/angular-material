import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * hover-tip 鼠标hover时的小提示框。
 * ng-zorro中也有这种指令，但有时会出现样式错乱，使用不灵活
 */
@Directive({
  selector: '[hoverTip]',
})
export class HoverTipDirective {
  tipNode: HTMLElement; // tip节点
  triangle: HTMLElement; // 小三角
  TRIANLE_HEIGHT: number = 4; // 小三角高度

  div: HTMLElement;
  divId: string = 'hover-tip-get-text-width-id';

  @Input() content: string; // tip内容
  @Input() scrollContainer: HTMLElement; // 滚动容器
  @Input() arrowDirection: string = ArrowDirection.Down; // 箭头方向，默认向下
  @Input() removeTipNodeWhenPeak: boolean = false; // 容器滚动时，如果元素触顶，是否移除tipNode

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.content = String(this.content).trim();
    const span = document.createElement('span');
    span.innerText = this.content;

    const FONT_SIZE = 12; // 字号=12px
    const PADDING_LEFT = 8; // 左内边距=右内边距=8px
    const width = this.getTextWidth(span, 12); // 计算tip宽度

    // prettier-ignore
    span.style.cssText = `display: inline-block; position: fixed; min-width: 40px; height: 28px; line-height: 28px; text-align: center; border-radius: 4px; z-index: 9000; color: #fff; background-color: #363636; opacity: 0.85;`;
    span.style.cssText += 'font-size: ' + FONT_SIZE + 'px';
    span.style.cssText += 'padding: 0 ' + PADDING_LEFT + 'px';
    span.style.cssText += 'width: ' + width + 'px';

    // 小三角
    const label = document.createElement('label');
    // prettier-ignore
    label.style.cssText = `display: inline-block; position: absolute; left: 50%; margin-left: -${this.TRIANLE_HEIGHT}px; width: 0; height: 0; border-width: ${this.TRIANLE_HEIGHT}px; border-style: solid; border-left-color: transparent; border-right-color: transparent;`;
    span.appendChild(label);

    this.tipNode = span;
    this.triangle = label;

    // 监听容器滚动，更新tipNode的位置
    (this.scrollContainer as HTMLElement).addEventListener('scroll', () => {
      this.setPostion();
    });
  }

  ngOnDestroy() {
    if (this.div && this.div.parentNode) {
      this.div.parentNode.removeChild(this.div);
    }
  }

  @HostListener('mouseenter', ['$event'])
  onMouseenter() {
    (this.el.nativeElement as HTMLElement).appendChild(this.tipNode);
    this.setPostion();
  }

  @HostListener('mouseleave', ['$event'])
  onMmouseleave() {
    this.removeTipNode();
  }

  removeTipNode() {
    if (this.tipNode && this.tipNode.parentNode) {
      this.tipNode.parentNode.removeChild(this.tipNode);
    }
  }

  setPostion() {
    const rect = (this.el.nativeElement as HTMLElement).getBoundingClientRect();
    const top1 = rect.top - this.tipNode.clientHeight - this.TRIANLE_HEIGHT;
    const top2 = rect.bottom + this.TRIANLE_HEIGHT;

    // 容器滚动过程中，当前元素触顶
    const scrollContainTop = this.scrollContainer.getBoundingClientRect().top;
    if (rect.top - scrollContainTop <= 0 && this.removeTipNodeWhenPeak) {
      this.removeTipNode();
    }

    if (this.arrowDirection === ArrowDirection.Down) {
      // 小三角向下
      this.tipNode.style.top = top1 + 'px';
      // prettier-ignore
      this.triangle.style.cssText += `border-top-color: #363636; border-bottom-color: transparent; bottom: -${this.TRIANLE_HEIGHT * 2}px;`;
    } else {
      // 小三角向上
      this.tipNode.style.top = top2 + 'px';
      // prettier-ignore
      this.triangle.style.cssText += `border-bottom-color: #363636; border-top-color: transparent; top: -${this.TRIANLE_HEIGHT * 2}px;`;
    }

    this.tipNode.style.left = rect.left + rect.width / 2 - this.tipNode.clientWidth / 2 + 'px';
  }

  getTextWidth(dom, fontSize) {
    this.div = document.querySelector(`#${this.divId}`) as HTMLElement;
    if (!this.div) {
      this.div = document.createElement('div');
      this.div.setAttribute('id', this.divId);
      // prettier-ignore
      this.div.style.cssText =`display: inline-block; position: absolute; top: 0; left: 80px; visibility: hidden; pointer-events: none; white-space: nowrap`
      document.body.appendChild(this.div);
    }
    this.div.innerText = dom.innerText;
    this.div.style.cssText += `font-size: ${fontSize}px;`;
    return this.div.offsetWidth;
  }
}

enum ArrowDirection {
  Up = 'up',
  Down = 'down',
}

import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [HoverTipDirective],
  declarations: [HoverTipDirective],
  providers: [],
})
export class HoverTipDirectiveModule {}
