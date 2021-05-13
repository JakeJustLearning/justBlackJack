//GLOBULES!!
const deckRefStandard = {
    suits: ['clubs', 'hearts', 'diamonds', 'spades'],
    ranks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
}

//CLASSES
class Card {
    constructor(suit, rank) {
        this.suit = suit,
            this.rank = rank,
            this.image = `${suit}${rank}`
    }
}

class Deck {
    constructor(ref) {
        this.suits = ref.suits
        this.ranks = ref.ranks
        this.cards = []

        this.createCards(this.suits, this.ranks)
    }

    createCards(suits, ranks) {
        for (let x in suits) {
            for (let i in ranks) {
                this.cards.push(new Card(suits[x], ranks[i]))
            }
        }

    }

    getCards() {
        return this.cards
    }

    fyShuf() {
        const len = this.cards.length

        for (let i = len - 1; i > 0; i--) {
            const x = Math.floor(Math.random() * i)
            let temp = this.cards[x]
            this.cards[x] = this.cards[i]
            this.cards[i] = temp
        }
    }

    draw() {
        return this.cards.pop()
    }
}

class Hand {
    constructor(deck, size) {
        this.cards = []
        this.wDraw = true

        this.draw(deck, size)
    }

    draw(deck, num) {
        for (let i = num; i > 0; i--) {
            let temp = deck.draw()
            this.cards.push(temp)
        }
    }

    getCards() {
        return this.cards
    }

    setCards(suits, ranks) {
        this.cards = []
        console.log(this.getCards())
        for (let x in suits) {
            for (let i in ranks) {
                this.cards.push(new Card(suits[x], ranks[i]))
            }
        }
    }

    handValue() {
        let val = 0
        for (let i in this.cards) {
            if (this.cards[i].rank > 10) {
                val += 10
            } else if (this.cards[i].rank == 1) {
                (val + 11 > 21) ? val++ : val += 11
            } else {
                val += this.cards[i].rank
            }
        }
        return val
    }
    shouldDraw(hand) {
        (this.handValue() > 17) ? this.wDraw = false: this.wDraw = true
    }

    dealerLogic() {
        if (this.handValue() <= 17) {
            console.log('x')
            if (this.handValue() == 17) {
                console.log('y')
                if ((this.getCards().filter(e => e.rank != 1)).reduce((a, c) => { return a + c.rank }, 0) == 6) {
                    this.draw(bjDeck, 1)
                    console.log - ('s17')
                } else {
                    console.log('17')
                }
            } else {
                console.log('dealer draws')
                this.draw(bjDeck, 1)
                console.log('i have drawn')
                console.log('i have scores')
                console.log('i have cards')
            }
        }
    }
}

class Game {
    constructor(type, players) {
        this.type = type
        this.players = players
    }
}

class BlackJack {}



let bjDeck = {}
let playerHand = {}
let dealerHand = {}
let dealerMove = false;

function startBlackJack() {
    dealerMove = false
    bjDeck = new Deck(deckRefStandard)

    bjDeck.fyShuf()

    playerHand = new Hand(bjDeck, 2)

    dealerHand = new Hand(bjDeck, 2)

    console.log(`hand = ${[playerHand.getCards()[0].rank]}, ${playerHand.getCards()[1].rank}, hand value = ${playerHand.handValue()}`)
    console.log(dealerHand.handValue())
}




//JQ
$(document).ready(function() {
    $('#hit').attr("disabled", true)
    $('#stand').attr("disabled", true)

    $('body').fadeIn(2000, function() {

    });
    $("#new-game").click(function() {
        $(".hand").empty()
        $("#results").empty()
        startBlackJack();
        bjDeck.fyShuf();
        bjDeck.fyShuf();
        renderCards()
        renderScores()
        $(".button").attr("disabled", false)
        checkScores(playerHand, dealerHand)
    })

    function renderCards() {
        $(".hand").empty()
        for (let i in playerHand.getCards()) {
            $(`#player-hand`).append(`<div style="display:inline-block"><img class="card" src="assets/cards/1X/${playerHand.getCards()[i].image}.png"></div>`)
        }
        for (let i in dealerHand.getCards()) {
            $(`#dealer-hand`).append(`<div style="display:inline-block"><img class="card" src="assets/cards/1X/${dealerHand.getCards()[i].image}.png"></div>`)
        }
    }

    function renderScores() {
        $(".score").empty()
        $("#player-score").append(`<p>You're Score: ${playerHand.handValue()}</p>`);
        $("#dealer-score").append(`<p>Dealer Score: ${dealerHand.handValue()}</p>`)
    }

    $("#hit").click(function() {
        playerHand.draw(bjDeck, 1)
        renderCards()
        renderScores()

        checkScores(playerHand, dealerHand)
    })

    $("#stand").click(function() {
        $("#hit").attr("disabled", true);
        $("#stand").attr("disabled", true)
        dealerLogic(dealerHand);
        checkScores(playerHand, dealerHand)
    })



    function checkScores(p, d) {
        console.log('checking scores')
        $("#results").empty()
        if (p.handValue() > 21) {
            $("#results").append('<p style="font-size:larger">YOU BUST!</p>')
            $("#hit").attr("disabled", true)
            $("#stand").attr("disabled", true)
        } else if (p.handValue() == 21 && dealerMove == false) {
            $("#results").append('<p style="font-size:larger">BLACK JACK... For now</p>')
            $("#hit").attr("disabled", true)
        } else if (d.handValue() > 21) {
            $("#results").append('<p style="font-size:larger">DEALER BUSTS! YOU WIN</p>')
            $("#hit").attr("disabled", true)
            $("#stand").attr("disabled", true)
        } else if ((d.handValue() == p.handValue()) && dealerMove == true) {
            $("#results").append('<p style="font-size:larger">THERE ARE NO WINNERS IN A TIE!</p>')
            $("#hit").attr("disabled", true)
            $("#stand").attr("disabled", true)
        } else if ((p.handValue() > d.handValue()) && dealerMove == true) {
            $("#results").append('<p style="font-size:larger">YOU WIN!</p>')
            $("#hit").attr("disabled", true)
            $("#stand").attr("disabled", true)
        } else if ((d.handValue() > p.handValue()) && dealerMove == true) {
            $("#results").append('<p style="font-size:larger">DEALER WINS</p>')
            $("#hit").attr("disabled", true)
            $("#stand").attr("disabled", true)
        }
    }

    function dealerLogic(d) {
        dealerMove = true
        console.log('running')
        while (d.handValue() <= 17) {
            console.log('x')
            if (d.handValue() == 17) {
                console.log('y')
                if ((d.getCards().filter(e => e.rank != 1)).reduce((a, c) => { return a + c.rank }, 0) == 6) {
                    d.draw(bjDeck, 1)
                    renderCards()
                    renderScores()
                    console.log - ('s17')
                } else {
                    console.log('17')
                    break
                }
            } else {
                console.log('dealer draws')
                d.draw(bjDeck, 1)
                console.log('i have drawn')
                renderScores()
                console.log('i have scores')
                renderCards()
                console.log('i have cards')
                continue
            }
        }
        checkScores(playerHand, dealerHand)
    }
})