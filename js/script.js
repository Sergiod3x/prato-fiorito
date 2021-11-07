//DICHIARAZIONE VARIABILI
var checkClick = document.getElementsByClassName("check-box");
// var reset = document.getElementById('danger');
var outOldPoints = document.getElementById('old-point');
var outPoints = document.getElementById('points');
var outNumberMine = document.getElementById('mine');
var mine = [];
var difficulty = (prompt('Con quale difficoltà vuoi giocare: Facile, Media, Difficile?')).toUpperCase();
var numberMine;
var points = 0;
var oldPoints = 0;

function RefreshWindow() {
    window.location.reload(true);
}

function undermine() {
    // mine = [];
    //CREO LE MINE E CONTROLLO CHE NON SI CREINO DOPPIONI;
    for (var x = 1; x <= numberMine; x++) {
        var mina = (Math.floor(Math.random() * 100) + 1);
        for (var y = 0; y <= mine.length; y++) {
            if (mina === mine[y]) {
                mina = (Math.floor(Math.random() * 100) + 1);
                y = 0;
            }
        }
        mine.push(mina);
    }

}

//INIZIO
if (isNaN(sessionStorage.getItem("oldPoints")) || sessionStorage.getItem("oldPoints") == null) {
    outOldPoints.innerHTML += oldPoints;
} else {
    oldPoints = sessionStorage.getItem("oldPoints");
    outOldPoints.innerHTML += oldPoints;
}

outPoints.innerHTML += points;
//Controllo che venga inserito uno dei tre livelli di dificioltà disponibili
while ((difficulty != "FACILE") && (difficulty != "MEDIA") && (difficulty != "DIFFICILE") && (difficulty != "")) {
    alert("Scegli uno dei tre livelli di difficoltà tra Facile, Medio e Difficile ");
    difficulty = (prompt('Con quale difficoltà vuoi giocare: Facile, Media, Difficile?')).toUpperCase();

}

// CREO LE MINE IN BASE ALLA DIFFICOLTA SCELTA DALL'UTTENTE.
switch (difficulty) {
    case "Facile":
        numberMine = 16;
        break;
    case "Media":
        numberMine = 32;
        break;
    case "Difficile":
        numberMine = 64;
        break;
    default:
        numberMine = 16;
}
outNumberMine.innerHTML += numberMine;

undermine();

//DO IL VALORE A TUTTI I BOX(IN QUESTO CASO A 1 A 100)COSI DA NON DOVERLI ASSEGNARE SINGOLARMENTE
for (var t = 0; t < checkClick.length; t++) {
    var h = t + 1;
    checkClick[t].value = h;
}

// reset.onclick = function () {
//     alert('reset');
//     undermine();
// }


//CREO UN CICLO COSì DA PRENDERE IN CONSIDERAZIONE TUTTI I BOX
for (var z = 0; z < checkClick.length; z++) {

    console.log(checkClick[z]);
    checkClick[z].onclick = function () {

        //10 righe e 10 colonne vengono trattate come 100 cellete di seguito, delimitate dalla prima e dall'ultima colonna con i valori limite 1-10; 11-20; 21-30; 31-40 ecc 
        var w = parseInt(this.value);
        var proximityZone = [w - 11, w - 10, w - 9, w - 1, w + 1, w + 9, w + 10, w + 11];
        var lastColumn = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        var firstColumn = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91];


        var adjacent = 0;

        if (mine.includes(w)) {

            for (var r = 0; r < checkClick.length; r++) {
                if (mine.includes(parseInt(checkClick[r].value))) {
                    checkClick[r].parentNode.classList.add("color-red");
                }
                checkClick[r].style.display = "none";
            }
            alert('HAI PERSO!!!');
            RefreshWindow();
        }
        else {
            for (var p = 0; p < proximityZone.length; p++) {
                if (mine.includes(proximityZone[p])) {
                    //devo evitare che la prima e l'ultima colonna vengano trattate come adiacenti
                    if ((lastColumn.includes(proximityZone[p]) && firstColumn.includes(w)) || (firstColumn.includes(proximityZone[p]) && lastColumn.includes(w))) { } else {
                        adjacent = adjacent + 1;
                    }
                }
            }

            if (adjacent < 1) {
                this.parentNode.classList.add("color-yellow");
                this.style.display = "none";
                points = points + 1;


            } else if (adjacent > 0 && adjacent < 8) {
                this.parentNode.classList.add("color-yellow");
                this.parentNode.innerHTML = adjacent;
                points = points + 1;
            }
        }

        outPoints.innerHTML = points;
        if (points === (100 - numberMine)) {
            alert('HAI VINTO!');
            // RefreshWindow();
        }
        sessionStorage.setItem("oldPoints", points);

    };
}



