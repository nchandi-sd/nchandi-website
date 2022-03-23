import { Pipe, PipeTransform } from '@angular/core';
import { AdminMember } from './model/AdminMember';
import { Facility } from './model/Facility';
import { Panel } from './model/Panel';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(list: any, property: any, value: string | number | boolean): any {
    if(property === 'facility'){
      return list.filter((item: Panel) => {
        if(typeof value === "string"){
          return item.facility.facilityName.toLowerCase().split(" ").join("").includes(value.toLowerCase().split(" ").join(""))
        }
      })
    } else if(typeof list[property] === 'boolean') {
        return list.filter(item => item[property] === value)
    } else if(typeof list[property] === 'number') {
        return list.filter(item => item[property] === value)
    } else if(property === "boardChampion"){
      return list.filter((item: Panel) => {
        if(typeof value === "string"){
          let fullName = item.boardChampion.firstName.toLowerCase() + item.boardChampion.lastName.toLowerCase()
          return fullName.includes(value.toLowerCase())
        }
      })
    } else if(property === "panelCoordinator"){
      return list.filter((item: Panel) => {
        if(typeof value === "string"){
          let fullName = item.panelCoordinator.firstName.toLowerCase() + item.panelCoordinator.lastName.toLowerCase()
          return fullName.includes(value.toLowerCase())
        }
      })
    } else if(property.includes("...")){
      let propertyParts = property.split("...")


      if(propertyParts.length === 2 ){
        return list.filter(item => {
          if(typeof value === "string"){
            return item[propertyParts[0]][propertyParts[1]].toLowerCase().includes(value.toLowerCase())
          }
        })
      }

      if(propertyParts.length === 3){
        return list.filter(item => {
          if(typeof value === "string"){
            let full = item[propertyParts[0]][propertyParts[1]].toLowerCase() + item[propertyParts[0]][propertyParts[2]].toLowerCase()
            return full.includes(value.toLowerCase())
          }

        })
      }
    } else {
      return list.filter(item => item[property].includes(value))
    }
  }

}
