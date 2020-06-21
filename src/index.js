import style from "./css/index.scss"

//uzupelnic ostatni formularz
// JSON sprawdzanie lotow cen 
// oblicznie ceny


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd;
document.getElementById("data").setAttribute("min", today);



var noOfExtraLuggage = 0;
document.getElementById("login-button").addEventListener("click", openLoginForm);
document.getElementById("close").addEventListener("click", closeLoginForm);
document.getElementById("confirmSeat-button").addEventListener("click", openLastSummaryForm);
document.getElementById("buy-button").addEventListener("click", openticketBoughtForm);
document.getElementById("closeLuggageForm").addEventListener("click", closeLuggageForm);
document.getElementById("noOfLuggageSubmit-button").addEventListener("click", function() {
    noOfExtraLuggage = document.getElementById("noExtraLuggage").value;
    if (ifExtraLuggageNotToLarge() == false) {
        alert("liczba dodatkowego bagazu nie moze przekroczyc liczby rezerwowanych biletow")
    } else {
        closeLuggageForm();
    }

})
document.getElementById("closeSummary").addEventListener("click", closeFirstSummaryForm);


function openLoginForm() {
    document.getElementById("myLoginForm").style.display = "block";
}

function closeLoginForm() {
    document.getElementById("myLoginForm").style.display = "none";
}

function openLuggageForm() {
    document.getElementById("luggageForm").style.display = "block";
    luggageNo = document.getElementById("noExtraLuggage").value;
}

function closeLuggageForm() {
    document.getElementById("luggageForm").style.display = "none";
}

function openFirstSummaryForm() {
    document.getElementById("myFormSummary").style.display = "block";
}

function closeFirstSummaryForm() {
    document.getElementById("myFormSummary").style.display = "none";
}

function openChooseSeatsForm() {
    document.getElementById("chooseSeats").style.display = "block";

}
document.getElementById("closeSeats").addEventListener("click", closeChooseSeatsForm);

function closeChooseSeatsForm() {
    document.getElementById("chooseSeats").style.display = "none";
    clearSeats();
}

function openLastSummaryForm() {
    var luggage = "";
    if (extraLuggage == true) {
        luggage = "TAK";
    } else {
        luggage = "NIE";
    }


    document.getElementById("ticketSummary").style.display = "block";

    var selectedFrom = document.getElementById("from").value;
    var selectedDest = document.getElementById("destination").value;

    selectedNoOfPpl = document.getElementById("people").value;

    document.getElementById("fromToConfirmed").innerHTML = selectedFrom + " -->" + selectedDest;
    document.getElementById("depTime").innerHTML += time;
    document.getElementById("noTickets").innerHTML += selectedNoOfPpl;
    document.getElementById("moreLuggage").innerHTML += luggage;

    var summaryPrice = totalPrice();
    document.getElementById("totalPrice").innerHTML += summaryPrice;

}
document.getElementById("closeticketSummary").addEventListener("click", closeLastSummaryForm);

function closeLastSummaryForm() {
    document.getElementById("ticketSummary").style.display = "none";
}

function openticketBoughtForm() {
    document.getElementById("ticketBought").style.display = "block";
}
document.getElementById("closeTicketBought").addEventListener("click", closeticketBoughtForm);

function closeticketBoughtForm() {
    document.getElementById("ticketBought").style.display = "none";
    logOut();

}
// sprawdzenie loginu
let myJson = require("./assets/login.json");

var submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", function() {

    var u = document.getElementById("loginName").value;
    var p = document.getElementById("psw").value;
    var usersNo = Object.keys(myJson.users).length;
    var i;

    for (i = 0; i < usersNo; i++) {
        if ((myJson.users[i].login == u) && (myJson.users[i].pass == p)) {
            var button = document.getElementById("login-button");
            button.innerHTML = "Wyloguj " + myJson.users[i].name;
            closeLoginForm();
            // countDown();
            return true;
        }
    }
    alert("haslo lub login niepoprawne sprobuj ponownie");

});
// // var submitButton = document.getElementById("submit-button");
// // submitButton.addEventListener("click", function() {

// var dest = document.getElementById("destination").value;
// var p = document.getElementById("psw").value;
// var usersNo = Object.keys(myJson.users).length;
// var i;

// for (i = 0; i < usersNo; i++) {
//     if ((myJson.users[i].login == u) && (myJson.users[i].pass == p)) {
//         var button = document.getElementById("login-button");
//         button.innerHTML = "Wyloguj " + myJson.users[i].name;
//         closeLoginForm();
//         return true;
//     }
// }
// alert("haslo lub login niepoprawne sprobuj ponownie");

// });

// function countDown() {
//     var sek = document.getElementById("seconds");
//     sek.removeAttribute("class");
//     let i = 60;
//     const time = setInterval(function() {
//         i--;
//         var z = i % 60;

//         sek.innerHTML = ("Sesja wygasa za :" + z + " " + " sekund");
//         if (i <= 0) {
//             clearInterval(time);
//             sek.innerHTML = ("Sesja wygasla");
//             logOut();
//         }
//     }, 1000);
// }

// ------------wyszukaj
var search = document.getElementById("search-button");


var selectedNoOfPpl = 0;
var typeOfPlane = 0;
var luggageNo = 0;
var selectedDate = document.getElementById("data").value;
var time = 0;


search.addEventListener("click", function() {
    var loginButton = document.getElementById("login-button").innerHTML;
    if (loginButton == "Zaloguj") {
        alert("Wyszukiwanie dostepne wylacznie po zalogowaniu")
        openLoginForm();
    } else {

        openFirstSummaryForm();
        var selectedFrom = document.getElementById("from").value
        var selectedDest = document.getElementById("destination").value;
        selectedDate = document.getElementById("data").value;
        selectedNoOfPpl = document.getElementById("people").value;


        document.getElementById("fromTo").innerHTML = selectedFrom + " -->" + selectedDest;
        document.getElementById("noPpl").innerHTML += selectedNoOfPpl;
        document.getElementById("initialDate").innerHTML = selectedDate;

    }
})

var choose = document.getElementById("chooseSeat-button");

let myJsonFlights = require("./assets/flights.json");
var flightsNo = Object.keys(myJsonFlights.flights).length;
var ticketPrice = 0;


choose.addEventListener("click", function() {

    var selectedDest = document.getElementById("destination").value;

    for (var i = 0; i < flightsNo; i++) {
        if ((myJsonFlights.flights[i].destination).localeCompare(selectedDest) == 0) {
            ticketPrice = myJsonFlights.flights[i].price;
            typeOfPlane = myJsonFlights.flights[i].plane;
            time = myJsonFlights.flights[i].time;

            if ((extraLuggage() == true) && (document.getElementById("noExtraLuggage").value == 0)) {
                openLuggageForm();
            } else {

                openChooseSeatsForm();
                if (document.getElementById(typeOfPlane).getAttribute("class") == "disappear") {
                    document.getElementById(typeOfPlane).removeAttribute("class");
                    setSeatNo();
                }
            }
        } else continue;

    }

})

function setSeatNo() {
    document.getElementById("time").innerHTML += time;

    const buttonArray = document.getElementsByTagName("rect");
    var seatsArray = Array.from(buttonArray);

    for (let i = 1; i < seatsArray.length; i++) {
        seatsArray[i].setAttribute("id", `_${i + 1}`);

        document.getElementById(seatsArray[i].id).addEventListener("click", function() {

            if (document.getElementById(this.id).getAttribute("class") == "occupied") {
                document.getElementById(this.id).removeAttribute("style");
                document.getElementById(this.id).setAttribute("class", "free");
                selectedNoOfPpl = selectedNoOfPpl + 1;


            } else {
                if ((selectedNoOfPpl > 0) && (document.getElementById(this.id).hasAttribute("style"))) {
                    document.getElementById(this.id).removeAttribute("style");
                    document.getElementById(this.id).setAttribute("class", "occupied");
                    selectedNoOfPpl = selectedNoOfPpl - 1;
                } else {
                    alert("nie mozesz zaznaczyc wiecej miejsc niz rezerwowanych biletow");

                }

            }

        })
    }
}

function clearSeats() {
    const buttonArray = document.getElementsByTagName("rect");
    var seatsArray = Array.from(buttonArray);


    for (let i = 1; i < seatsArray.length; i++) {
        if (document.getElementById("_" + (i + 1)).getAttribute("class") == "occupied") {
            document.getElementById("_" + (i + 1)).removeAttribute("style");
            document.getElementById("_" + (i + 1)).setAttribute("class", "free");
            selectedNoOfPpl = 0;
        }
    }
}

function logOut() {
    var button = document.getElementById("login-button");
    button.innerHTML = "Wyloguj";
    location.reload();
}

function extraLuggage() {
    var additionalBag = document.getElementById("extraLuggage");

    if (additionalBag.checked == true) {
        return true
    } else {
        return false;
    }
}

function ifExtraLuggageNotToLarge() {
    var no = document.getElementById("noExtraLuggage").value
    if (no > selectedNoOfPpl) {
        return false;
    } else {
        return true;
    }
}

function totalPrice() {
    var sum = 0;
    var extra = 0;
    if (extraLuggage() == true) {
        extra = (0.5 * noOfExtraLuggage);
    } else(extra = 0);
    sum = (ticketPrice * selectedNoOfPpl) + (ticketPrice * extra);
    return sum;


}