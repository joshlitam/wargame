if (!localStorage.getItem("deckid")) {
    createNewDeck()
}

let deck_id = localStorage.getItem("deckid")

let player1score = 0
let player2score = 0



document.querySelector('button').addEventListener('click', drawTwo)

function drawTwo() {

  fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)
  .then (res => res.json())
  .then (data => {
    console.log(data)
    if (data.remaining == 0) {
      console.log("Cards Remaining: 0, creating a new deck!")
      createNewDeck()
    }
    // player 1
    let player1value = checkValue(data.cards[0].value)
    document.querySelector('#player1').innerText = `${player1value} of ${data.cards[0].suit}`
    document.querySelector('#card1').src = data.cards[0].image

    // player 2
    let player2value = checkValue(data.cards[1].value)
    document.querySelector('#player2').innerText = `${player2value} of ${data.cards[1].suit}`
    document.querySelector('#card2').src = data.cards[1].image

    // calculate score
    if (player1value > player2value) {
      player1score += 1
    } else if (player1value == player2value) {
      console.log("It's a tie!")
    } else {
      player2score += 1
    }

    document.querySelector('#player1score').innerText = `Player 1 Score: ${player1score}`
    document.querySelector('#player2score').innerText = `Player 2 Score: ${player2score}`
  })
}

function checkValue(value) {
  if (value == "KING") {
    value = 13
  } else if (value == "QUEEN") {
    value = 12
  } else if (value == "JACK") {
    value = 11
  } else {
    value = value
  }
  return value
}

function createNewDeck() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then (res => res.json())
    .then (data => {
      console.log(data)
      deck_id = data.deck_id
      localStorage.setItem("deckid", deck_id)
    })
}
