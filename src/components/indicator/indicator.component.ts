import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, AfterViewInit, OnChanges, Input, ElementRef, ViewChild, NgModule } from '@angular/core';
declare var waveLoading:any;
class IndicatorOption {
  barColor?: string = '#35D46A';
  barBgColor?: string = '#f3f3f3';
  barWidth?: number = 6;
  width?: number = 90;
  fontSize?: number = 20;
  fontColor?: string = '#35D46A';
  fontWeight?: string = 'bold';
  bgColor?: string = '#fff';
}

/**
 * 上传进度球
 * @export
 * @class IndicatorComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 * @implements {OnChanges}
 * @implements {OnDestroy}
 */
@Component({
    selector: 'indicator',
    styleUrls: ['indicator.component.css'],
    templateUrl: 'indicator.component.html'
})
export class IndicatorComponent implements OnInit,AfterViewInit,OnChanges,OnDestroy {
    @Input() pct:number = 0;
    // @Input() wavePct:number = 0;
    @Input() content:string;
    @Input() customOptions:IndicatorOption = {};
    @Input() image:boolean = false;
    @Input() wave:boolean = false;
    public leftStyle:any = {};
    public rightStyle:any = {};
    public pieLeftStyle:any = {};
    public pieRightStyle:any = {};
    public maskStyle:any = {};
    public circleStyle:any = {};
    public dpr:number = window.devicePixelRatio;
    // @ViewChild('indicator') indicator: ElementRef;
    constructor() { }

    ngOnInit() {
      let options = new IndicatorOption();
      this.customOptions = {...options,...this.customOptions} as IndicatorOption;
      this.circleStyle = {
        'width': this.customOptions.width + 'px',
        'height': this.customOptions.width + 'px',
        'background': this.customOptions.barColor
      };
      this.pieLeftStyle = {
        'width': this.customOptions.width + 'px',
        'height': this.customOptions.width + 'px',
        'clip': 'rect(0,'+this.customOptions.width/2+'px,auto,0)'
      };
      this.pieRightStyle = {
        'width': this.customOptions.width + 'px',
        'height': this.customOptions.width + 'px',
        'clip': 'rect(0,auto,auto,'+this.customOptions.width/2+'px)'
      };
      this.leftStyle = {
        'width': this.customOptions.width + 'px',
        'height': this.customOptions.width + 'px',
        'background': this.customOptions.barBgColor,
        'clip': 'rect(0,'+this.customOptions.width/2+'px,auto,0)'
      };
      this.rightStyle = {
        'width': this.customOptions.width + 'px',
        'height': this.customOptions.width + 'px',
        'background': this.customOptions.barBgColor,
        'clip': 'rect(0,auto,auto,'+this.customOptions.width/2+'px)'
      }
      this.maskStyle = {
        'width': (this.customOptions.width - this.customOptions.barWidth*2)+'px',
        'height': (this.customOptions.width - this.customOptions.barWidth*2)+'px',
        'line-height': (this.customOptions.width - this.customOptions.barWidth*2)+'px',
        'left': this.customOptions.barWidth + 'px',
        'top': this.customOptions.barWidth + 'px',
        'font-size': this.customOptions.fontSize + 'px',
        'color': this.customOptions.fontColor,
        'font-weight': this.customOptions.fontWeight,
        'background-color': this.customOptions.bgColor
      }
    }

    ngAfterViewInit() {
      // let selector = `#${this.indicator.nativeElement.id}`;
      // $(selector).radialIndicator({
      //   barColor : '#35D46A',
      //   barWidth : 7,
      //   initValue : this.pct,
      //   fontSize: 16,
      //   radius: 35,
      //   percentage: true,
      //   ...this.customOptions
      // });
      // this.radialObj = $(selector).data('radialIndicator');
      if(this.wave){
        waveLoading.init({
          target: '#waveLoading',
          showText: true,
          speed: 1,
          peak: 5,
          color: 'rgb(104,234,203)',
          textColor: 'rgb(14,83,54)',
          textSize: 16*this.dpr+'px'
        });
        waveLoading.draw()
      }
    }

    ngOnChanges(value) {
      if(value.pct) {
        if(!value.pct.firstChange){
          this.leftStyle.transition = 'transform 0.2s linear 0ms';
          this.pct = Math.ceil(this.pct);
          let deg = this.pct * 3.6;
          if (deg<=180) {
            if(deg === 0){
              waveLoading.resetProgress();
              this.leftStyle.transition = 'transform 0s linear 0ms';
              this.leftStyle.transform = "rotate(0deg)"
            }
            this.rightStyle.transform = "rotate(" + deg + "deg)"
          } else {
            this.rightStyle.transition = 'transform 0ms linear 0ms';
            this.rightStyle.transform = "rotate(180deg)";
            this.leftStyle.transform = "rotate(" + (deg - 180) + "deg)"
          }
          // this.radialObj.animate(this.pct);
          this.wave && waveLoading.setProgress(this.pct)
        }else {
          setTimeout(()=>{
            this.ngOnInit();
            this.pct = Math.ceil(this.pct);
            let deg = this.pct * 3.6;
            if (deg<=180) {
              this.rightStyle.transform = "rotate(" + deg + "deg)"
            } else {
              this.rightStyle.transition = 'transform 0ms linear 0ms';
              this.leftStyle.transition = 'transform 0ms linear 0ms';
              this.rightStyle.transform = "rotate(180deg)";
              this.leftStyle.transform = "rotate(" + (deg - 180) + "deg)"
            }
            // this.radialObj.animate(this.pct);
            this.wave && waveLoading.setProgress(this.pct)
          },0)
        }
      }
    }

    ngOnDestroy() {
      // this.radialObj.animate(0);
      this.wave && waveLoading.setProgress(0)
    }
}

@NgModule({
  imports: [CommonModule],
  exports: [IndicatorComponent],
  declarations: [IndicatorComponent]
})
export class IndicatorModule { }
