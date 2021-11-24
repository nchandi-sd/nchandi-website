import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(value: any, property: any, direction: any): any {
    let i = 0
    let e = 0
    while(i < value.length - 1){
      let tempPosition = value[e]
      let altTempPosition = value[e + 1]



      if(property === 'facility'){
        console.log("this is a facility")
        if(value[e].facility.facilityName.toUpperCase() > value[e + 1].facility.facilityName.toUpperCase() && direction === true){
          value[e] = value[e + 1]
          value[e + 1] = tempPosition
        }
        
        if(value[e].facility.facilityName.toUpperCase() < value[e + 1].facility.facilityName.toUpperCase() && direction === false){
          value[e + 1] = value[e]
          value[e] = altTempPosition
        }
      } else if(typeof value[e][property] === 'boolean') {
        console.log("is boolean")
        if(value[e][property] > value[e + 1][property] && direction === true){
          value[e] = value[e + 1]
          value[e + 1] = tempPosition
        }
  
        
        if(value[e][property] < value[e + 1][property] && direction === false){
          value[e + 1] = value[e]
          value[e] = altTempPosition
        }
      } else if(typeof value[e][property] === 'number') {
        console.log("is number")
        if(value[e][property] > value[e + 1][property] && direction === true){
          value[e] = value[e + 1]
          value[e + 1] = tempPosition
        }
  
        
        if(value[e][property] < value[e + 1][property] && direction === false){
          value[e + 1] = value[e]
          value[e] = altTempPosition
        }
      } /* else if(value[e][property].match(/\W/g)) {
        console.log("is alphanumeric")
        if(value[e][property] > value[e + 1][property] && direction === true){
          value[e] = value[e + 1]
          value[e + 1] = tempPosition
        }
  
        
        if(value[e][property] < value[e + 1][property] && direction === false){
          value[e + 1] = value[e]
          value[e] = altTempPosition
        }
      } */ else {
        if(value[e][property].toUpperCase() > value[e + 1][property].toUpperCase() && direction === true){
          value[e] = value[e + 1]
          value[e + 1] = tempPosition
        }
  
        
        if(value[e][property].toUpperCase() < value[e + 1][property].toUpperCase() && direction === false){
          value[e + 1] = value[e]
          value[e] = altTempPosition
        }
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
