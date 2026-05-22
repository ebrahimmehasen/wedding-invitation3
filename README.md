# 🌸 Wedding Invitation Website

A beautifully crafted, fully responsive, and elegant digital wedding invitation website built with HTML, CSS, and Vanilla JavaScript. Designed to offer a premium, cinematic experience for the guests with rich animations and interactive sections.

## ✨ Features

- **Cinematic Hero Section:** Auto-playing background video with immersive blur and fade animations for the couple's names.
- **Dynamic Countdown Timer:** An elegant flipping countdown timer that tracks days, hours, minutes, and seconds until the big day.
- **Floating Petals Animation:** Delicate, randomly generated rose petals that float across the screen for a romantic ambiance.
- **Interactive RSVP Form:** A fully styled and responsive RSVP section with validation, dynamic guest selection, and smooth success state transitions.
- **Scroll Reveal Effects:** Content sections gracefully fade and slide into view as the user scrolls down.
- **Sound Toggle Controller:** Allows users to easily toggle the background video audio with custom UI.
- **Easy Configuration:** No coding required to update the details! Simply modify the `config.js` file.

---

## 🛠️ How to Customize (No Coding Needed!)

All the text, dates, links, and media paths can be edited directly inside the `config.js` file. 

1. **Open `config.js`** in any text editor.
2. Edit the variables inside the `weddingConfig` object:
   - `brideName` & `groomName`
   - `weddingDate` (Must follow `YYYY-MM-DDTHH:mm:ss` format for the countdown)
   - `locationAddress` & `locationMapUrl` (Google Maps link)
   - `videoPath` (Path to your background MP4)
   - `backgroundImagePath` (Path to your section background image)

### Media Setup
- Place your high-quality background video in the root directory and name it `video.mp4` (or update the path in `config.js`).
- Place your background image (e.g., floral border) in the root directory and name it `flower.jpg`.

---

## 🚀 Running the Project locally

Since this project uses pure HTML, CSS, and JS with no build tools, running it is incredibly simple:

1. Clone or download this repository.
2. Ensure you have your `video.mp4` and `flower.jpg` added to the folder.
3. Simply double-click on `index.html` to open it in your browser.
*(Note: Some browsers require the site to be served via a local server to allow video autoplay with sound. You can use VS Code's "Live Server" extension for the best testing experience).*

---

## 💻 Tech Stack
- **HTML5:** Semantic structure and form validation.
- **CSS3:** Custom properties (variables), Flexbox, CSS Grid, Keyframe Animations, Backdrop filters.
- **JavaScript (ES6):** Dynamic configuration injection, Intersection Observer API, DOM manipulation.

## 🎨 Design System
- **Fonts:** `Cormorant Garamond` (Elegant Serif), `Montserrat` (Clean Sans-Serif).
- **Color Palette:** Warm creams, Rose Gold accents, Dusty Mauve, and Sage.
