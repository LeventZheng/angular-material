import { OnInit, OnChanges, Directive, HostBinding, Input, ElementRef, AfterViewInit } from '@angular/core';
require('./../../../assets/plugin/zoom/zoombie');

/**
 * 点击图片放大
 * @export
 * @class ZoombieDirective
 * @implements {OnInit}
 * @implements {OnChanges}
 * @implements {AfterViewInit}
 */
@Directive({
  selector: '[zoombie]'
})
export class ZoombieDirective implements OnInit, OnChanges, AfterViewInit{
  @Input() zoom;
  @Input() currentImg;
  constructor(public el: ElementRef) {}

  ngOnInit(){}

  ngOnChanges() {
    // if(this.zoom){
    //   setTimeout(()=>{
    //     $(`#${this.currentImg}`).click();
    //   })
    // }
  }

  ngAfterViewInit() {
      $(`#${this.el.nativeElement.id}`).zoombie({ on: 'click'});
  }

}
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [ZoombieDirective],
  declarations: [ZoombieDirective],
  providers: [],
})
export class ZoombieDirectiveModule { }
