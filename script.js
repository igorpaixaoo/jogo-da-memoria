const cards = document.querySelectorAll(".carta")
let hasFlipedCard = false;
var asserts = document.getElementById("asserts");
let card1, card2;
let lockBoard = false;

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

function check(){
    if(card1.dataset.card === card2.dataset.card){
        asserts.textContent = "Ai sim ein!";
        setTimeout(() => {
            asserts.textContent = null;
        }, 2000)        

        disableCards();
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

}

function reset(){
    [hasFlipedCard, lockBoard] = [false, false]
    [card1, card1] = [null, null]
}

//Função imediata
var suffle = (function (){
    cards.forEach((card) =>{
        let random = Math.floor(Math.random() * 12)
        card.style.order = random;
    })
})();

cards.forEach((card) => {
    card.addEventListener("click", virarCarta)
});