# ChatRPG

## Introduction

Welcome to ChatRPG, an interactive role-playing game where you can chat with characters, explore worlds, and embark on exciting adventures! ChatRPG is a text-based RPG game that allows players to interact with the game world through chat commands. It is designed to be extensible and easy to customize.

## Features

- Interactive chat-based gameplay
- Multiple characters and storylines
- Customizable game world
- Save and load game states

## Installation

To get started with ChatRPG, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/zachvehlert/chatrpg.git
    ```
2. Navigate to the frontend directory:
    ```sh
    cd chatrpg/frontend/chatrpg
    ```
3. Install the required frontend dependencies:
    ```sh
    npm install
    ```
4. Navigate to the backend directory
    ```sh
    cd chatrpg/backend
    ```
5. Create a virtual enviornment
    ```sh
    python -m venv venv
    ```
6. Activate the virtual enviornment
7. Once activated, install python dependencies
    ```
    pip install -r requierments.txt
    ```
8. Create a .env file in the backend directory
9. Edit the file and add your OpenAi API key
    ```sh
    OPENAI_API_KEY=YOUR API KEY HERE
    ```

## Usage

To start the game 

1. Run the following command from the frontend directory:
```sh
npm start
```
2. Run the following command from the backend directory with the virtual enviornment active:
```sh
flask run main.py
```

Follow the on-screen instructions to begin your adventure!

## Contributing

We welcome contributions from the community! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to your fork.
4. Submit a pull request with a detailed description of your changes.