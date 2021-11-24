import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortPanelMembersByFirstName'
})
export class SortPanelMembersByFirstNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let i = 0
    let e = 0
    while(i < value.length - 1){
      let tempPosition = value[e]
      if(value[e].firstName.toUpperCase() > value[e + 1].firstName.toUpperCase()){
        value[e] = value[e + 1]
        value[e + 1] = tempPosition
      }

      if(e + 1 < value.length - 1 && i < value.length - 1) {
        e++
      } else if(e + 1 === value.length - 1 && i < value.length - 1) {
        e = 0
        i++
      }
    };
    return value
  }

}
