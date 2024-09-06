# 🕹️ Unbeatable Tic-Tac-Toe Game

Welcome to the **Unbeatable Tic-Tac-Toe** game! This project is a classic implementation of the Tic-Tac-Toe game with an AI opponent that you cannot beat! The AI uses a combination of the **Minimax algorithm** and **heuristics** to make optimal moves, ensuring that it either wins or results in a draw.

## 🚀 Features

- **Unbeatable AI:** The AI uses advanced algorithms to ensure that it never loses a game.
- **Human vs. AI:** Play against the AI and test your skills. Can you force a draw?
- **Choice of Turn:** You can choose whether to play first or let the AI make the first move.
- **Responsive Design:** The game is built using HTML, CSS, and JavaScript, ensuring it works well on various devices.
- **Smooth Animations:** The game includes smooth animations for placing X and O, enhancing the user experience.
- **Efficient AI:** The AI employs alpha-beta pruning and heuristics to make decisions quickly and efficiently.

## 🖥️ Demo

You can try out the game live [here](https://tic-tac.static.domains/).

## 📂 Project Structure

```
.
├── index.html    # The main HTML file
├── style.css     # The CSS file for styling the game
└── script.js     # The JavaScript file containing the game logic
```

The project is organized into three separate files for better structure and maintainability.

## 🧠 How It Works

### Minimax Algorithm

The AI uses the **Minimax algorithm** to evaluate all possible moves and choose the one that leads to the best outcome. The algorithm considers all potential future states of the board and selects the move that maximizes the AI's chances of winning while minimizing the player's chances.

### Heuristics and Optimizations

To enhance performance and decision-making:
- **Alpha-Beta Pruning**: Reduces the number of nodes the AI evaluates in the Minimax algorithm, making it faster and more efficient.
- **Move Ordering**: Prioritizes moves that are more likely to lead to a win, such as taking the center or corners first.
- **Early Stopping**: The AI detects potential threats and opportunities, allowing it to react quickly to the player's moves.

## 🎮 How to Play

1. **Select Turn**: Choose whether you or the AI goes first.
2. **Make Your Move**: Click on any empty tile to place your mark (O). The AI will respond immediately with its move (X).
3. **Win or Draw**: Continue playing until either you win, the AI wins, or the game results in a tie.

## 💻 Installation

1. Clone the repository:
   ```
   git clone https://github.com/aminshahid573/Unbeatable-Tic-Tac-Toe.git
   ```
2. Open `index.html` in your preferred browser.

## 🤝 Contributing

Contributions are welcome! If you have ideas for improving the game or optimizing the AI further, feel free to submit a pull request.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---

Enjoy the game, and try your best to beat the unbeatable AI! 😎

---
