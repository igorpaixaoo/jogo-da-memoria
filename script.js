const cards = document.querySelectorAll(".carta")
let hasFlipedCard = false;

var asserts = document.getElementById("asserts");
var win = document.getElementById("win")
var btnNewGame = document.getElementById("newGame");
var fastest = document.getElementById("fastest")


let card1, card2;
let lockBoard = false;

var pararTimer = false;
var time;

let frasesAcertos = ['gg', 'acertou', 'finalmente kkk', 'nooooossa', 'ai andrei aranha']
let frasesErros = ['paia', 'Faz o L', 'mt ruim n da kkk', 'errei fui neymar', 'bah', 'GABRIEEELLLL']

var ms = 0;
var s = 0;
var m = 0;

var tempoVar = 1000

let randomNumber = Math.floor(Math.random() * 10);

let numberCards = 0;

var intervalo;

var fastestMin = 1;
var fastestSec = 58;
var fastestMs;

function temp() {

    if(pararTimer == false){
        time = setInterval(() =>{
            ms++
            var d = document.getElementById("ms")
            d.innerHTML = ms + "0"
    
            if(ms > 99){
                ms = 0  
                s++
                var s1 = document.getElementById("sec")
                if(s < 10) s1.innerHTML = "0" + s
                else s1.innerHTML = s
                
                if(s > 58) {
                    m++
                    s = 0
                    var m1 = document.getElementById("min")
                    if(m < 10) m1.innerHTML = "0" + m
                    else m1.innerHTML = m
                }
            }
        }, 11)    
    }
}


function virarCarta(){
    if(lockBoard) return;
    if(this === card1) return;
    this.classList.add("virar")

    if(!hasFlipedCard){
        hasFlipedCard = true;
        card1 = this;
        return
    }

    card2 = this;
    hasFlipedCard = false;
    check();

}

//função para checar as cartas
function check(){

    if(card1.dataset.card === card2.dataset.card){

        //mostrar frases aleatórias ao combinar as cartas
        asserts.textContent = frasesAcertos[randomNumber];

        asserts.style.color = '#007900'

        
        setTimeout(() => {
            asserts.textContent = null;
        }, 700)        

        disableCards();
        randomNumber = Math.floor(Math.random() * 6);

        //Aumentar o número de cards a cada acerto
        numberCards++;
        console.log(numberCards)

        if(numberCards == 6){
            win.style.display = "block"
            btnNewGame.style.display = "block"

            clearInterval(time)

            if(m < fastestMin && s < fastestSec){
                console.log("Fastest Memory")
            }
        }

        return;
    }

    unflipCards();
}

function disableCards(){
    card1.removeEventListener("click", virarCarta);
    card2.removeEventListener("click", virarCarta);

    reset();

}

function unflipCards(){
    lockBoard = true;

    setTimeout(() => {        
        card1.classList.remove("virar");
        card2.classList.remove("virar");
        lockBoard = false;
        reset();
    }, 500);

    randomNumber = Math.floor(Math.random() * 6);

    asserts.textContent = frasesErros[randomNumber]
    asserts.style.color = '#ff0000'

    setTimeout(() => {
        asserts.textContent = null;
    }, 700)  

}

function reset(){
    [hasFlipedCard, lockBoard] = [false, false]
    [card1, card1] = [null, null]
}

//Função imediata
var suffle = (function (){
    temp()

    win.style.display = "none"
    btnNewGame.style.display = "none"
    fastest.style.display = "none"

    cards.forEach((card) =>{
        let random = Math.floor(Math.random() * 12)
        card.style.order = random;
    })
})();

cards.forEach((card) => {
    card.addEventListener("click", virarCarta)
});