import {Directive, ElementRef, Input, OnInit, Renderer2} from "@angular/core";

/**
 * 控制元素滚动条会到顶部
 * @export
 * @class ScrollTopDirective
 * @implements {OnInit}
 */
@Directive({
  selector: '[scrollTop]'
})
export class ScrollTopDirective implements OnInit {

  /** 滚动条是否在document上面*/
  public isDocument: boolean = true;
  /** 滚动条元素的id*/
  public targetId: string;
  @Input() set setIsDocument(isDocument) {
    this.isDocument = isDocument;
  }
  @Input() set setTargetId(targetId) {
    this.targetId = targetId;
  }
  constructor(public el: ElementRef, public renderer: Renderer2) {
  }

  ngOnInit() {
    if(this.isDocument){
      this.scrollToTop();
    }else{
      document.querySelector('#'+this.targetId).scrollTop=0;
    }
  }

  /**
   * 滚动到顶部
   * @author: xiaole
   * @date:   2017/8/11
   */
  scrollToTop(){
    window.document.body.scrollTop=0;
  }
}
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [ScrollTopDirective],
  declarations: [ScrollTopDirective],
  providers: [],
})
export class ScrollTopDirectiveModule { }
