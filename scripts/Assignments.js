import { getPets, getWalkers } from "./database.js"

// Get copy of state for use in this module
const pets = getPets()
const walkers = getWalkers()


// Function whose responsibility is to find the walker assigned to a pet
const findPetWalker = (pet, allWalkers) => {
    let petWalker = null

    for (const walker of allWalkers) {
        if (walker.id === pet.walkerId) {
            petWalker = walker
        }
    }

    return petWalker
}

export const Assignments = () => {
    let assignmentHTML = ""
    assignmentHTML = "<ul>"

    for (const currentPet of pets) {
        const currentPetWalker = findPetWalker(currentPet, walkers)
        assignmentHTML += `
            <li>
                ${currentPet.name} is being walked by
                ${currentPetWalker.name} in ${currentPetWalker.city}
            </li>
        `
    }

    assignmentHTML += "</ul>"

    return assignmentHTML
}

document.addEventListener("click", (clickEvent) => {
    const itemClicked = clickEvent.target
    if (itemClicked.id.startsWith("pet")) {
        const [, petId] = itemClicked.id.split("--")

        for (const currentPet of pets) {
            if (currentPet.id === parseInt(petId)) {
                const walker = findPetWalker(currentPet, walkers)
                window.alert(`${currentPet.name} is being walked by ${walker.name}`)
            }
        }
    }
})

