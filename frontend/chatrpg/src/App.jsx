import "./App.css";
import { create } from "zustand";

const useStore = create((set) => ({
  // State variables
  frontend_messages: [
    {
      message: "Welcome, Callum The Brave, to this enchanted journey...",
      type: "narrator",
    },
    { message: "I look around for a door to the backroom", type: "player" },
    {
      message:
        "You see the door to the backroom in a shadowy corner, the lamplight...",
      type: "narrator",
    },
    {
      message:
        "I try to sneak into the door to the backroom without anyone seeing",
      type: "player",
    },
    { message: "Roll dice for: Stealth", type: "dice-prompt" },
    { message: "20", type: "dice-roll" },
  ],
  dice_roll: false,
  usable_items: ["Sword", "Ale", "Pointy Hat"],
  player_health: 100,
  player_gold: 25,

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
}));

function PlayerInput() {
  const addMessage = useStore((state) => state.addMessage);

  return (
    <input
      type="text"
      id="player-input"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          // Add the player message to the chat
          addMessage(e.target.value, "player");
          e.target.value = "";

          // TODO: Call the backend and get the response. This should return a response object
          addMessage("This is the DM Response", "narrator");

          // TODO: if the response is a dice roll, enable the dice button and add in the dice roll message
          // This should be something like: { message: "Roll dice for: Stealth", type: "dice-prompt" }

          // TODO: Update the player health, gold, and inventory based on the response
        }
      }}
    />
  );
}

function DiceButton() {
  return <button>Roll Dice</button>;
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

function Game() {
  return (
    <div className="game">
      <ChatBox />
      <Status />
    </div>
  );
}

function App() {
  return <Game />;
}

export default App;
