import { Pipe, PipeTransform } from '@angular/core';

import { COMMON } from '..';

/**
 * 将数字转成对应的中文
 * @demo value=1
 * @return '一'
 */
@Pipe({
  name: 'numberToChar'
})

export class NumberToCharPipe implements PipeTransform {
  transform(value: number, args: any[]): any {
    if(value > 0) {
      return COMMON.chineseNumList[value-1];
    }
  }
}

import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [NumberToCharPipe],
  declarations: [NumberToCharPipe],
  providers: [],
})
export class NumberToCharPipeModule { }
