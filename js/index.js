$.getJSON("./login.json", function(json) {
        console.log(json);
    })
    // window.onload = populateSelect();


// function populateSelect() {
//     var xhr = new XMLHttpRequest(),
//         method = 'GET',
//         overrideMimeType = 'application/json',
//         url = 'dest.json';

//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//             var destination = JSON.parse(xhr.responseText);

//             var element = $("#skad");
//             for (var i = 0; i < destination.length; i++) {
//                 element.html + element.html + '<option value=' + destination[i].z +
//                     '">';
//             }
//         }
//     };
//     xhr.open(method, url, true);
//     xhr.send();
// }


let loty = [];

const wyszukajLot = (e) => {
    // e.preventDefault();
    let lot = {
        z: $("#skad").val(),
        do: $("#dokad").val(),
        wylot: $("#wylot").val(),
        powrot: $("#powrot").val(),
        liczba: $("#liczba").val()
    }
    loty.push(lot);

    console.warn('added', { loty });
}
$(document).ready(() => {
    $("#wyszukaj").click(function() {
        wyszukajLot()
        console.log("clicked");
    })
})

$(".openmodale").click(function(e) {
    e.preventDefault();
    $(".modale").addClass("opened");
});
$(".closemodale").click(function(e) {
    e.preventDefault();
    $(".modale").removeClass("opened");
});


var name = "u";
var pass = "1";

$("#btn_ingresar").click();


$("#btn_ingresar").click(function checkLogin() {
    let u = $("#u").val();
    let p = $("#p").val();

    if (u == name && p == pass) {
        $(".modale").removeClass("opened");
        var zaloguj = $("#zaloguj");
        zaloguj.html("Wyloguj");
        odliczajCzas();
    } else {
        alert("nieprawidlowy login lub haslo spróbuj ponownie");
    }
})

function odliczajCzas() {
    $("#sekundy").removeClass("dissapear");
    let i = 30;
    const time = setInterval(function() {
        i--;
        var z = i % 60;

        $("#sekundy").html("Sesja wygasa za :" + z + " " + " sekund");
        if (i <= 0) {
            clearInterval(time);
            $("#zaloguj").html("Zaloguj");
            $("#sekundy").html("Sesja wygasla");
        }
    }, 1000);
}

// fetch("/dest.json")
//     .then(function(resp) {
//         return resp.json();
//     })
//     .then(function(dest) {
//         console.log(dest)
//     });