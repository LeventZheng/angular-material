import {Directive, ElementRef, EventEmitter, HostListener, NgModule, Output} from '@angular/core';


export enum LoadType {
  CONDITION,//筛选条件加载教案
  PAGE//分页加载教案
}

/**
 * 用于滚动加载数据
 * 离底部 150px触发事件
 * @author: xiaole
 * @date: 2018/11/16
 * @time: 5:09 PM
 * @desc:
 */
@Directive({
  selector: '[scrollLoad]'
})
export class ScrollLoadDirective {

  constructor(private elRef: ElementRef) {
  }

  @Output() doLoad:EventEmitter<any> = new EventEmitter<any>();

  @HostListener('mousewheel',['$event']) onScrollEvent(event) {
    let {scrollHeight,scrollTop,clientHeight} = this.elRef.nativeElement;
    if(scrollHeight - (scrollTop + clientHeight) < 150 ){
      this.doLoad.emit();
    }
  }


}


@NgModule({
  imports: [],
  exports: [ScrollLoadDirective],
  declarations: [ScrollLoadDirective],
  providers: [],
})
export class ScrollLoadDirectiveModule { }
