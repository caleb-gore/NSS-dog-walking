import { getCities, getWalkerCities, getWalkers } from "./database.js"

document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        
        if (itemClicked.id.startsWith("walker")) {
            const [,walkerId] = itemClicked.id.split("--")
            
            const filterWalkerCitiesbyWalker = () => {
                const assignments = walkerCities.filter(assignment => assignment.walkerId === parseInt(walkerId))
                return assignments
            }

            for (const walker of walkers) {
                if (walker.id === parseInt(walkerId)) {
                    const citiesServed = makeCityString(filterWalkerCitiesbyWalker())
                    window.alert(`${walker.name} services ${citiesServed}`)
                }
            }
        }
    }
)

const walkers = getWalkers()
const walkerCities = getWalkerCities()
const cities = getCities()

export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"
    return walkerHTML
}


export const makeCityString = (assignmentsArray) => {
    let cityString = ""
    for (const assignment of assignmentsArray) {
        for (const city of cities) {
            if (assignment.cityId === city.id && cityString === "") {
                cityString += city.name
            } else if (assignment.cityId === city.id && cityString !== "") {
                cityString += ' and ' + city.name
            }
        }
        
    }
    return cityString
}