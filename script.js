const cards = document.querySelectorAll(".carta")
let hasFlipedCard = false;

var asserts = document.getElementById("asserts");
var win = document.getElementById("win")
var btnNewGame = document.getElementById("newGame");

let card1, card2;
let lockBoard = false;

let frasesAcertos = ['gg', 'acertou', 'finalmente kkk', 'nooooossa']
let frasesErros = ['paia', 'Faz o L', 'mt ruim n da kkk', 'errei fui neymar', 'bah']

let randomNumber = Math.floor(Math.random() * 10);

let numberCards = 0;

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

        asserts.style.color = '#00b900'

        setTimeout(() => {
            asserts.textContent = null;
        }, 700)        

        disableCards();
        randomNumber = Math.floor(Math.random() * 4);

        //Aumentar o número de cards a cada acerto
        numberCards++;
        console.log(numberCards)

        if(numberCards == 6){
            win.style.display = "block"
            btnNewGame.style.display = "block"
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

    randomNumber = Math.floor(Math.random() * 5);

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
    win.style.display = "none"
    btnNewGame.style.display = "none"

    cards.forEach((card) =>{
        let random = Math.floor(Math.random() * 12)
        card.style.order = random;
    })
})();

cards.forEach((card) => {
    card.addEventListener("click", virarCarta)
});