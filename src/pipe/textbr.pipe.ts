import { Pipe, PipeTransform } from '@angular/core';
// 回车符号换成回车
@Pipe({
    name: 'textbr'
})

export class TextBrPipe implements PipeTransform {
    transform(str:string): any {
        str += "";
        if(str == 'undefined'){
          return '';
        }
        return str.replace(/<BR>/ig,'\n');
    }
}
// 去掉html标签
@Pipe({
    name: 'replaceHtml'
})

export class ReplaceHtmlPipe implements PipeTransform {
    transform(str:string): any {
        str += "";
        if(str == 'undefined'){
          return '';
        }
        return str.replace(/<[^>]+>/g,"");
    }
}

import { NgModule } from '@angular/core';

@NgModule({
    imports: [],
    exports: [TextBrPipe, ReplaceHtmlPipe],
    declarations: [TextBrPipe, ReplaceHtmlPipe],
    providers: [],
})
export class TextBrPipeModule { }
