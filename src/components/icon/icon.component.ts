import { NgModule,Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef, OnChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../primeng/common/shared";
const xlinkNS = "http://www.w3.org/1999/xlink";
declare const window: any;
const cache = {};
declare const XDomainRequest: any;
/**
 * 图标组件
 * @export
 * @class IconComponent
 * @implements {OnInit}
 * <icon color="'#AAAAAA'" size="16" name="'close'"></icon>
 */
@Component({
  selector: 'icon',
  styleUrls: [ 'icon.component.css'],
  templateUrl: 'icon.component.html'
})
export class IconComponent implements OnInit, AfterViewInit, OnChanges {

  constructor(
    private ele: ElementRef
  ) { }
  @Input() color: string;
  @Input() width: number;
  @Input() height: number;
  @Input() name: string;
  @ViewChild('svg') svg: ElementRef;
  @ViewChild('use') use: ElementRef;

  ngOnInit() {
    this.ele.nativeElement.style.height = this.ele.nativeElement.style.lineHeight = this.height + 'px';
  }

  createRequest(url?) {
    // var createRequest = function (url) {
      // In IE 9, cross origin requests can only be sent using XDomainRequest.
      // XDomainRequest would fail if CORS headers are not set.
      // Therefore, XDomainRequest should only be used with cross origin requests.
      function getOrigin(loc) {
        var a;
        if (loc.protocol !== undefined) {
          a = loc;
        } else {
          a = document.createElement("a");
          a.href = loc;
        }
        return a.protocol.replace(/:/g, "") + a.host;
      }
      var Request;
      var origin;
      var origin2;
      if (window.XMLHttpRequest) {
        Request = new XMLHttpRequest();
        origin = getOrigin(location);
        origin2 = getOrigin(url);
        if (Request.withCredentials === undefined && origin2 !== "" && origin2 !== origin) {
          Request = XDomainRequest || undefined;
        } else {
          Request = XMLHttpRequest;
        }
      }
      return Request;
  }

  onloadFunc(xhr) {
    return function () {
      var body = document.body;
      var x = document.createElement("x");
      var svg;
      xhr.onload = null;
      x.innerHTML = xhr.responseText;
      svg = x.getElementsByTagName("svg")[0];
      if (svg) {
        svg.setAttribute("aria-hidden", "true");
        svg.style.position = "absolute";
        svg.style.width = 0;
        svg.style.height = 0;
        svg.style.overflow = "hidden";
        body.insertBefore(svg, body.firstChild);
      }
    };
  }

  ngOnChanges(value) {
    // console.log(value)
    if(value.name&&!value.name.firstChange) {
      this.svg.nativeElement.setAttribute('class','icon icon-'+this.name);
      this.use.nativeElement.setAttribute('xlink:href','../../../../assets/svg-files/symbol-defs.svg?v='+window.SVGVERSION+'#icon-'+this.name);
      this.use.nativeElement.setAttributeNS(xlinkNS, "xlink:href", "#icon-"+this.name)
    }
    this.svg.nativeElement.style.height = this.height + 'px';
    this.svg.nativeElement.style.width = this.width + 'px';
    this.color&&(this.svg.nativeElement.style.color = this.color);
  }

  ngAfterViewInit() {
    this.use.nativeElement.setAttribute('xlink:href','../../../../assets/svg-files/symbol-defs.svg?v='+window.SVGVERSION+'#icon-'+this.name);
    this.svg.nativeElement.setAttribute('class','icon icon-'+this.name);
    this.svg.nativeElement.style.height = this.height + 'px';
    this.svg.nativeElement.style.width = this.width + 'px';
    this.color&&(this.svg.nativeElement.style.color = this.color);
    // window.checkSvg && window.checkSvg();
    setTimeout(()=>{
      const brc = this.use.nativeElement.getBoundingClientRect();
      const href = this.use.nativeElement.getAttribute("href")
        || this.use.nativeElement.getAttributeNS(xlinkNS, "href")
        || this.use.nativeElement.getAttribute("xlink:href");
      let url;
      if (href && href.split) {
        url = href.split("#");
      } else {
        url = ["", ""];
      }
      const base = url[0];
      if(brc.width === 0 && brc.height === 0) {
        let xhr = cache[base];
        if (xhr !== true) {
          // true signifies that prepending the SVG was not required
          setTimeout(()=>{
            this.use.nativeElement.setAttributeNS(xlinkNS, "xlink:href", "#icon-"+this.name)
          });
        }
        if (xhr === undefined) {
          let Request = this.createRequest(base);
          if (Request !== undefined) {
            xhr = new Request();
            cache[base] = xhr;
            xhr.onload = this.onloadFunc(xhr);
            xhr.open("GET", base);
            xhr.send();
            // inProgressCount += 1;
          }
        }
      }
      // this.use.nativeElement.setAttributeNS(xlinkNS, "xlink:href", "#icon-"+this.name)
    });
  }

}
@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [IconComponent, SharedModule],
  declarations: [IconComponent]
})
export class IconModule { }
