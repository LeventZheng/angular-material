import {Directive, ElementRef, EventEmitter, HostListener, Input, NgModule, Output} from '@angular/core';
/*
* @desc: 触底懒加载指令
* @date: 2019/4/10
*/
@Directive({
  selector: '[scrollLoadInfinity]'
})
export class ScrollLoadInfinityDirective {

  constructor(private elRef: ElementRef) {
  }

  lock = false;// 是否允许广播触底事件
  @Input() distance:number = 0;// 距离底部一定距离提前触发
  @Output() doLoad:EventEmitter<any> = new EventEmitter<any>();

  @HostListener('mousewheel',['$event']) onScrollEvent(event) {
    let {scrollHeight,scrollTop,clientHeight} = this.elRef.nativeElement;
    if(clientHeight>=scrollHeight) return;// 没有滚动条的话就不需要触发

    if(!this.lock && scrollTop >= scrollHeight - clientHeight - this.distance){
      this.doLoad.emit();
      // 触发一次以后隔一段时间后才能触发第二次(节流)
      this.lock = true;
      setTimeout(() => {
        this.lock = false;
      },500);
    }
  }
}


@NgModule({
  imports: [],
  exports: [ScrollLoadInfinityDirective],
  declarations: [ScrollLoadInfinityDirective],
  providers: [],
})
export class ScrollLoadInfinityDirectiveModule { }
