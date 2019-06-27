import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  NgZone, OnDestroy
} from '@angular/core';
import * as echarts from 'echarts';

@Directive({
  selector: 'echart'
})
export class EChartOptionDirective implements OnInit, OnChanges, OnDestroy {
  chartInstance:any = null;

  @Input('option') option: any;
  @Output() getChart = new EventEmitter<any>();

  constructor(public el: ElementRef,
              private ngZone: NgZone) {}

  public ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {// 注：echart会不断的执行渲染相关逻辑，这些逻辑将不断触发ng的脏检测，导致浏览器卡顿。因此初始化时要将其放到ng以外执行
      setTimeout(()=>{
        this.chartInstance = echarts.init(this.el.nativeElement);
        // console.log(this.option,this.el.nativeElement)
        this.getChart.emit(this.chartInstance);
        if(this.option) this.chartInstance.setOption(this.option);
      })
    });
  }

  ngOnChanges($event){
    console.log($event);
    if(!(this.chartInstance&&$event.option)) return;
    this.chartInstance.setOption($event.option.currentValue);// 更新chart
  }

  ngOnDestroy(){
    echarts.dispose(this.el.nativeElement);// 组件销毁后要执行销毁echart图表的操作，否则一些相关的渲染逻辑会一直执行
  }
}
