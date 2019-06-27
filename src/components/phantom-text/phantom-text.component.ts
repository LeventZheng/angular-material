import { CommonModule } from '@angular/common';
import {Component, Input, Output, OnInit, NgModule, AfterViewInit, ViewChild} from '@angular/core';
import { TooltipModule } from '../tooltip/tooltip.component'

/**
 * hover时,根据文本是否溢出自动弹出内容提示框
 * @export
 * @class PhantomTextComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'phantom-text',
  templateUrl: 'phantom-text.component.html',
  styleUrls: ['phantom-text.component.scss']
})

export class PhantomTextComponent implements OnInit, AfterViewInit {

  @Input() content: string;
  @Input() vertPos: 'top'|'bottom';
  @Input() horzPos: 'left'|'right'|'middle';
  @ViewChild('wrapper') wrapper: any;

  public hover: boolean = false;
  public overflow: boolean = false;

  ngOnInit() {
  }

  ngAfterViewInit() {
    // console.log(this.wrapper.nativeElement.off)
    if(this.wrapper.nativeElement.offsetWidth < this.wrapper.nativeElement.scrollWidth) {
      this.overflow = true
    }
  }

}
@NgModule({
  imports: [CommonModule,TooltipModule],
  exports: [PhantomTextComponent],
  declarations: [PhantomTextComponent]
})
export class PhantomTextModule { }
