import style from "./css/index.scss"

// Warszawa bo sie nie pojawia
// JSON sprawdzanie lotow cen 
// oblicznie ceny
// checkbox uzycie
// zeby nie mozna bylo wiecej wybrac miejsc niz jest wybranych buletow

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

var selectedDate = document.getElementById("data");
console.log(selectedDate);



document.getElementById("login-button").addEventListener("click", openLoginForm);
document.getElementById("close").addEventListener("click", closeLoginForm);
document.getElementById("confirmSeat-button").addEventListener("click", openLastSummaryForm);
document.getElementById("buy-button").addEventListener("click", openticketBoughtForm);

function openLoginForm() {
    document.getElementById("myLoginForm").style.display = "block";
}

function closeLoginForm() {
    document.getElementById("myLoginForm").style.display = "none";
}

function openFirstSummaryForm() {
    document.getElementById("myFormSummary").style.display = "block";

}
document.getElementById("closeSummary").addEventListener("click", closeFirstSummaryForm);

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

    document.getElementById("ticketSummary").style.display = "block";

    var selectedFrom = document.getElementById("from").value;
    var selectedDest = document.getElementById("destination").value;

    selectedNoOfPpl = document.getElementById("people").value;

    document.getElementById("fromTo").innerHTML += selectedFrom + " -->" + selectedDest;
    document.getElementById("calculatedPrice").innerHTML = selectedNoOfPpl;
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
            countDown();
            return true;
        }
    }
    alert("haslo lub login niepoprawne sprobuj ponownie");

});
// let myJsonFlights = require("./assets/flights.json");

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

function countDown() {
    var sek = document.getElementById("seconds");
    sek.removeAttribute("class");
    let i = 60;
    const time = setInterval(function() {
        i--;
        var z = i % 60;

        sek.innerHTML = ("Sesja wygasa za :" + z + " " + " sekund");
        if (i <= 0) {
            clearInterval(time);
            sek.innerHTML = ("Sesja wygasla");
            logOut();
        }
    }, 1000);
}

// ------------wyszukaj
var search = document.getElementById("search-button");

var selectedNoOfPpl = 0;
var typeOfPlane = 0;


search.addEventListener("click", function() {
        var loginButton = document.getElementById("login-button").innerHTML;
        if (loginButton == "Zaloguj") {
            alert("Wyszukiwanie dostepne wylacznie po zalogowaniu")
            openLoginForm();
        } else {

            openFirstSummaryForm();
            var selectedFrom = document.getElementById("from").value
            var selectedDest = document.getElementById("destination").value;
            selectedNoOfPpl = document.getElementById("people").value;

            document.getElementById("fromTo").innerHTML = selectedFrom + " -->" + selectedDest;
            document.getElementById("calculatedPrice").innerHTML = selectedNoOfPpl;

        }
    })
    // koniec wyszukiwania

var choose = document.getElementById("chooseSeat-button");

choose.addEventListener("click", function() {

    var selectedDest = document.getElementById("destination").value;
    if (selectedDest.localeCompare("Wroclaw") == 0) {
        typeOfPlane = "cityPlane";
        console.log(typeOfPlane);

        openChooseSeatsForm();
        if (document.getElementById(typeOfPlane).getAttribute("class") == "disappear") {
            document.getElementById(typeOfPlane).removeAttribute("class");
            setSeatNo();
        }
    } else if (selectedDest.localeCompare("Barcelona") == 0) {
        typeOfPlane = "continentalPlane";
        console.log(typeOfPlane);

        openChooseSeatsForm();
        if (document.getElementById(typeOfPlane).getAttribute("class") == "disappear") {
            document.getElementById(typeOfPlane).removeAttribute("class");
            setSeatNo();

        }
    }
    if (selectedDest.localeCompare("Tokio") == 0) {
        typeOfPlane = "intercontinentalPlane";
        console.log(typeOfPlane);

        openChooseSeatsForm();
        if (document.getElementById(typeOfPlane).getAttribute("class") == "disappear") {
            document.getElementById(typeOfPlane).removeAttribute("class");
            setSeatNo();

        }
    }

})

function setSeatNo() {

    const buttonArray = document.getElementsByTagName("rect");
    var seatsArray = Array.from(buttonArray);

    for (let i = 1; i < seatsArray.length; i++) {
        seatsArray[i].setAttribute("id", `_${i + 1}`);

        document.getElementById(seatsArray[i].id).addEventListener("click", function() {
            console.log(seatsArray[i].id);

            if (document.getElementById(this.id).getAttribute("class") == "occupied") {
                document.getElementById(this.id).removeAttribute("style");
                document.getElementById(this.id).setAttribute("class", "free");
                selectedNoOfPpl = selectedNoOfPpl + 1;


            } else {
                document.getElementById(this.id).removeAttribute("style");
                document.getElementById(this.id).setAttribute("class", "occupied");
                selectedNoOfPpl = selectedNoOfPpl - 1;

                if (selectedNoOfPpl == 0) {
                    alert("przejdz do podsumowania");
                }
            }
        });
    }

}

function clearSeats() {
    const buttonArray = document.getElementsByTagName("rect");
    console.log(buttonArray);
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
        console.log("zaznaczona");
    } else {
        console.log("nie zaznaczone");
    }
}