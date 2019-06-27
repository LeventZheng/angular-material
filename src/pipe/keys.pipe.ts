import { PipeTransform, Pipe } from '@angular/core';

/**
 * 将json对象或map数据结构转化成数组，以支持遍历
 * @export
 * @class KeysPipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(values, args: string[]): any {
    const keys = [];
    if(Object.prototype.toString.call(values)=='[object Object]') {
      for (const key in values) {
        if(values.hasOwnProperty(key)){
          keys.push({ key: key, value: values[key] });
        }
      }
      return keys;
    }
    if(Object.prototype.toString.call(values)=='[object Map]') {
      (window as any).myMap = values;
      // for (let [key,value] of values) {
      //   console.log(key,value)
      //   keys.push({ key: key, value: value });
      // }
      values.forEach((value,key)=>{
        keys.push({ key: key, value: value });
      });
      return keys
    }
    return values
  }
}
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [KeysPipe],
  declarations: [KeysPipe],
  providers: [],
})
export class KeysPipeModule { }
