import "./GameCreator.css";
import axios from "axios";

async function requestBackend(requestData, endpoint) {
  const route = `http://127.0.0.1:5000/${endpoint}`;
  const response = await axios.post(route, requestData);
  console.log(response);
  return response;
}

function GameCreator() {
  return (
    <div className="game-creator">
      <h1>New Game</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const formObject = {
            playerName: e.target.playerName.value,
            playerBackstory: e.target.playerBackstory.value,
            worldLore: e.target.worldLore.value,
            currentLocation: e.target.currentLocation.value,
            starterItems: [
              e.target.starterItem1.value,
              e.target.starterItem2.value,
              e.target.starterItem3.value,
            ],
          };

          const response = await requestBackend(formObject, "create_game");
          console.log(response);

          // TODO: Send formObject to the server
          // I want to return the game id from the server and send it to the next page
        }}
      >
        <input
          type="text"
          name="playerName"
          className="game-creator-input"
          placeholder="Player Name"
        />
        <input
          type="text"
          name="playerBackstory"
          className="game-creator-input"
          placeholder="Player Backstory"
        />
        <input
          type="text"
          name="worldLore"
          className="game-creator-input"
          placeholder="World Lore"
        />
        <input
          type="text"
          name="currentLocation"
          className="game-creator-input"
          placeholder="Current Location"
        />
        <input
          type="text"
          name="starterItem1"
          className="game-creator-input"
          placeholder="Starter Item 1"
        />
        <input
          type="text"
          name="starterItem2"
          className="game-creator-input"
          placeholder="Starter Item 2"
        />
        <input
          type="text"
          name="starterItem3"
          className="game-creator-input"
          placeholder="Starter Item 3"
        />
        <button className="game-creator-button" type="submit">
          Begin Adventure
        </button>
      </form>
    </div>
  );
}

export default GameCreator;
