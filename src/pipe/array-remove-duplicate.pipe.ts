import { Pipe, PipeTransform } from '@angular/core';
/**
 * 数组去重
 * @demo list=[1,1,2,3] 
 * @return [1,2,3]
 * @demo list=[{id:'17176', name:'知识点'}，{id:'17176', name:'知识点'}], key:'id'
 * @return [{id:'17176', name:'知识点'}]
 */
@Pipe({
  name: 'arrayRemoveDuplicate'
})
export class ArrayRemoveDuplicatePipe implements PipeTransform {

  transform(list: any[], key?: any): any {
    // 没有传key的时候按照简单的数组处理
    if (!key) {
      return Array.from(new Set(list));
    } else {
      // 数组中包含项是一个个对象，通过key判断是否重复
      let newArr = [], indexArr = [];
      list.forEach(item => {
        if (indexArr.indexOf(item[key]) == -1) {
          indexArr.push(item[key]);
          newArr.push(item);
        }
      });
      return newArr;
    }
  }
}
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [ArrayRemoveDuplicatePipe],
  declarations: [ArrayRemoveDuplicatePipe],
  providers: [],
})
export class ArrayRemoveDuplicatePipeModule { }
