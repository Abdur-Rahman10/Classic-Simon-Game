# 🎮 Classic Simon Game

A highly polished, interactive web-based version of the classic memory game **Simon**. Test your memory by repeating an increasingly long sequence of colors and sounds. 

This version goes beyond the basics, featuring a retro arcade aesthetic, unlockable themes, progressive difficulty, particle effects, and full mobile responsiveness.

### 🔗 [Play the Live Game Here!](https://abdur-rahman10.github.io/Classic-Simon-Game/)

---

## ✨ Features

* **🧠 Progressive Difficulty:** A visual progress bar acts as a timer. As you reach higher levels, the time you have to complete the sequence decreases!
* **🏆 High Score Tracking:** Your highest level is automatically saved in your browser's local storage so you never lose your progress.
* **🎨 Unlockable Themes:** Keep playing to unlock new custom CSS themes!
  * **Classic:** The default retro arcade look.
  * **Neon:** Unlocks at Level 5.
  * **Minimal:** Unlocks at Level 10.
* **⌨️ Keyboard Controls:** Play seamlessly on desktop using the `Q`, `W`, `A`, and `S` keys. (A built-in anti-spam lock prevents holding down keys to cheat).
* **✨ Visual Effects:** Custom CSS animations including blinking arcade text, button flashes, and particle explosions on every click.
* **📱 Mobile Optimized:** During active gameplay, the UI elements fade out and the game board dynamically snaps to the center of the screen for ergonomic thumb tapping.
* **🔊 Audio Controls:** Includes classic Simon sounds with a convenient mute toggle.

---

## 🕹️ How to Play

1. Press any key or tap the screen to start the game.
2. The game will flash a color and play a sound.
3. Click or use your keyboard to repeat the exact color.
4. Each round, a new color is added to the end of the sequence. 
5. You must replay the *entire* sequence from the beginning before the timer bar runs out!
6. If you click the wrong color or run out of time, it's Game Over.

### Keyboard Mapping:
* **Top Left (Green):** `Q`
* **Top Right (Red):** `W`
* **Bottom Left (Yellow):** `A`
* **Bottom Right (Blue):** `S`

---

## 🛠️ Built With

* **HTML5:** Semantic structure and accessible roles.
* **CSS3:** Flexbox, custom animations (`@keyframes`), absolute centering techniques, and media queries for responsive design.
* **JavaScript (jQuery):** Complex game state management, asynchronous sequence loops (`setInterval`/`setTimeout`), DOM manipulation, and `localStorage` API.

---

## 💻 Local Installation

If you'd like to run this project locally on your machine:

1. Clone this repository:
   ```bash
   git clone [https://github.com/Abdur-Rahman10/Classic-Simon-Game.git](https://github.com/Abdur-Rahman10/Classic-Simon-Game.git)
Navigate to the project directory:

Bash
```cd Classic-Simon-Game```
Open index.html in your preferred web browser. No local server is required!
