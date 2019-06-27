import { Pipe, PipeTransform } from '@angular/core';

/**
 * demo: [{sectionId:'a', sectionName:'a'}]
 * from: 知识点选择项syncKnowledgeTreeRange、教材创建productBasicDataList
 * @export
 * @class DropdownPipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'dropdown',
})
export class DropdownPipe implements PipeTransform {
  transform(list: any[], args: any[]): any {
    const dropdownArr = [];
    const key = args;
    if (list) {
      list.forEach(item => {
        const id = item[key + 'Id'];
        const name = item[key + 'Name'];
        dropdownArr.push({ label: name, value: id });
      });
    }
    return dropdownArr;
  }
}

/**
 * demo: [{code: 'a', codeValue: 'a'}]
 * from: getByCodeType接口查询字典数据
 * @export
 * @class DropdownTwoPipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'dropdown2',
})
export class DropdownTwoPipe implements PipeTransform {
  transform(list: any[], args: any[]): any {
    const dropdownArr = [];
    if (list) {
      list.forEach(item => {
        const id = item['code'];
        const name = item['codeValue'];
        dropdownArr.push({ label: name, value: id });
      });
    }
    return dropdownArr;
  }
}

/**
 * demo: [{id: 'a', name: 'a'}]
 * from: 班课管理organizationInfo接口
 * @export
 * @class DropdownThreePipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'dropdown3',
})
export class DropdownThreePipe implements PipeTransform {
  transform(list: any[], args: any[]): any {
    const dropdownArr = [];
    if (list) {
      list.forEach(item => {
        const id = item['id'];
        const name = item['name'];
        dropdownArr.push({ label: name, value: id });
      });
    }
    return dropdownArr;
  }
}

/**
 *
 *
 * @export
 * @class DropdownThreePipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'dropdownAll',
})
export class DropdownAllPipe implements PipeTransform {
  transform(list: any[], arg: any): any {
    const dropdownArr = [];
    if (list) {
      list.forEach(item => {
        const id = item[arg['key']];
        const name = item[arg['value']];
        dropdownArr.push({ label: name, value: id });
      });
    }
    return dropdownArr;
  }
}

import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: [DropdownPipe, DropdownTwoPipe, DropdownThreePipe, DropdownAllPipe],
  declarations: [DropdownPipe, DropdownTwoPipe, DropdownThreePipe, DropdownAllPipe],
  providers: [],
})
export class DropdownPipeModule {}
