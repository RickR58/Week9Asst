// What do we need for this game
/* 
Deck needs...
52 cards (Should each be it's own class? or can each have 3 values)
    -Rank ("name value"")
    -Suit (hearts, diamonds, spades, clubs)
    -Values (What's worth the most? second most? etc.)
- How to shuffle the cards. (What kind of code would that even be? Some sort of randomizer code that would randomize rank, suit, values? use Math.random?) OOH!! I guessed right with the math.random! This ended up using the fisher-yates shuffle algorithm.

- How to pass the cards to the players? In the deck or in the game logic? 
    (Game logic in JavaScript refers to the underlying rules, calculations, and decision-making processes that govern the gameplay. It's the core of any game, determining how players interact with the game world, how objects behave, and how the game progresses.)

Who's playing? Is this going to be a class? Is this goiong to be part of the game logic? I'm guessing the latter. We'll need...
    - Name
    - Score
    - Dealt hand

The Game logic itself. 
    -card comparison. Compares the number values on cards.

Deck Class
    This needs
    an array to store the cards
    and aray to store all the cards Ranks
    an array to store all the cards Suits
     */

class Deck {
  constructor() {
    this.deck = [];
    this.ranks = [
      "Ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
    ];
    this.suits = ["Hearts ♥", "Diamonds ♦", "Spades ♠", "Clubs ♣"];
  }
  //    Needs a method to create the deck that will iterate over the ranks and suits then push a new card as an object into our construtors this.deck. // i iterates the suits. // J iterates the ranks

  createDeck() {
    for (let i = 0; i < this.suits.length; i++) {
      for (let j = 0; j < this.ranks.length; j++) {
        let card = {
          name: `${this.ranks[j]} of ${this.suits[i]}`,
          value: j + 1,
        };
        this.deck.push(card);
      }
    }
  }
  // implementation of the Fisher-Yates shuffle algorithm to randomize the order of elements in an array
  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }
}
//class for a game (specifically for this game)
/* 
 Needs to have
    a deck - we'll instantantiate a new deck inside the game class (FYI: instantiation refers to the process of creating an object from a class or a constructor function. This new object is an instance of that class, inheriting its properties and methods.)
    Create the deck, shuffle the deck, and pass the deck to...
    
    - logic to play the game
        will be turn-based (cuanto es?)
        When will they have their hand?
        control flow statement logic to determin who wins

    - 2 players
        -hand
        -score
        - name
*/
class Game {
  constructor() {
    this.player1 = {
      name: "Player 1",
      score: 0,
      hand: [],
    };
    this.player2 = {
      name: "Player 2",
      score: 0,
      hand: [],
    };
  }
  /*  To play war, all cards are dealt.
    ——players take turns laying down a card
    ——high card takes the pile
    ——if cards match, it's war! Players flip 4 more cards face down and 1 face up. ——Highest face-up card wins the pile
    ——They'll take x amount of turns.
    We need to award points based on card value
    log the winner
 */
  playGame() {
    const deck = new Deck();
    deck.createDeck();
    deck.shuffleDeck();

    // Deal half the deck to each player (Thanks for the debug help Gemini AI!) I don't know why the instructor's solution worked without this next bit, but I suspected there was an issue on this point. Still I don't understand where we've told the code that there are 52 cards.

    const halfDeck = Math.floor(deck.deck.length / 2);
    this.player1.hand = deck.deck.splice(0, halfDeck);
    this.player2.hand = deck.deck.splice(0, halfDeck);

    while (deck.deck.length !== 0) {
      this.player1.hand.push(deck.deck.shift()); //when a card is played, we need to have the total of the deck (52) lessened by 1 so we know when to stop.
      this.player1.hand.push(deck.deck.shift());
      this.player2.hand.push(deck.deck.shift());
    }
    // How many turns are needed. Imma guess 26.

    for (let i = 0; i < this.player1.hand.length; i++) {
      //  compare values and award points
      if (this.player1.hand[i].value > this.player2.hand[i].value) {
        //now what? This is what happens when player 1 wins
        this.player1.score++;

        console.log(`
          Player 1's Card: ${this.player1.hand[i].name}
          Player 2's Card: ${this.player2.hand[i].name}
          Player 1 wins a point!
          Current Score: p1: ${this.player1.score}, p2: ${this.player2.score}
          `);
      } else if (this.player2.hand[i].value > this.player1.hand[i].value) {
        // This is what happens when player 2 wins
        this.player2.score++;

        console.log(`
          Player 1's Card: ${this.player1.hand[i].name}
          Player 2's Card: ${this.player2.hand[i].name}
          Player 2 wins a point!
          Current Score: p1: ${this.player1.score}, p2: ${this.player2.score}
          `);
      } else {
        console.log(`
          P1 Card: ${this.player1.hand[i].name}
          P2 Card: ${this.player2.hand[i].name}
          Tie: No points awarded
          Current Score: p1: ${this.player1.score}, p2: ${this.player2.score}
          `);
      }
    }
    if (this.player1.score > this.player2.score) {
      console.log(`Player 1 wins game!
        Final score: 
        Player 1 points: ${this.player1.score}
        Player 2 points: ${this.player2.score}
        `);
    } else if (this.player2.score > this.player1.score) {
      console.log(`Player 2 wins game!
          Final score: 
          Player 1 points: ${this.player1.score}
          Player 2 points: ${this.player2.score}
          `);
    } else {
      console.log("Players tied! Time for a rematch!");
    }
  }
}

const game = new Game();
game.playGame();

console.log("Excelsior!");
