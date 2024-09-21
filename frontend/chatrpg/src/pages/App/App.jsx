import "./App.css";
import { create } from "zustand";
import axios from "axios";
import { useLocation } from "react-router-dom";

const useStore = create((set) => ({
  // State variables
  frontend_messages: [],
  usable_items: [],
  player_health: 100,
  player_gold: 25,

  dice_roll: false,
  dice_overlay: false,
  dice_number: 20,

  // Functions to update state
  addMessage: (message, type) => {
    set((state) => {
      const newMessage = { message, type };
      return {
        frontend_messages: [...state.frontend_messages, newMessage],
      };
    });
  },

  updateHealth: (healthChange) => {
    set((state) => {
      return {
        player_health: state.player_health + healthChange,
      };
    });
  },

  updateGold: (goldChange) => {
    set((state) => {
      return {
        player_gold: state.player_gold + goldChange,
      };
    });
  },

  updateInventory: (current_item_array) => {
    set((state) => {
      return {
        usable_items: current_item_array,
      };
    });
  },

  updateDiceOverlay: () => {
    set((state) => {
      return {
        dice_overlay: !state.dice_overlay,
      };
    });
  },

  updateDiceNumber: () => {
    set((state) => {
      return {
        dice_number: Math.floor(Math.random() * 20) + 1,
      };
    });
  },
}));

async function requestBackend(requestData, endpoint) {
  const route = `http://127.0.0.1:5000/${endpoint}`;
  const response = await axios.post(route, requestData);
  console.log(response);
  return response;
}

function PlayerInput() {
  // State Functions
  const addMessage = useStore((state) => state.addMessage);
  const updateHealth = useStore((state) => state.updateHealth);
  const updateGold = useStore((state) => state.updateGold);
  const updateInventory = useStore((state) => state.updateInventory);

  // State Variables
  const usable_items = useStore((state) => state.usable_items);
  const health = useStore((state) => state.player_health);
  const gold = useStore((state) => state.player_gold);

  // Get the game id from the previous page
  const gameId = useLocation().state.gameId.game_id;

  return (
    <input
      type="text"
      id="player-input"
      placeholder={`${gameId}`}
      onKeyDown={async (e) => {
        if (e.key === "Enter") {
          // Construct the request data
          const requestData = {
            game_id: gameId,
            requested_action: e.target.value,
            usable_items: usable_items,
            health: health,
            gold: gold,
          };

          // Add the player message to the chat
          addMessage(e.target.value, "player");
          e.target.value = "";

          // Call the backend and get the response. This should return a response object
          const responseData = await requestBackend(
            requestData,
            "get_response"
          );

          // Add the response to the chat
          addMessage(responseData.data.dm_response, "narrator");

          // Update the player health, gold, and inventory based on the response
          updateHealth(responseData.data.health_change);
          updateGold(responseData.data.gold_change);
          updateInventory(responseData.data.usable_items);

          // If the response is a dice roll, enable the dice button and add in the dice roll message
          if (responseData.data.dice_roll_required) {
            addMessage(
              `Roll dice for: ${responseData.data.roll_for_skill}`,
              "dice-prompt"
            );
            // TODO: Enable the dice button
            // TODO: Disable the player input
          }
        }
      }}
    />
  );
}

function DiceButton() {
  const updateDiceOverlay = useStore((state) => state.updateDiceOverlay);
  const updateDiceNumber = useStore((state) => state.updateDiceNumber);
  const addMessage = useStore((state) => state.addMessage);

  function rollDice() {
    // Show the dice overlay immediately
    updateDiceOverlay();

    // Change the dice number every 100ms for 2 seconds
    const intervalId = setInterval(updateDiceNumber, 50);

    // After 2 seconds, stop updating the dice number. After 1 second, hide the dice overlay
    setTimeout(() => {
      clearInterval(intervalId);
      setTimeout(() => {
        updateDiceOverlay();
        const currentDiceNumber = useStore.getState().dice_number;
        addMessage(`Dice roll: ${currentDiceNumber}`, "dice-roll");
        // TODO: Send the dice number to the backend here
      }, 1000);
    }, 2000);
  }

  return <button onClick={rollDice}>Roll Dice</button>;
}

function InputContainer() {
  return (
    <div className="input-container">
      <p className="arrow">--</p>
      <PlayerInput />
      <DiceButton />
    </div>
  );
}

function Message(message) {
  return <p className={message.message.type}>{message.message.message}</p>;
}

function ScrollContainer() {
  const messages = useStore((state) => state.frontend_messages);
  return (
    <div className="scroll-container">
      {messages.map((messageObj, index) => (
        <Message key={index} message={messageObj} />
      ))}
    </div>
  );
}

function ChatBox() {
  return (
    <div className="chat-box">
      <ScrollContainer />
      <InputContainer />
    </div>
  );
}

function HealthBar() {
  const player_health = useStore((state) => state.player_health);
  return (
    <div className="health-bar">
      <p>{player_health}</p>
    </div>
  );
}

function HealthContainer() {
  return (
    <div className="health-container">
      <h3>Player Health</h3>
      <HealthBar />
    </div>
  );
}

function InventoryContainer() {
  const usable_items = useStore((state) => state.usable_items);
  return (
    <div className="inventory-container">
      <h3>Inventory</h3>
      <ul className="inventory-list">
        {usable_items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function Status() {
  return (
    <div className="status">
      <HealthContainer />
      <InventoryContainer />
    </div>
  );
}

function DiceOverlay() {
  const dice_number = useStore((state) => state.dice_number);
  return (
    <div className="overlay-bg">
      <div className="overlay">
        <p className="dice-number">{dice_number}</p>
      </div>
    </div>
  );
}

function Game() {
  // Conditionally render the dice overaly based on the state
  const dice_overlay = useStore((state) => state.dice_overlay);
  if (dice_overlay) {
    return (
      <div className="game">
        <DiceOverlay />
        <ChatBox />
        <Status />
      </div>
    );
  } else {
    return (
      <div className="game">
        <ChatBox />
        <Status />
      </div>
    );
  }
}

function App() {
  return <Game />;
}

export default App;
