import { Pipe, PipeTransform } from '@angular/core';
/**
 * 将字符串改成数字输出
 * @demo:value='17.265',preserve=2
 * @return 17.26
 */
@Pipe({
  name: 'stringToNumber'
})

export class StringToNumberPipe implements PipeTransform {
  transform(value: string, preserve: number = 0): any {
    return Number(value).toFixed(preserve)
  }
}
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [StringToNumberPipe],
  declarations: [StringToNumberPipe],
  providers: [],
})
export class StringToNumberPipeModule { }




