import {EventEmitter, Output, Renderer2} from '@angular/core';
import { Directive, Input, ElementRef, HostListener, OnInit, OnDestroy} from '@angular/core';

/**
 * 元素固定指令，专门用于滚动时对卡片式的元素进行固定（如侧边栏之类需要在竖向滚动时维持位置不变）
 */
@Directive({
  selector: '[Stick]'
})
export class StickDirective implements OnInit, OnDestroy {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    console.log(el);
    console.log(this.renderer);
  }

  @Input() triggerY;
  @Input() stickY;
  @Output() onStick:EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    window.addEventListener('scroll',this.onScroll.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll',this.onScroll);
  }

  onScroll(e){
    console.log(window.scrollY);
    if(!this.triggerY) return;
    if(window.scrollY>=this.triggerY){
      this.el.nativeElement.style.position = "fixed";
      this.el.nativeElement.style.top = this.stickY+"px"||"";
      this.onStick.emit(true);
    }else{
      this.el.nativeElement.style.position = "";
      this.el.nativeElement.style.top = "";
      this.onStick.emit(false);
    }
  }
}
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [StickDirective],
  declarations: [StickDirective],
  providers: [],
})
export class StickDirectiveModule { }
