import {Directive, Renderer2, OnInit, ElementRef, OnChanges, Input} from '@angular/core';

/**
 * 给页面添加开始时的动画效果
 * @export
 * @class PageInDirective
 * @implements {OnInit}
 * @implements {OnChanges}
 */
@Directive({ selector: '[pageIn]' })
export class PageInDirective implements OnInit, OnChanges{
    @Input() pageIn: any;
    constructor(
        private elementRef: ElementRef,
        private render: Renderer2
    ) { }

    ngOnInit() {
      this.pageInAnimation();
    }

    ngOnChanges(value) {
      this.pageInAnimation();
    }

    pageInAnimation() {
      this.render.addClass(this.elementRef.nativeElement, 'slide-fade-in-down');
      (this.elementRef.nativeElement as HTMLElement).addEventListener('webkitAnimationEnd', () => {
        this.render.removeClass(this.elementRef.nativeElement,'slide-fade-in-down');
      });
    }
}
