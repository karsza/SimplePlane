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

search.addEventListener("click", function() {
        openFirstSummaryForm();
        var selectedFrom = document.getElementById("from").value
        var selectedDest = document.getElementById("destination").value;
        selectedNoOfPpl = document.getElementById("people").value;

        document.getElementById("fromChosen").innerHTML = "Z " + selectedFrom;
        document.getElementById("WhereTo").innerHTML = "Do " + selectedDest;
        document.getElementById("calculatedPrice").innerHTML = selectedNoOfPpl;
        document.getElementById("total").innerHTML = "CENA jak napisze funcje :)";
        console.log(selectedNoOfPpl);
    })
    // let flightData = document.getElementById("wyszukaj")
console.log(selectedNoOfPpl);

var choose = document.getElementById("chooseSeat-button");

choose.addEventListener("click", function() {
    openChooseSeatsForm();
})
const seatsArray = ["_11", "_12", "_13", "_14", "_15", "_16", "_17", "_18", "_19", "_20", "_21", "_22", "_23", "_24", "_25", "_26", "_27", "_28", "_29", "_31", "_32"];

for (var i = 0; i < seatsArray.length; i++) {
    // console.log(seatsArray[i]);

    document.getElementById(seatsArray[i]).addEventListener("click", function() {

        if (document.getElementById(this.id).getAttribute("class") == "occupied") {
            document.getElementById(this.id).removeAttribute("style");
            document.getElementById(this.id).setAttribute("class", "free");
            selectedNoOfPpl = selectedNoOfPpl + 1;


        } else {
            document.getElementById(this.id).removeAttribute("style");
            document.getElementById(this.id).setAttribute("class", "occupied");
            selectedNoOfPpl = selectedNoOfPpl - 1;
            console.log(selectedNoOfPpl);
            if (selectedNoOfPpl == 0) {
                alert("juz wiecej nie wybnieraj")
            }
        }
    });
}

// usunac jesli nie bedzie dzialalo
// function clearSeats() {
//     const seatsArray = ["_11", "_12", "_13", "_14", "_15", "_16", "_17", "_18", "_19", "_20", "_21", "_22", "_23", "_24", "_25", "_26", "_27", "_28", "_29", "_31", "_32"];

//     const seatsToBeCleared = seatsArray;
//     console.log(seatsArray);
//     for (var i = 0; i < seatsToBeCleared.length; i++) {
//         var id = document.getElementById(seatsToBeCleared[i]);
//         console.log(id);
//         document.getElementById(this.id).removeAttribute("style");
//         document.getElementById(this.id).setAttribute("class", "free");
//     }
// }