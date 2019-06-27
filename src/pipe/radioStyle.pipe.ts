import { Pipe, PipeTransform } from '@angular/core';

/**
 * 题目答案选项自动排版，根据选项长度判断一行显示1个、2个或是4个
 * @export
 * @class RadioStylePipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'radioStyle'
})

export class RadioStylePipe implements PipeTransform {
  transform(text: string, args: { container: any, percent: number, lineWidth?: number, fontSize?: string }): any {

    let tagArr = text.match(/<p[^>]*><input type="radio"(?:(?!<\/?p>)[\s\S])*<\/p>/gi);

    if (!tagArr) return text;

    // 去除换行符
    text = text.replace(/<p[^>]*>\s*(&#8203;)*\s*<br[^>]*>\s*(&#8203;)*\s*<\/p>/gi, '');

    let maxWidth = 0,
      realWidthRatio = 1.3, // 公式渲染出来后会变宽
      optionPerLine,
      optionClass,
      span = document.createElement('span');

    let width = getComputedStyle(args.container)['width'];
    //此处依赖于examination-question-content组件的父级宽度
    let lineWidth = Number.parseInt(width.replace('px', '')) * (args.percent || 1);
    if (width.indexOf('%') > -1) {
      lineWidth = args.lineWidth * (args.percent || 1);
    }

    const htmlFontSize = +document.getElementsByTagName('html')[0].style.fontSize.replace('px', '');

    // 默认采用html的fontsize
    if (htmlFontSize) {
      span.style.fontSize = htmlFontSize * 0.16 + 'px';
    } else {
      span.style.fontSize = '16px';
    }

    // 判断有不有外界传进来的fontsize，用来计算每个选项的宽度
    if (!!args.fontSize) {
      span.style.fontSize = args.fontSize;
    }

    // 创建虚拟span来插入body中获取占用的最大宽度
    // 插入body中，以便获得选项的真实宽度offsetWidth
    (document.body as any).append(span);
    tagArr.forEach(function(tag) {
      let inner = tag.replace(/<p/, '<span').replace(/<\/p>/, '</span>');
      span.innerHTML = inner;
      maxWidth = span.offsetWidth > maxWidth ? span.offsetWidth * realWidthRatio : maxWidth;
    });
    // 移除dom
    document.body.removeChild(span);

    // 计算每一行能放几个选项
    optionPerLine = lineWidth / maxWidth;
    if (optionPerLine > 4) {
      optionClass = 'quadruplePerLine';
    } else if (optionPerLine < 2) {
      optionClass = 'singlePerLine';
    } else {
      optionClass = 'doublePerLine';
    }

    // 把所有选项置入自定义的div标签中进行处理
    text = text.replace(/<p[^>]*><input type="radio"/, '<div class="' + optionClass + '" style="max-width: ' + lineWidth + 'px">' + text.match(/<p[^>]*><input type="radio"/));
    text = text.replace(/.*<p[^>]*><input type="radio"(?:(?!<\/?p>)[\s\S])*<\/p>/, text.match(/.*<p[^>]*><input type="radio"(?:(?!<\/?p>)[\s\S])*<\/p>/) + '</div>');
    return text;
  }
}

import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [RadioStylePipe],
  declarations: [RadioStylePipe],
  providers: []
})
export class RadioStylePipeModule {
}
