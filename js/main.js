
let score1 = 0
let score2= 0

let deckId = ''

if (!localStorage.getItem('deckId')){
  getDeck();

}
 function getDeck(){
  fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    // deckId = data.deck_id
    localStorage.setItem('deckId', data.deck_id)
    
    
  })
  .catch(err => {
    console.log(`error ${err}`)
  })

 }


document.querySelector('button').addEventListener('click', getCards)

async function getNewCardsAndSaveNewDeckId(url){
  let cards
  let deckUrl;
  const newDeckUrl = url.replace(/deck\/.*\/draw/, "deck/new/draw");
  await fetch(newDeckUrl).then(res => res.json()).then(data => {
    console.log(data);
    cards = data.cards;
    deckUrl = url.replace(/deck\/.*\/draw/, `deck/${data.deck_id}/draw`);
    localStorage.setItem('deckId', data.deck_id);
  });
  return cards;
}

function getCards(deckId){
  deckId = localStorage.getItem('deckId')
  
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  let cards;

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(async data => {
        console.log(data);

        if(data.error){
          cards = await getNewCardsAndSaveNewDeckId(url);
        } else {
          cards = data.cards
        }
        document.querySelector('#player1').src = cards[0].image
        document.querySelector('#player2').src = cards[1].image

        let player1Val = checkNum(cards[0].value)
        let player2Val = checkNum(cards[1].value)

        if (player1Val > player2Val){
          score1 += 2
          document.querySelector('h3').innerText = 'Player 1 Wins!'
          document.querySelector('#p1score').innerText = `Score: ${score1}`
          document.querySelector('#p2score').innerText = `Score: ${score2}`

        } else if (player1Val < player2Val){
          score2 += 2
          document.querySelector('h3').innerText = 'Player 2 Wins!'
          document.querySelector('#p1score').innerText = `Score: ${score1}`
          document.querySelector('#p2score').innerText = `Score: ${score2}`
        } else {
          document.querySelector('h3').innerText = 'WAR! >:)'
          document.querySelector('.war').classList.remove('visible')
          document.querySelector('.two').classList.add('visible')
        }
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

//store the deck id into local storage 

const checkNum = value => {
  if (value === 'ACE'){
    return 14
  } else if (value === 'KING'){
    return 13
  } else if (value === 'QUEEN'){
    return 12
  } else if (value === 'JACK'){
    return 11
  } else {
    return Number(value)
  }
}




const war = () => {

  deckId = localStorage.getItem('deckId')
  let cards;

  const warCards = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=8`

  fetch(warCards)
        .then(res => res.json()) // parse response as JSON
        .then(async data => {
          console.log(data)
          if(data.error){
            cards = await getNewCardsAndSaveNewDeckId(warCards);
          } else {
            cards = data.cards
          }
          document.querySelector('#player1').src = cards[6].image
          document.querySelector('#player2').src = cards[7].image
  
          let player1Val = checkNum(cards[6].value)
          let player2Val = checkNum(cards[7].value)
  
          if (player1Val > player2Val){
            score1 += 10
            document.querySelector('h3').innerText = 'Player 1 Wins!'
            document.querySelector('#p1score').innerText = `Score: ${score1}`
            document.querySelector('#p2score').innerText = `Score: ${score2}`
  
          } else if (player1Val < player2Val){
            score2 += 10
            document.querySelector('h3').innerText = 'Player 2 Wins!'
            document.querySelector('#p1score').innerText = `Score: ${score1}`
            document.querySelector('#p2score').innerText = `Score: ${score2}`
  
          } else {
            document.querySelector('h3').innerText = 'WAR! >:)'
            document.querySelector('.war').classList.remove('visible')
            document.querySelector('.two').classList.add('visible')
            // TODO war does not do 20 points when double war
            war();
          }
          
        })
        .catch(err => {
            console.log(`error ${err}`)
        });

        document.querySelector('.war').classList.add('visible')
          document.querySelector('.two').classList.remove('visible')


  }

  document.querySelector('.war').addEventListener('click', war)



// const war = () => {

//   const deckOfCards = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

//   fetch(deckOfCards)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//         document.querySelector('#player1').src = data.cards[0].image
//         document.querySelector('#player2').src = data.cards[1].image

//         let player1Val = checkNum(data.cards[0].value)
//         let player2Val = checkNum(data.cards[1].value)

//         if (player1Val > player2Val){
//           document.querySelector('h3').innerText = 'Player 1 Wins!'
//         } else if (player1Val < player2Val){
//           document.querySelector('h3').innerText = 'Player 2 Wins!'
//         } else {
//           document.querySelector('h3').innerText = 'WAR! >:)'
//           war()
//         }
        
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }

// }