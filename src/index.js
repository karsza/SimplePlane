import style from "./css/index.scss"
import Icon from "./assets/img/proba.png"

document.getElementById("login-button").addEventListener("click", openLoginForm);
document.getElementById("close").addEventListener("click", closeLoginForm);

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
    // clearSeats();
}

function openLastSummaryForm() {
    document.getElementById("ticketSummary").style.display = "block";
}
document.getElementById("closeticketSummary").addEventListener("click", closeLastSummaryForm);

function closeLastSummaryForm() {
    document.getElementById("ticketSummary").style.display = "none";
}

let myJson = require("./login.json");

var submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", function() {

    var u = document.getElementById("loginName").value;
    var p = document.getElementById("psw").value;
    var usersNo = Object.keys(myJson.users).length;
    var i;

    for (i = 0; i < usersNo; i++) {
        if ((myJson.users[i].login == u) && (myJson.users[i].pass == p)) {
            var guzik = document.getElementById("login-button");
            guzik.innerHTML = "Wyloguj " + myJson.users[i].name;
            console.log("haslo poprawne");
            closeLoginForm();
            return true;
        }
    }
    alert("haslo niepoprawne sprobuj ponownie");

});

function countDown() {
    document.getElementById("sekundy").removeClass("dissapear");
    let i = 30;
    const time = setInterval(function() {
        i--;
        var z = i % 60;

        document.getElementById("sekundy").innerHTML("Sesja wygasa za :" + z + " " + " sekund");
        if (i <= 0) {
            clearInterval(time);
            document.getElementById("zaloguj").innerHTML("Zaloguj");
            document.getElementById("sekundy").innerHTML("Sesja wygasla");
        }
    }, 1000);
}

// ------------wyszukaj
var search = document.getElementById("search-button");

var selectedNoOfPpl = 0;
var typeOfPlane = 0;


search.addEventListener("click", function() {
    openFirstSummaryForm();
    var selectedFrom = document.getElementById("from").value
    var selectedDest = document.getElementById("destination").value;
    selectedNoOfPpl = document.getElementById("people").value;


    document.getElementById("fromChosen").innerHTML = "Z " + selectedFrom;
    document.getElementById("WhereTo").innerHTML = "Do " + selectedDest;
    document.getElementById("calculatedPrice").innerHTML = selectedNoOfPpl;
    document.getElementById("total").innerHTML = "CENA jak napisze funcje :)";


})

var choose = document.getElementById("chooseSeat-button");

choose.addEventListener("click", function() {


    var selectedDest = document.getElementById("destination").value;
    if (selectedDest.localeCompare("Wroclawia") == 0) {
        typeOfPlane = "cityPlane";
        console.log(typeOfPlane);

        openChooseSeatsForm();
        if (document.getElementById(typeOfPlane).getAttribute("class") == "disappear") {
            document.getElementById(typeOfPlane).removeAttribute("class");
            setSeatNo();
        }
    } else if (selectedDest.localeCompare("Barcelony") == 0) {
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
    console.log(buttonArray);
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
                // console.log(selectedNoOfPpl);
                if (selectedNoOfPpl == 0) {
                    alert("jeszcze tylko 1 i koniec wybierania")
                }
            }
        });
    }

}

var lastSummary = document.getElementById("confirmSeat-button").addEventListener("click", openLastSummaryForm);