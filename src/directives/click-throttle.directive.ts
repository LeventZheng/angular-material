import { Directive, ElementRef, EventEmitter, Input, NgModule, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonUtils } from '..';

// 按钮快速重复点击时，对点击事件进行节流
@Directive({
  selector: '[clickThrottle]',
})
export class ClickThrottleDirective implements OnInit, OnDestroy {
  ele: HTMLElement;
  onclickHandler: any;

  @Input('clickThrottle') interval: number;

  @Output() getClick: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.ele = this.el.nativeElement as HTMLElement;
    this.onclickHandler = CommonUtils.throttle(this._onclickHandler.bind(this), +this.interval || 1000);

    this.ele.addEventListener('click', this.onclickHandler);
  }

  _onclickHandler(event) {
    this.getClick.emit(event);
  }

  ngOnDestroy() {
    this.ele.removeEventListener('click', this.onclickHandler);
  }
}

@NgModule({
  imports: [],
  exports: [ClickThrottleDirective],
  declarations: [ClickThrottleDirective],
  providers: [],
})
export class ClickThrottleDirectiveModule {}
