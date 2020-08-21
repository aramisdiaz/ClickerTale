import React, { Component } from "react";
import Portrait from "./components/Portrait";
import Container from "./components/Container";
import Banner from "./components/Banner";
import cards from "./portraits.json";
import "./App.css";

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on a character to gain points! Click on the same character twice and you lose!";

class App extends Component {


  state = {
    cards,
    correctGuesses,
    bestScore,
    clickMessage
  };

  setClicked = id => {


    const cards = this.state.cards;


    const clickedMatch = cards.filter(match => match.id === id);



    if (clickedMatch[0].clicked) {

      console.log("Correct Guesses: " + correctGuesses);
      console.log("Best Score: " + bestScore);

      correctGuesses = 0;
      clickMessage = "Game over! Don't lose hope! Stay determined..."

      for (let i = 0; i < cards.length; i++) {
        cards[i].clicked = false;
      }

      this.setState({ clickMessage });
      this.setState({ correctGuesses });
      this.setState({ cards });


    } else if (correctGuesses < 11) {


      clickedMatch[0].clicked = true;


      correctGuesses++;

      clickMessage = "Well done! Keep going!";

      if (correctGuesses > bestScore) {
        bestScore = correctGuesses;
        this.setState({ bestScore });
      }


      cards.sort(function (a, b) { return 0.5 - Math.random() });


      this.setState({ cards });
      this.setState({ correctGuesses });
      this.setState({ clickMessage });
    } else {


      clickedMatch[0].clicked = true;


      correctGuesses = 0;


      clickMessage = "You beat the game! You are filled with DETERMINATION";
      bestScore = 12;
      this.setState({ bestScore });

      for (let i = 0; i < cards.length; i++) {
        cards[i].clicked = false;
      }


      cards.sort(function (a, b) { return 0.5 - Math.random() });


      this.setState({ cards });
      this.setState({ correctGuesses });
      this.setState({ clickMessage });

    }
  };

  render() {
    return (
      <Container>
        <Banner>ClickerTale</Banner>

        <h3 className="scoreSummary">
          {this.state.clickMessage}
        </h3>

        <h3 className="scoreSummary card-header">
          Correct Guesses: {this.state.correctGuesses}
          <br />
                    Best Score: {this.state.bestScore}
        </h3>
        <div className="container">
          <div className="row">
            {this.state.cards.map(match => (
              <Portrait
                setClicked={this.setClicked}
                id={match.id}
                key={match.id}
                image={match.image}
              />
            ))}
          </div>
        </div>

      </Container>
    );
  }
}

export default App;
