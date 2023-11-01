var fs = require("fs")

var startYear = 2023
var startMonth = 0
var allPossibleOrientationDates = []
var id = 0

var firstDayNumberOfMonth = (startMonth) => {
    return new Date(startYear, startMonth, 1).getDay()
}

var orientationFullDate = (startYear, startMonth, startWeek, startDay) => {
    if(startWeek === 1){
        if(startDay === firstDayNumberOfMonth(startMonth)) {
            return new Date(startYear, startMonth, 1)
        } else if(startDay > firstDayNumberOfMonth(startMonth)) {
            return new Date(startYear, startMonth, 1 + (startDay - firstDayNumberOfMonth(startMonth)))
        } else {
            return new Date(startYear, startMonth,  8 - (firstDayNumberOfMonth(startMonth) - startDay))
        }
    } else if(startWeek === 2) {

        if(startDay === firstDayNumberOfMonth(startMonth)) {
            return new Date(startYear, startMonth, 8)
        } else if(startDay > firstDayNumberOfMonth(startMonth)) {
            return new Date(startYear, startMonth, 8 + (startDay - firstDayNumberOfMonth(startMonth)))
        } else {
            return new Date(startYear, startMonth,  15 - (firstDayNumberOfMonth(startMonth) - startDay))
        }
    } else if(startWeek === 3) {
        if(startDay === firstDayNumberOfMonth(startMonth)) {
            return new Date(startYear, startMonth, 15)
        } else if(startDay > firstDayNumberOfMonth(startMonth)) {
            return new Date(startYear, startMonth, 15 + (startDay - firstDayNumberOfMonth(startMonth)))
        } else {
            return new Date(startYear, startMonth,  22 - (firstDayNumberOfMonth(startMonth) - startDay))
        }
    } else if(startWeek === 4) {
        if(startDay === firstDayNumberOfMonth(startMonth)) {
            return new Date(startYear, startMonth, 22)
        } else if(startDay > firstDayNumberOfMonth(startMonth)) {
            return new Date(startYear, startMonth, 22 + (startDay - firstDayNumberOfMonth(startMonth)))
        } else {
            return new Date(startYear, startMonth,  29 - (firstDayNumberOfMonth(startMonth) - startDay))
        }
    } else if(startWeek === 5) {
        if(startDay === firstDayNumberOfMonth(startMonth)) {
            let lastDateNumberOfMonth = new Date(startYear, startMonth + 1, 0).getDate()
            if(lastDateNumberOfMonth >= 29){
                return new Date(startYear, startMonth, 29)
            } else {
                return null
            }
        } else if(startDay > firstDayNumberOfMonth(startMonth)) {
            let lastDateNumberOfMonth = new Date(startYear, startMonth + 1, 0).getDate()
            console.log("lastDateNumberOfMonth", lastDateNumberOfMonth)
            if(29 + (startDay - firstDayNumberOfMonth(startMonth)) > lastDateNumberOfMonth) {
                return null
            } else {
                return new Date(startYear, startMonth, 29 + (startDay - firstDayNumberOfMonth(startMonth)))
            }
        } else {
            let lastDateNumberOfMonth = new Date(startYear, startMonth + 1, 0).getDate()
            if(36 - (firstDayNumberOfMonth(startMonth) - startDay) > lastDateNumberOfMonth) {
                return null
            } else {
                return new Date(startYear, startMonth, 36 - (firstDayNumberOfMonth(startMonth) - startDay))
            }
        }
    }
}

function meetingGenerator(){
    while(startYear < 2050) {
        while(startMonth < 12){
            var startWeek = 3
            var startDay = 6
            var orientation = {
                id: id,
                name: orientationFullDate(startYear, startMonth, startWeek, startDay).toDateString(),
                type: "Committee Meeting",
                date: "9:00am"
            }
    
            allPossibleOrientationDates.push(orientation)
            startMonth++
            id++
        }
        startMonth = 0
        startYear++
    }
    
    return allPossibleOrientationDates
}

export default meetingGenerator()
