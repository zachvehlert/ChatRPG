import "./App.css";

const data = {
  frontend_messages: [
    {
      message: "Welcome, Callum The Brave, to this enchanted journey....",
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
  game_state: {
    usable_items: ["Sword", "Ale", "Pointy Hat"],
    player_health: 100,
    player_gold: 25,
  },
};

// Parent: InputContainer
function DiceButton({dice_roll}) {
  return <button disabled={!dice_roll}>Roll Dice</button>;
}

// Parent: InputContainer
function PlayerInput({dice_roll}) {
  return <input type="text" id="player-input" disabled={dice_roll}/>;
}

// Parent: ChatBox
function InputContainer( {dice_roll} ) {
  return (
    <div class="input-container">
      <p class="arrow">--</p>
      <PlayerInput dice_roll={dice_roll}/>
      <DiceButton dice_roll={dice_roll}/>
    </div>
  );
}

// Parent: ScrollContainer
function Message({ message }) {
  return <p class={message.type}>{message.message}</p>;
}

// Parent: ChatBox
function ScrollContainer({ messages }) {
  return (
    <div class="scroll-container">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}

// Parent: Game
function ChatBox({ messages, dice_roll }) {
  return (
    <div class="chat-box">
      <ScrollContainer messages={messages} />
      <InputContainer dice_roll={dice_roll}/>
    </div>
  );
}

// Parent: HealthContainer
function HealthBar({ player_health }) {
  return (
    <div class="health-bar">
      <p>{player_health}</p>
    </div>
  );
}

// Parent: Status
function HealthContainer({ player_health }) {
  return (
    <div class="health-container">
      <h3>Player Health</h3>
      <HealthBar player_health={player_health} />
    </div>
  );
}

// Parent: Status
function InventoryContainer({ usable_items }) {
  return (
    <div class="inventory-container">
      <h3>Inventory</h3>
      <ul class="inventory-list">
        {usable_items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// Parent: Game
function Status({ game_state }) {
  return (
    <div class="status">
      <HealthContainer player_health={game_state.player_health} />
      <InventoryContainer usable_items={game_state.usable_items}/>
    </div>
  );
}

// Parent: App
function Game({ data }) {
  return (
    <div class="game">
      <ChatBox messages={data.frontend_messages} dice_roll={data.dice_roll} />
      <Status game_state={data.game_state} />
    </div>
  );
}

function App() {
  return <Game data={data} />;
}

export default App;