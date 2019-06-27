import { Directive, ElementRef, Input, EventEmitter, Output, Renderer2, OnInit, OnDestroy} from '@angular/core';
import { Subject } from 'rxjs';


/**
 * 监听滚动事件
 * @export
 * @class ScrollDirective
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Directive({
    selector: '[appScroll]'
})
export class ScrollDirective implements OnInit,OnDestroy {
    @Output() scrollTop: EventEmitter<number> = new EventEmitter<number>();
    @Output() onMousewheel: EventEmitter<any> = new EventEmitter<any>();
    @Output() onToggleTrigger: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() triggerOffset:number; // 指定一个偏移值，当鼠标滚轮达到该值时触发onToggleTrigger事件（之后该做什么动作由开发者在组件内自行定义）
    @Input() hideNavOffset: number;// 指定一个偏移值，当鼠标滚轮达到该值时隐藏顶部导航栏
    public documentWheelListener:any;

    constructor(public el: ElementRef,public renderer: Renderer2) {}

    ngOnInit() {
      let bodyHeight,windowHeight;
      // let footer = document.querySelector('footer');
      this.documentWheelListener = this.renderer.listen('window', 'scroll', (event) => {
        bodyHeight = document.body.offsetHeight;
        windowHeight = window.innerHeight;
        // 控制顶部导航栏的显示与隐藏，并返回回调
        if(this.hideNavOffset){
          if(bodyHeight-windowHeight>this.hideNavOffset){
            let isHidden = (document.querySelector('#navHeader') as HTMLDivElement).style.display=='none';
            if(!isHidden && (window.scrollY >= this.hideNavOffset+$('.app #navHeader')[0].offsetHeight)){
              $('.app #navHeader').slideUp(0);
              // (document.querySelector('footer') as HTMLDivElement).style.display = 'none';
              (document.querySelector('.app .main') as HTMLDivElement).style.marginTop = '0px';
              this.onToggleTrigger.emit(true);
            }else if(isHidden && ((window.scrollY+$('.app #navHeader')[0].offsetHeight) < this.hideNavOffset)) {
              $('.app #navHeader').fadeIn(0);
              // (document.querySelector('footer') as HTMLDivElement).style.display = 'block';
              (document.querySelector('.app .main') as HTMLDivElement).style.marginTop = '60px';
              this.onToggleTrigger.emit(false);
            }
          }
        }else if(this.triggerOffset){
          this.onToggleTrigger.emit(window.scrollY>this.triggerOffset);
        }
        this.onMousewheel.emit(event)
      });
    }

    ngOnDestroy() {
      this.documentWheelListener();   //this.renderer.listen函数返回了一个removeListener方法，执行它便可移除监听
    }
}
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [ScrollDirective],
  declarations: [ScrollDirective],
  providers: [],
})
export class ScrollDirectiveModule { }

