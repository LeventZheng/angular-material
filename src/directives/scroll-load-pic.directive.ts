import { NgModule,  Directive, ElementRef, EventEmitter, Input,
  OnInit, Output, OnChanges, Renderer2, SimpleChanges} from "@angular/core";

/**
 * 监听滚动，触发动态加载数据
 * @export
 * @class ScrollLoadPcDirective
 * @implements {OnInit}
 * @implements {OnDestroy}
 * @implements {OnChanges}
 */
@Directive({
  selector: '[scrollLoadPic]'
})
export class ScrollLoadPcDirective implements OnInit, OnChanges {
  /** 是否允许加载更多图片*/
  public allowLoadMore: boolean = true;
  /** 滚动条是否在document上面*/
  public isDocument: boolean = true;
  /** 滚动条元素的id*/
  public targetId: string;
  /** 图片box的最低高度*/
  public boxMinHeight: number = 0;
  preHeight: number;  // 记录上次触发位置
  /**  通知组件加载发起加载图片*/
  @Output() doLoad: EventEmitter<any> = new EventEmitter<any>();


  @Input() set setBoxMinHeight(minHeight) {
    this.boxMinHeight = minHeight;
  }

  @Input() set setAllowLoadMore(allowLoadMore) {
    this.allowLoadMore = allowLoadMore;
  }

  @Input() set setIsDocument(isDocument) {
    this.isDocument = isDocument;
  }

  @Input() set setTargetId(targetId) {
    this.targetId = targetId;
  }
  ngOnChanges(changes: SimpleChanges) {
  }
  constructor(public el: ElementRef, public renderer: Renderer2) {}

  ngOnInit() {
    if(this.isDocument){
      this.docScroll();
    }else{
      this.targetScroll();
    }
  }

  /**
   * 监听document的滚动事件
   * @author: xiaole
   * @date:   2017/8/9
   */
  docScroll(){
    this.renderer.listen('document', 'scroll', (event) => {
      if (this.allowLoadMore) {
        let scrollTop = event.target.body.scrollTop;
        let wordLookBoxHeight = this.el.nativeElement.offsetHeight;
        let currentHeight = wordLookBoxHeight && wordLookBoxHeight - scrollTop - this.boxMinHeight;
        if (currentHeight < 4000) {
          if (this.preHeight&&this.preHeight>currentHeight) return;
          this.preHeight = currentHeight;
          console.log("加载更多图片");
          this.doLoad.emit();
        }
      }
    });
  }

  /**
   * 监听指令元素的滚动事件
   * @author: xiaole
   * @date:   2017/8/9
   */
  targetScroll(){
    let target = document.querySelector("#"+this.targetId);
    this.renderer.listen(target, 'scroll', (event) => {
      if (this.allowLoadMore) {
        let scrollTop = target.scrollTop;
        let wordLookBoxHeight = this.el.nativeElement.offsetHeight;
        if (wordLookBoxHeight && wordLookBoxHeight - scrollTop - this.boxMinHeight < 4000) {
          console.log("加载更多图片")
          this.doLoad.emit();
        }
      }
    });
  }
}

@NgModule({
  imports: [],
  exports: [ScrollLoadPcDirective],
  declarations: [ScrollLoadPcDirective],
  providers: [],
})
export class ScrollLoadPicDirectiveModule { }
