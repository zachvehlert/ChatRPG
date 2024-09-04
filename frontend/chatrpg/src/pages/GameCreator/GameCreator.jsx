import "./GameCreator.css";

function GameCreator() {
    return (
      <div className="game-creator">
        <h1>New Game</h1>
        <input type="text" className="game-creator-input" placeholder="Player Backstory" />
        <input type="text" className="game-creator-input" placeholder="Player Name" />
        <input type="text" className="game-creator-input" placeholder="World Lore" />
        <input type="text" className="game-creator-input" placeholder="Current Location" />
        <input type="text" className="game-creator-input" placeholder="Starter Item 1" />
        <input type="text" className="game-creator-input" placeholder="Starter Item 2" />
        <input type="text" className="game-creator-input" placeholder="Starter Item 3" />
        <button className="game-creator-button">Begin Adventure</button>
      </div>
    )
}

export default GameCreator;