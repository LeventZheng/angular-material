import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EventEmitter, Input, ElementRef, AfterViewInit, ViewChild, Renderer2 } from '@angular/core';
import { Component, OnInit, Output, OnDestroy } from '@angular/core';

/**
 * 轻确认框
 * @export
 * @class LightModalComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'light-modal',
    styleUrls: [ 'light-modal.component.scss'],
    templateUrl: 'light-modal.component.html'
})
export class LightModalComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() vertPos: 'top'|'bottom' = 'bottom';      //箭头在垂直方向的位置
    @Input() horzPos: 'left'|'right'|'middle' = 'right';      //箭头在水平方向的位置
    @Input() content: string;
    @Input() canceltext: string;
    @Input() confirmtext: string;
    @Input() hideBottom: boolean;
    @Input() embed: boolean;     //是否嵌入ng-content
    @Output() onclose = new EventEmitter();
    @Output() onconfirm = new EventEmitter();
    @ViewChild('wrapper') wrapper;
    @ViewChild('arrow') arrow;
    // public arrowOffset = 40;
    public documentClickListener: any;
    public scrollListener: any;
    public selfClick: boolean = false;
    public initialScroll: number;
    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {

      // document.addEventListener('scroll',(event)=>{
      //   console.log(event)
      // })
      // this.scrollListener = this.renderer.listen('window','scroll',($event)=>{
      //   console.log($event)
      // })
        // document.body.style.overflowY = 'hidden';
      this.initialScroll = window.scrollY;
      setTimeout(()=>{
        this.bindScrollListener();
        this.bindDocumentClickListener();
      },100)
    }

    ngAfterViewInit() {
      const fakeElement = document.createElement('div');
      fakeElement.style.position = 'fixed';
      fakeElement.style.top = '0';
      fakeElement.style.left = '0';
      this.el.nativeElement.parentElement.appendChild(fakeElement);
      const leftOffset = fakeElement.getBoundingClientRect().left;    //消除带有translate样式的父级对fixed定位的影响
      const topOffset = fakeElement.getBoundingClientRect().top;      //消除带有translate样式的父级对fixed定位的影响
      const parentPos = this.el.nativeElement.parentElement.getBoundingClientRect();
      const selfPos = this.wrapper.nativeElement.getBoundingClientRect();
      const arrowPos = this.arrow.nativeElement.getBoundingClientRect();
      const arrowStyle = getComputedStyle(this.arrow.nativeElement);
      const wrapperEle = this.wrapper.nativeElement;
      switch (this.horzPos) {
        case 'right':
          wrapperEle.style.left = parentPos.left - leftOffset + parentPos.width/2 - selfPos.width + (+arrowStyle.right.replace('px','')) + arrowPos.width/2 + 'px';
          break;
        case 'left':
          //todo
          break;
        case 'middle':
          wrapperEle.style.left = parentPos.left + parentPos.width/2 - selfPos.width/2 + 'px';
          break
      }
      switch (this.vertPos) {
        case 'bottom':
          wrapperEle.style.top = parentPos.top - topOffset - selfPos.height - 10 + 'px';
          break;
        case 'top':
          wrapperEle.style.top = parentPos.bottom - topOffset + 10 + 'px';
          break
      }
      this.el.nativeElement.parentElement.removeChild(fakeElement)
    }

    close($event) {
        // document.body.style.overflowY = 'auto';
        $event.stopPropagation();
        this.onclose.emit();
    }
    confirm($event) {
        // document.body.style.overflowY = 'auto';
        $event.stopPropagation();
        this.onconfirm.emit();
    }
    bindDocumentClickListener() {
      if(!this.documentClickListener) {
        this.documentClickListener = this.renderer.listen('document', 'click', () => {
          if(!this.selfClick) {
            // debugger
            this.onclose.emit()
          }
          this.selfClick = false;
        });
      }
    }

    bindScrollListener() {
      const wrapperEle = this.wrapper.nativeElement;
      if(!this.scrollListener) {
        this.scrollListener = this.renderer.listen('document','scroll', ()=>{
          wrapperEle.style.top = +wrapperEle.style.top.replace('px','') - (window.scrollY - this.initialScroll) + 'px';
          this.initialScroll = window.scrollY
        })
      }
    }

    ngOnDestroy() {
      this.documentClickListener && this.documentClickListener();
      this.scrollListener && this.scrollListener()
    }
}
@NgModule({
    imports: [CommonModule],
    exports: [LightModalComponent],
    declarations: [LightModalComponent]
})
export class LightModalModule { }
