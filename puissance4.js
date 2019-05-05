const arr1 = document.querySelectorAll("#col1 div");
const arr2 = document.querySelectorAll("#col2 div");
const arr3 = document.querySelectorAll("#col3 div");
const arr4 = document.querySelectorAll("#col4 div");
const arr5 = document.querySelectorAll("#col5 div");
const arr6 = document.querySelectorAll("#col6 div");
const arr7 = document.querySelectorAll("#col7 div");
const colonne1 = document.querySelector("#col1");
const colonne2 = document.querySelector("#col2");
const colonne3 = document.querySelector("#col3");
const colonne4 = document.querySelector("#col4");
const colonne5 = document.querySelector("#col5");
const colonne6 = document.querySelector("#col6");
const colonne7 = document.querySelector("#col7");
const joueur = document.querySelector(".joueur");
const resultat = document.querySelector(".resultat");
const humain = document.querySelector(".humain");
const ordi = document.querySelector(".ordi");
const ai = document.querySelector(".ai");
const fondjeu = document.querySelector(".fondjeu");
const money = document.querySelector(".money");
const coin = document.querySelector(".coin");
const replay = document.querySelector("#replay");
const arrG = [arr1, arr2, arr3, arr4, arr5, arr6, arr7];
const titre = document.querySelector("h1");
const bandeauColor = ["#ff0000","#ffff00","#40ff00","#1a1aff"];
const nav = document.querySelector("nav");
var c = 0;
var rempli = false;
var count = 0;
var couleur = "rouge";
var countColor;
var winR = false;
var winJ = false;
var plein = 0;
var mode = "1vs2";
var counter = false;
var countered = false;
var coup, other;

humain.addEventListener("click", function () {

    mode = "1vs2";
    ordi.classList.remove("active");
    ai.classList.remove("active");
    humain.classList.add("active");
    reset();

})

ordi.addEventListener("click", function () {

    mode = "1vscpu";
    humain.classList.remove("active");
    ai.classList.remove("active");
    ordi.classList.add("active");
    reset();

})


ai.addEventListener("click", function () {

    mode = "1vsai";
    humain.classList.remove("active");
    ordi.classList.remove("active");
    ai.classList.add("active");
    reset();

})


replay.addEventListener("click", function () {

    reset();
})


colonne1.addEventListener("click", function () {

    pion(arr1);

})

colonne2.addEventListener("click", function () {

    pion(arr2);

})
colonne3.addEventListener("click", function () {

    pion(arr3);

})
colonne4.addEventListener("click", function () {

    pion(arr4);

})
colonne5.addEventListener("click", function () {

    pion(arr5);

})
colonne6.addEventListener("click", function () {

    pion(arr6);

})
colonne7.addEventListener("click", function () {

    pion(arr7);

})

function gagnerCol() {

    for (let i = arrG.length - 1; i >= 0; i--) {
        for (let j = arrG[i].length - 1; j >= 0; j--) {

            verif(i, j, "col");
        }
        count = 0;
    }
}

function gagnerRow() {

    for (let j = arrG[0].length - 1; j >= 0; j--) {
        for (let i = arrG.length - 1; i >= 0; i--) {

            verif(i, j, "row");

        }
        count = 0;
    }
}

function gagnerDiag() {

    // for (let i = 0, j = 3, fin = false; fin != true ; i++, j--) {
    //     // console.log(i);
    //     // console.log(j);
    //         i == 3 && j == 0 ? fin = true : false;
    // }

    let Ylength = arrG.length;
    let Xlength = arrG[0].length;
    let maxLength = Math.max(Xlength, Ylength);
    let temp;
    for (let i = 0; i <= 2 * (maxLength - 1); ++i) {
        temp = [];
        for (let j = Ylength - 1; j >= 0; --j) {
            var x = i - j;
            if (x >= 0 && x < Xlength) {
                temp.push(arrG[j][x]);
            }
        }
        if (temp.length > 0) {
            for (let k = 0; k < temp.length; ++k) {
                // console.log(temp[k]);


                if (temp[k].classList.contains("rouge")) {
                    if (countColor == "rouge") {
                        count++;
                    } else if (countColor == "jaune") {
                        count = 1;
                    }
                    countColor = "rouge";
                } else if (temp[k].classList.contains("jaune")) {
                    if (countColor == "jaune") {
                        count++;
                    } else if (countColor == "rouge") {
                        count = 1;
                    }
                    countColor = "jaune";
                } else {
                    temp[k].classList.contains("blanc") ? count = 0 : true;
                }

                if (count >= 4 && countColor == "rouge") {
                    winR = true;
                    gagnerjeuxR();
                } else if (count >= 4 && countColor == "jaune") {
                    winJ = true;
                    gagnerjeuxJ();
                }
            }
            count = 0;
        }
    }


    for (let i = 0; i <= 2 * (maxLength - 1); ++i) {
        temp = [];
        for (let j = Ylength - 1; j >= 0; --j) {
            var x = i - (Ylength - j);
            if (x >= 0 && x < Xlength) {
                temp.push(arrG[j][x]);
            }
        }
        if (temp.length > 0) {
            for (let k = 0; k < temp.length; ++k) {
                // console.log(temp[k]);


                if (temp[k].classList.contains("rouge")) {
                    if (countColor == "rouge") {
                        count++;
                    } else if (countColor == "jaune") {
                        count = 1;
                    }
                    countColor = "rouge";
                } else if (temp[k].classList.contains("jaune")) {
                    if (countColor == "jaune") {
                        count++;
                    } else if (countColor == "rouge") {
                        count = 1;
                    }
                    countColor = "jaune";
                } else {
                    temp[k].classList.contains("blanc") ? count = 0 : true;
                }

                if (count >= 4 && countColor == "rouge") {
                    winR = true;
                    gagnerjeuxR();
                } else if (count >= 4 && countColor == "jaune") {
                    winJ = true;
                    gagnerjeuxJ();
                }
            }
            count = 0;
        }
    }


}



function pion(array) {

    if (winR == false && winJ == false) {
        if (mode == "1vs2") {

            for (let i = array.length - 1; i >= 0; i--) {

                if (array[i].classList.contains("blanc") && rempli == false) {
                    array[i].classList.remove("blanc");
                    array[i].classList.add(couleur);
                    rempli = true;
                    couleur == "rouge" ? couleur = "jaune" : couleur = "rouge";
                    tourJoueur();

                }
            }
            rempli = false;
            gagnerCol();
            gagnerRow();
            gagnerDiag();

        } else if (mode == "1vsai") {
            if (couleur == "rouge") {

                for (let i = array.length - 1; i >= 0; i--) {

                    if (array[i].classList.contains("blanc") && rempli == false && couleur == "rouge") {
                        array[i].classList.remove("blanc");
                        array[i].classList.add(couleur);
                        rempli = true;
                        couleur == "rouge" ? couleur = "jaune" : couleur = "rouge";
                    }
                }
                rempli = false;
                gagnerCol();
                gagnerRow();
                gagnerDiag();

                if(winR != true && winJ != true) {
                    setTimeout(function () {
                        console.log(counter);
                        console.log(countered);
                        console.log(mode);
                        if (counter == true && countered == false && mode == "1vsai" && coup.classList.contains("blanc")) {
                            coup.classList.add(couleur);
                            coup.classList.remove("blanc");
                            rempli = true;
                            couleur == "rouge" ? couleur = "jaune" : couleur = "rouge";
                            // countered = true;
                        } else {
                        let rnd = Math.floor(Math.random() * (3)+2);
                        for (let i = arrG[rnd].length - 1; i >= 0; i--) {

                            if (arrG[rnd][i].classList.contains("blanc") && rempli == false && couleur == "jaune") {
                                arrG[rnd][i].classList.remove("blanc");
                                arrG[rnd][i].classList.add(couleur);
                                rempli = true;
                                couleur == "rouge" ? couleur = "jaune" : couleur = "rouge";
                            }
                        }
                        }
                        rempli = false;
                        counter = false;
                        gagnerCol();
                        gagnerRow();
                        gagnerDiag();

                    }, 800);
                }

            }
        }


        else if (mode == "1vscpu") {
            if (couleur == "rouge") {

                for (let i = array.length - 1; i >= 0; i--) {

                    if (array[i].classList.contains("blanc") && rempli == false && couleur == "rouge") {
                        array[i].classList.remove("blanc");
                        array[i].classList.add(couleur);
                        rempli = true;
                        couleur == "rouge" ? couleur = "jaune" : couleur = "rouge";
                    }
                }
                rempli = false;
                gagnerCol();
                gagnerRow();
                gagnerDiag();

                if(winR != true && winJ != true) {
                    setTimeout(function () {
                        let rnd = Math.floor(Math.random() * (7));
                        for (let i = arrG[rnd].length - 1; i >= 0; i--) {

                            if (arrG[rnd][i].classList.contains("blanc") && rempli == false && couleur == "jaune") {
                                arrG[rnd][i].classList.remove("blanc");
                                arrG[rnd][i].classList.add(couleur);
                                rempli = true;
                                couleur == "rouge" ? couleur = "jaune" : couleur = "rouge";
                            }
                        }
                        rempli = false;
                        counter = false;
                        gagnerCol();
                        gagnerRow();
                        gagnerDiag();

                    }, 800);
                }

            }
        }


    }
}

function verif(i, j, align) {
    if (arrG[i][j].classList.contains("rouge")) {
        if (countColor == "rouge") {
            count++;
        } else if (countColor == "jaune") {
            count = 1;
        }
        countColor = "rouge";
    } else if (arrG[i][j].classList.contains("jaune")) {
        if (countColor == "jaune") {
            count++;
        } else if (countColor == "rouge") {
            count = 1;
        }
        countColor = "jaune";
    } else {
        arrG[i][j].classList.contains("blanc") ? count = 0 : true;
    }

    if (count == 3 && align == "col") {
        coup = arrG[i][j-1];
        if (coup) {
        coup.classList.contains("blanc") ? counter = true : counter = false;
        }
    }
    if (count == 3 && align == "row") {
        if (i > 0) {
        coup = arrG[i-1][j];
        }
        if (i < 4) {
        other = arrG[i+3][j];
        }
        if (coup) {
            if (i > 0 && coup.classList.contains("blanc") == true) {
                counter = true;
            } else if (i < 4 && other.classList.contains("blanc") == true) {
                counter = true;
                coup = other;
            }
        }
    }

    if (count >= 4 && countColor == "rouge") {
        winR = true;
        gagnerjeuxR();
    } else if (count >= 4 && countColor == "jaune") {
        winJ = true;
        gagnerjeuxJ();
    }
}

function rnd(min, max) {
    return Math.random() * (max - min) + min;
}

//   JEANNE
// C'est à vous de jouer joueur jaune ou rouge 
function tourJoueur() {
    joueur.innerHTML="C'est à votre tour de jouer : joueur " + couleur;
    if (couleur == "rouge") {
        fondjeu.classList.remove("tokenyel");
        fondjeu.classList.add("tokenred");
    } else if (couleur == "jaune") {
        fondjeu.classList.remove("tokenred");
        fondjeu.classList.add("tokenyel");
    }
 
 }
 
 // Joueur Rouge à gagner 
 function gagnerjeuxR() {
     resultat.innerHTML="Le joueur rouge a gagné";
     document.location.href = "finr.html";
 
 }
 // Joueur Jaune à gagner
 function gagnerjeuxJ() {
     resultat.innerHTML="Le joueur jaune a gagné";
     document.location.href = "finj.html";
 }

 setInterval(function(){ 
    titre.classList.remove("petit");
    titre.classList.add("gros");
    setTimeout(function(){ 
        titre.classList.remove("gros");
        titre.classList.add("petit");
     }, 500);
  }, 1000);

  setInterval(function(){ 
      nav.style.transition = "2s";
      nav.style.backgroundColor = bandeauColor[c];
      fondjeu.style.transition = "2s";
      fondjeu.style.borderColor = bandeauColor[c];
      c++;
      c == 6 ? c = 0 : true;
  }, 1000);

  setTimeout(function(){ 
    money.style.transition = "2s";
    money.style.opacity = "0";
    money.style.zIndex = "-1";
    coin.style.transition = "2s";
    coin.style.opacity = "0";
    coin.style.zIndex = "-1";
 }, 3000);

 function reset() {
    for (let i = arrG.length - 1; i >= 0; i--) {
        for (let j = arrG[i].length - 1; j >= 0; j--) {
            arrG[i][j].classList.remove("rouge");
            arrG[i][j].classList.remove("jaune");
            arrG[i][j].classList.add("blanc");
        }
    }
    couleur = "rouge";
    fondjeu.classList.remove("tokenyel");
    fondjeu.classList.add("tokenred");

    //au clic de rejouer et changement de mode
    //utiliser la boucle de gagner col pour reset les couleurs
}