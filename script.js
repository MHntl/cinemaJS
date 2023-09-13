
const container = document.querySelector(".container")
const infoText = document.querySelector(".infoText")
const movie = document.querySelector("#movie")
const seats = document.querySelectorAll(".seat:not(.reserved)")

//!Storage 
const saveToDatabase = (seatIndexData) => {
    localStorage.setItem("selectedIndex", JSON.stringify(seatIndexData))
    localStorage.setItem("movieIndex", JSON.stringify(movie.selectedIndex))
}

//!Read From Storage
const getSeatsDataFromDatabase = () => {
    const dbSelectedMovie = JSON.parse(localStorage.getItem("movieIndex"))
    if (dbSelectedMovie) {
        movie.selectedIndex = dbSelectedMovie
    }
    const dbSelectSeats = JSON.parse(localStorage.getItem("selectedIndex"))
    if (dbSelectSeats !== null && dbSelectSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (dbSelectSeats.indexOf(index) > -1) {
                seat.classList.add("selected")
            }
        })
    }
}
getSeatsDataFromDatabase()

//--------
const calculateTotal = () => {
    const selectedSeats = container.querySelectorAll(".seat.selected")

    //!Nodelistten to Array  
    const allSeatsArray = []
    const allSelectedSeatsArray = []

    seats.forEach(seat => {
        allSeatsArray.push(seat)
    });

    selectedSeats.forEach((selectedSeat) => {
        allSelectedSeatsArray.push(selectedSeat)
    })
    //-----
    let selectedIndex = allSelectedSeatsArray.map((allSelectedSeat) => {
        return allSeatsArray.indexOf(allSelectedSeat)
    })

    //--------
    //!Second Method
    //const allSeatsArray = Array.from(seats)
    //-----

    let selectedSeatsCount = container.querySelectorAll(".selected.seat").length
    if (selectedSeatsCount > 0) {
        infoText.style.display = "block"

    } else {
        infoText.style.display = "none"
    }
    let price = movie.value
    let total = price * selectedSeatsCount
    infoText.innerHTML = `The calculated price for <span>${selectedSeatsCount}</span> seat(s) is <span>${total}</span> $`
    saveToDatabase(selectedIndex)

}
calculateTotal()

container.addEventListener("click", (mouseEvent) => {
    if (mouseEvent.target.offsetParent.classList.contains("seat") && !mouseEvent.target.offsetParent.classList.contains("reserved")) {
        mouseEvent.target.offsetParent.classList.toggle("selected")
        calculateTotal(mouseEvent)
    }
})

movie.addEventListener("change", () => {
    calculateTotal()
})













