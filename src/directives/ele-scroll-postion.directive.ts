import { Directive, ElementRef, Output, EventEmitter, OnInit, Renderer2, Input, OnDestroy } from '@angular/core';

/**
 * 元素滚动到离顶部的某个地方
 * @date: 2019-01-30
 * @time: 11:34
 * @desc:
 */
@Directive({
  selector: '[eleScrollPostion]'
})
export class EleScrollPostionDirective implements OnInit, OnDestroy{

  @Output() intoView:EventEmitter<any> = new EventEmitter();
  @Input() y:number;//离视口的距离
  scrollEvent:any;
  constructor(private elRef: ElementRef,private renderer: Renderer2) { }


  ngOnInit(){
    this.doScroll()
  }

  ngOnDestroy(): void {
    this.scrollEvent();
  }

  doScroll(){
    this.scrollEvent = this.renderer.listen('document', 'scroll', (event) => {
      let cr = this.elRef.nativeElement.getBoundingClientRect();
      let {y} = cr;
      if(y > 0 && y < this.y){
        this.intoView.emit();
      }
    });
  }
}

import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [EleScrollPostionDirective],
  declarations: [EleScrollPostionDirective],
  providers: [],
})
export class EleScrollPostionModule { }
