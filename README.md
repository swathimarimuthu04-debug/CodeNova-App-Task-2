

> **CodeNova Internship Program · Batch 01 · App Development — Task 2**

A beautifully designed Progressive Web App (PWA) that displays random inspirational quotes with genre filtering, favorites management, and full offline support.





| Discover View | Favorites Tab | Genre Filtering |
|:-:|:-:|:-:|
| *Random quote with card design* | *Saved favorite quotes* | *Filter by genre categories* |

> *Replace the above with actual screenshots of your running app.*



- **Random Quote Display** — Shows a beautifully styled quote card on launch
- **"New Quote" Button** — Generates a random quote with smooth fade transitions
- **Genre Filtering** — Filter quotes by 8 categories: Inspiration, Wisdom, Motivation, Life, Science, Technology, Humor, Philosophy
- **Favorite Quotes** — Save/unsave quotes with heart button, persisted to localStorage
- **Favorites Tab** — Dedicated view showing all saved quotes with remove option
- **Author Attribution** — Displays author names with graceful "Unknown Author" fallback for missing data
- **Genre Tags** — Each quote displays a color-coded genre badge
- **Copy to Clipboard** — One-click quote copying
- **Share Quote** — Native Web Share API integration (mobile)
- **Offline Resilience** — Bundled 50-quote JSON dataset, no internet required
- **PWA Installable** — Works like a native app when added to home screen
- **Responsive Design** — Fluid layout from 360px to desktop
- **Keyboard Shortcuts** — Space/Enter for new quote, F to favorite


| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure, accessibility |
| **CSS3** | Custom properties, gradients, backdrop blur, animations |
| **Vanilla JavaScript** | App logic, localStorage API, Web Share API |
| **Service Worker** | Offline caching strategy |
| **Web App Manifest** | PWA metadata and installability |
| **Google Fonts** | Outfit + Playfair Display typography |


```
random-quote-generator/
├── index.html          # Main HTML entry point
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker for offline support
├── css/
│   └── style.css       # Complete design system & styles
├── js/
│   ├── quotes.js       # Bundled quotes dataset (50 quotes, 8 genres)
│   └── app.js          # Application logic (display, favorites, filtering)
├── icons/
│   └── favicon.svg     # App icon
└── README.md           # This file
```


- A modern web browser (Chrome, Edge, Firefox, Safari)
- No build tools, frameworks, or npm packages required



1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/random-quote-generator.git
   cd random-quote-generator
   ```

2. **Serve the files** (required for Service Worker)
   
   Option A — VS Code Live Server:
   - Install the "Live Server" extension in VS Code
   - Right-click `index.html` → "Open with Live Server"

   Option B — Python HTTP server:
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

   Option C — Node.js:
   ```bash
   npx serve .
   ```

3. **Use the app**
   - A random quote is displayed immediately on launch
   - Click **"New Quote"** for a new random quote
   - Use genre chips to filter by category
   - Click the **❤️ heart** to favorite a quote
   - Switch to the **Favorites** tab to view saved quotes
   - Click the **copy** icon to copy the quote text



The app includes a **built-in dataset of 50 curated quotes** across 8 genres:

| Genre | Count | Example Author |
|---|---|---|
| Inspiration | 7 | Steve Jobs, Einstein |
| Wisdom | 7 | Socrates, Aristotle |
| Motivation | 7 | Churchill, Confucius |
| Life | 7 | Dalai Lama, John Lennon |
| Science | 6 | Carl Sagan, Marie Curie |
| Technology | 5 | Bill Gates, Tim Berners-Lee |
| Humor | 5 | Oscar Wilde |
| Philosophy | 6 | Nietzsche, Sartre |

This dataset is bundled locally, ensuring the app works **completely offline** without any API dependency.



| Criteria | Status |
|---|---|
| Clean card-based quote presentation | ✅ |
| Quote text, author attribution, and genre tag displayed | ✅ |
| "New Quote" button with smooth transitions | ✅ |
| Favorite/save quotes to local list | ✅ |
| Offline resilience with bundled quotes | ✅ |
| App launches instantly with a valid quote | ✅ |
| Graceful fallback for missing author names | ✅ |
| Saved quotes persist locally (localStorage) | ✅ |
| Responsive design on all screen sizes | ✅ |



- **Warm Gradient Palette** — Orange → Pink → Violet creates an inviting, energetic mood
- **Serif Quotes** — Playfair Display italic for elegant quote presentation
- **Ambient Spheres** — Floating gradient blurs create depth and atmosphere
- **Glassmorphism Cards** — Frosted glass with backdrop blur for premium feel
- **Micro-animations** — Heart pop, card fade, button spin for engaging interactions
- **No External APIs** — 100% self-contained, zero network dependencies



This project is submitted as part of the CodeNova Internship Program (Batch 01).
Open source for educational purposes.



*Built with ❤️ for CodeNova App Development Internship*
