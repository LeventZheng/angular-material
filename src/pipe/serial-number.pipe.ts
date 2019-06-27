import { Pipe, PipeTransform } from '@angular/core';

/**
 * 编号
 * 从1开始，范例1)
 */
@Pipe({
    name: 'serialNumber'
})

export class SerialNumberPipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        return '(' + (value + 1) + ')';
    }
}
import { NgModule } from '@angular/core';

@NgModule({
    imports: [],
    exports: [SerialNumberPipe],
    declarations: [SerialNumberPipe],
    providers: [],
})
export class SerialNumberPipeModule { }
