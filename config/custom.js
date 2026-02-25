window.addEventListener('DOMContentLoaded', () => {
  const music = new Audio('assets/solar-theme.mp3');
  music.loop = true;
  music.volume = 0.2; // adjust volume so it’s not overpowering

  // Try to play automatically; if blocked, play on first user interaction
  const playMusic = () => {
    music.play().catch(() => {
      console.log("Autoplay blocked, waiting for user interaction...");
    });
  };

  playMusic();

  // If autoplay blocked, play on first click or keypress
  ['click', 'keydown', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, playMusic, { once: true });
  });
});

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Select all game elements
  const gameElements = document.querySelectorAll("#gamesContainer .game");

  gameElements.forEach((gameDiv, index) => {
    // Assuming gamesData is your array from games.json
    const game = gamesData[index];

    // If the game is marked as new
    if (game.new === true) {
      const img = gameDiv.querySelector("img");
      if (img) {
        img.addEventListener("click", (e) => {
          e.preventDefault(); // prevent default behavior
          window.open(game.url, "_blank"); // open in new tab
        });
      }
    }
  });
});