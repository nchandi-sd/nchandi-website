import { Pipe, PipeTransform } from '@angular/core';
import { AdminMember } from './model/AdminMember';
import { Facility } from './model/Facility';
import { Panel } from './model/Panel';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(list: any[], property: any, value: string | number | boolean): any {

    console.log("thatList", list)
    console.log("that value", typeof value)
    if(!value || value === "" || (typeof value === "string" && value.length === 0)){
      console.log("nothing")
      return list
    } else if(property === 'facility'){
      return list.filter((item: Panel) => {
        if(typeof value === "string"){
          return item.facility.facilityName.toLowerCase().split(" ").join("").includes(value.toLowerCase().split(" ").join(""))
        }
      })
    } else if(property === "allMembers"){
      return list.filter((item) => {
        if(typeof value === "string"){
          if(item.allMembers.includes(value.split(" ").join("").trim().toLowerCase())){
            return item
          }
        }
      })
    } else if(property === "boardChampion"){
      return list.filter((item: Panel) => {
        if(typeof value === "string" && item.boardChampion.firstName && item.boardChampion.lastName){
          let fullName = item.boardChampion.firstName.toLowerCase() + item.boardChampion.lastName.toLowerCase()
          return fullName.includes(value.toLowerCase())
        }
      })
    } else if(property === "panelCoordinator"){
      return list.filter((item: Panel) => {
        if(typeof value === "string" && item.panelCoordinator.firstName && item.panelCoordinator.lastName){
          let fullName = item.panelCoordinator.firstName.toLowerCase() + item.panelCoordinator.lastName.toLowerCase()
          return fullName.includes(value.toLowerCase())
        }
      })
    } else if(property === "commitment") {
      return list.filter(item => item.commitment === value)
    } else if(property === "preferredContactMethod") {
      return list.filter(item => {
        if(value === "none"){
          return item.preferredContactMethod === undefined || item.preferredContactMethod === null
        } else {
          return item.preferredContactMethod === value
        }
      })
    } else if(property.includes("...")){
        let propertyParts = property.split("...")
        if(propertyParts.length === 2){
          console.log(2)
          return list.filter(item => {
            if(typeof value === "string" && item[propertyParts[0]][propertyParts[1]]){
              let filteredProperty = item[propertyParts[0]][propertyParts[1]].toLowerCase()
              return filteredProperty.includes(value.toLowerCase())
            }
          })
        }

        if(propertyParts.length === 3){
          return list.filter(item => {
            if(typeof value === "string" && item[propertyParts[0]][propertyParts[1]] && item[propertyParts[0]][propertyParts[2]]){
              let full = item[propertyParts[0]][propertyParts[1]].toLowerCase() + item[propertyParts[0]][propertyParts[2]].toLowerCase()
              console.log("full", full)
              return full.includes(value.toLowerCase())
            }
          })
        }
    } else if(value === 'yes') {
        return list.filter(item => item[property] === true)
    } else if(value === 'no') {
      return list.filter(item => item[property] === false)
    } else if(!isNaN(Number(value)) && Number(value) <= 5 && (typeof value === "string" && value.length !== 0)) {
      console.log("somehow a number", Number(value))
      return list.filter(item => item[property] === Number(value))
    } else if(property === "gender"){
      return list.filter(item => item.gender === value)
    } else {
        console.log("it's a string!")
        list = list.filter(item => item[property] !== null)
        return list.filter((item, index) => {
          if(typeof value === "string"){
            item.fullName = item.firstName + item.lastName
            if(typeof item.fullName === "string"){
              item.fullName = item.fullName.toLowerCase()
            }
            let theProperty: string = item[property]
            let nullValue = item[property] === null
            if(nullValue){
              list.splice(0, 1)
            }
            return theProperty.split(" ").join("").toLowerCase().includes(value.split(" ").join("").toLowerCase())
          }
        })
    }
  }

}
