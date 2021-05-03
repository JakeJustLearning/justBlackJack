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
}


let bjDeck = {}
let playerHand = {}
let dealerHand = {}

function startBlackJack() {
    bjDeck = new Deck(deckRefStandard)

    bjDeck.fyShuf()

    playerHand = new Hand(bjDeck, 2)

    dealerHand = new Hand(bjDeck, 2)

    console.log(`hand = ${[playerHand.getCards()[0].rank]}, ${playerHand.getCards()[1].rank}, hand value = ${playerHand.handValue()}`)
    console.log(dealerHand.handValue())
}


//JSQUIRTY
$(document).ready(function() {
    $("#new-game").click(function() {
        $(".hand").empty()
        startBlackJack();
        bjDeck.fyShuf();
        bjDeck.fyShuf();
        renderCards()
        renderScores()
        $(".button").attr("disabled", false)
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
        checkScores
    })

    function dealerLogic(d) {
        console.log('running')
        while (d.handValue() <= 17) {
            console.log('x')
            if (d.handValue() == 17) {
                console.log('y')
                if ((d.getCards().filter(e => e.rank == 1)).reduce(function(prev, cur) {
                        console.log('z')
                        return prev + (cur.rank)
                    }) == 6) {
                    d.draw(bjDeck, 1)
                    renderScores()
                    renderCards()
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

    function checkScores(p, d) {
        if (p.handValue() > 21) {
            alert('u bust bitch')
            $("#hit").attr("disabled", true)
        } else if (d.handValue() > 21) {
            alert('dealer is a busty ass ho')
        } else if (d.handValue() == p.handValue()) {
            alert('There are no winners when tieing, consider this a loss')
        } else if (p.handValue() > d.handValue()) {
            alert('you have done it you beautiful bitch')
        } else {
            alert('dealer wins, your shoes are ugly')
        }
    }




})