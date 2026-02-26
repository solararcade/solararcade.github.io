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

// Wait until gamesData is loaded
function waitForGamesData() {
  if (typeof gamesData !== "undefined" && gamesData.length > 0) {
    applyNewTabGames();
  } else {
    setTimeout(waitForGamesData, 100); // check again in 100ms
  }
}

// Function to update new games
function applyNewTabGames() {
  const gamesContainer = document.getElementById("gamesContainer");

  // Go through each game in the container
  gamesContainer.querySelectorAll(".game").forEach((gameDiv, index) => {
    const game = gamesData[index]; // match with the gamesData array

    if (game && game.new) {
      const gameImage = gameDiv.querySelector("img");
      if (gameImage) {
        // Override click to open in a new tab
        gameImage.onclick = () => {
          window.open(game.url, "_blank");
        };
      }
    }
  });
}



/* ============================= */
/* SOLAR ONBOARDING + SETTINGS  */
/* ============================= */

/* Custom Top Games (your list) */
const solarTopGames = [
  { name: "Baldi's Basics", image: "https://ogs.creatyc.com/cdn/baldis-basics/splash.png", url: "https://solararcade.github.io/cdn/baldisbasics" },
  { name: "Balatro", image: "https://highschoolmathteachers.com/stuff/games/balatro.jpg", url: "https://highschoolmathteachers.com/stuff/selfhosted/balatro/" },
  { name: "BitLife", image: "https://ogs.creatyc.com/cdn/bitlife/splash.png", url: "https://ogs.creatyc.com/cdn/bitlife" },
  { name: "Blox Fruits", image: "https://lh3.googleusercontent.com/d/18OhYxRfP1C-ufhvjtybdEtXm8aehBtjy=s220?authuser=0", url: "https://solararcade.github.io/cdn/bloxfruitsredirect" },
  { name: "Soundboard", image: "https://ogs.creatyc.com/cdn/soundboard/img/mlg-favicon.png", url: "https://ogs.creatyc.com/cdn/soundboard" }
];

/* Themes */
const solarThemes = {
  default: "#0f0f0f",
  midnight: "#0c1022",
  sunset: "#2a0f18",
  ocean: "#0f1f2a"
};

/* Apply theme */
function applyTheme(theme) {
  document.documentElement.style.setProperty('--solar-bg', solarThemes[theme]);
  localStorage.setItem("solarTheme", theme);
}

/* Create Settings Button */
function createSettingsButton() {
  const btn = document.createElement("div");
  btn.id = "solarSettingsButton";
  btn.textContent = "Settings";
  btn.onclick = showThemePopup;
  document.body.appendChild(btn);
}

/* Show Theme Settings */
function showThemePopup() {
  createPopup("Choose Theme", `
    <div class="solar-themes">
      ${Object.keys(solarThemes).map(t => `
        <div class="theme-card" onclick="selectTheme('${t}')">
          <div class="theme-preview" style="background:${solarThemes[t]}"></div>
          ${t.charAt(0).toUpperCase() + t.slice(1)}
        </div>
      `).join("")}
    </div>
  `, false);
}

/* Select Theme */
window.selectTheme = function(theme) {
  applyTheme(theme);
  closePopup();
};

/* Create popup */
function createPopup(title, content, showNext = true, nextAction = null) {
  closePopup();
  document.body.classList.add("solar-blur");

  const overlay = document.createElement("div");
  overlay.id = "solarWelcomeOverlay";

  const popup = document.createElement("div");
  popup.className = "solar-popup";

  popup.innerHTML = `
    <h1>${title}</h1>
    ${content}
    ${showNext ? `<button class="solar-next">Next</button>` : ""}
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  if (showNext && nextAction) {
    popup.querySelector(".solar-next").onclick = nextAction;
  }
}

/* Close popup */
function closePopup() {
  document.body.classList.remove("solar-blur");
  const existing = document.getElementById("solarWelcomeOverlay");
  if (existing) existing.remove();
}

/* Step 1 */
function showIntro() {
  createPopup(
    "Welcome to Solar",
    `<p>Solar is simple, enjoyable, and built for fast access to fun games.</p>`,
    true,
    showThemeSelection
  );
}

/* Step 2 */
function showThemeSelection() {
  createPopup(
    "Choose Your Theme",
    `<div class="solar-themes">
      ${Object.keys(solarThemes).map(t => `
        <div class="theme-card" onclick="selectTheme('${t}')">
          <div class="theme-preview" style="background:${solarThemes[t]}"></div>
          ${t.charAt(0).toUpperCase() + t.slice(1)}
        </div>
      `).join("")}
    </div>`,
    true,
    showTopGames
  );
}

/* Step 3 */
function showTopGames() {
  createPopup(
    "Top Games",
    `<div class="solar-top-games">
      ${solarTopGames.map(g => `
        <div class="game" onclick="window.open('${g.url}','_blank')">
          <img src="${g.image}">
          <p>${g.name}</p>
        </div>
      `).join("")}
    </div>`,
    true,
    finishOnboarding
  );
}

/* Finish */
function finishOnboarding() {
  localStorage.setItem("solarOnboarded", "true");
  closePopup();
}

/* Init */
window.addEventListener("DOMContentLoaded", () => {
  createSettingsButton();

  const savedTheme = localStorage.getItem("solarTheme") || "default";
  applyTheme(savedTheme);

  if (!localStorage.getItem("solarOnboarded")) {
    showIntro();
  }
});
