import { DomSanitizer } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';

/* 通过angular安全过滤 */

@Pipe({
   name: 'replaceDataMathml'
})

//手动替换去除math或者data-mathml标签
export class ReplaceDataMathml implements PipeTransform {
  transform(html: string, args: any[]): any {
      html +="";
      html = html.replace(/="<math.+?<\/math>"/gi, '').replace(/="<math.+?\/>"/gi, '');
        //data-mathml="<math xmlns="http://www.w3.org/1998/Math/MathML"><msup><mi>x</mi><mn>2</mn></msup><mo>-</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo>=</mo><mn>0</mn></math>"
      html = html.replace(/data\-mathml=\"\<math.+\<\/math\>\"/g, "").replace(/data\-mathml=\"\<math.+\/\>\"/g, "");
        // console.log(html.match(/data\-mathml=\"\<math.+\<\/math\>\"/));
      return html;
  }
}

@Pipe({
    name: 'bypassSecurityTrustHtml'
})

export class BypassSecurityTrustHtmlPipe implements PipeTransform {
    constructor(public domSanitizer: DomSanitizer){}
    transform(html: string, args: any[]): any {
        return this.domSanitizer.bypassSecurityTrustHtml(html);
    }
}

@Pipe({
    name: 'bypassSecurityTrustUrl'
})

export class BypassSecurityTrustUrl implements PipeTransform {
    constructor(public domSanitizer: DomSanitizer){}
    transform(url: string, args: any[]): any {
        return this.domSanitizer.bypassSecurityTrustUrl(url);
    }
}

@Pipe({
    name: 'bypassSecurityTrustStyle'
})

export class BypassSecurityTrustStyle implements PipeTransform {
    constructor(public domSanitizer: DomSanitizer){}
    transform(url: string, args: any[]): any {
        return this.domSanitizer.bypassSecurityTrustStyle(url);
    }
}

@Pipe({
  name: 'bypassSecurityTrustResourceUrl'
})

export class BypassSecurityTrustResourceUrl implements PipeTransform {
  constructor(public domSanitizer: DomSanitizer){}
  transform(url: string, args: any[]): any {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@NgModule({
    imports: [],
    exports: [
        ReplaceDataMathml,
        BypassSecurityTrustHtmlPipe,
        BypassSecurityTrustUrl,
        BypassSecurityTrustStyle,
        BypassSecurityTrustResourceUrl
    ],
    declarations: [
        ReplaceDataMathml,
        BypassSecurityTrustHtmlPipe,
        BypassSecurityTrustUrl,
        BypassSecurityTrustStyle,
        BypassSecurityTrustResourceUrl
    ],
    providers: [],
})
export class BypassSecurityTrustPipeModule { }
