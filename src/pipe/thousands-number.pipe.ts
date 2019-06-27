import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({
  name: 'thousandsNumber'
})
export class ThousandsNumberPipe implements PipeTransform{
  transform(p) {
    if (typeof p === 'number') {
      return p.toLocaleString('en-US');
    }
    return '';
  }
}


@NgModule({
  imports: [],
  exports: [ThousandsNumberPipe],
  declarations: [ThousandsNumberPipe],
  providers: []
})
export class ThousandsNumberPipeModule {}
