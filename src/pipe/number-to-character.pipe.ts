import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToCharacter'
})
export class NumberToCharacterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const char = ['A','B','C','D','E','F','G','H','I','J','K','L','M','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    return char[value] || value;
  }

}
import { NgModule } from '@angular/core';
@NgModule({
  imports: [],
  exports: [NumberToCharacterPipe],
  declarations: [NumberToCharacterPipe],
  providers: [],
})
export class NumberToCharacterPipeModule { }
