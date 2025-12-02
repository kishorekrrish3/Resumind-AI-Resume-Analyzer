# 🔎 AI Resume Analyzer

A lightweight AI-powered resume analyzer built with **React + Vite** (React Router), using **Puter.js** as the serverless backend for file storage, AI inference, and hosting. Upload a resume (PDF / TXT), let the AI extract key info (skills, experience, education) and get actionable feedback for ATS compatibility and job-fit.

Live demo: *(https://marshmello-resumind.vercel.app/)*
Repo: [https://github.com/kishorekrrish3/AI-Resume-Analyzer](https://github.com/kishorekrrish3/AI-Resume-Analyzer). ([GitHub][1])

---

## 🚀 Highlights

* Frontend built with **React + Vite** and **React Router** (project scaffold based on the React Router template). ([GitHub][1])
* Uses **Puter.js** for serverless backend tasks: file uploads, database, AI (OpenAI/Claude/Gemini access via Puter), and instant deployment — no separate backend servers or API keys required. ([Puter.js][2])
* Easy local dev with Vite (dev server default: `http://localhost:5173`). ([GitHub][1])
* Dockerfile included for containerized runs and production deployment. ([GitHub][1])

---

## 🧭 Table of Contents

* [Tech Stack](#-tech-stack)
* [How It Works (High-level)](#-how-it-works-high-level)
* [Quick Start (Local)](#-quick-start-local)
* [Environment & Puter.js notes](#-environment--puterjs-notes)
* [Docker](#-docker)
* [Deploying with Puter (recommended for no-server deploy)](#-deploying-with-puter-recommended-for-no-server-deploy)
* [Project Structure](#-project-structure)
* [Roadmap & Ideas](#-roadmap--ideas)
* [Contributing](#-contributing)
* [License](#-license)

---

## 🧱 Tech Stack

* React (Vite) — Frontend SPA
* React Router (configured via `react-router.config.ts`)
* Puter.js — serverless backend, file storage, AI (inference) and hosting. ([Puter.js][2])
* JavaScript (project is mainly JS)
* Docker (optional)
* Optional: PostHog / analytics (if added)

---

## ⚙️ How it works (high-level)

1. User uploads a resume (PDF / TXT / DOCX) via the frontend.
2. The file is stored / proxied using **Puter.js** (which provides client-side hooks for storage and backend worker calls). Puter handles authentication, storage, AI model calls and isolates credentials — so you don’t keep API keys in the client. ([Puter.js][3])
3. A Puter worker or API call runs an AI analysis (LLM call) to extract sections (skills, experience, education), score ATS friendliness, and return suggestions.
4. Frontend displays parsed fields, key highlights, and an improvement checklist.

---

## 🔧 Quick Start (Local)

> Clone and run the Vite dev server.

```bash
# 1. Clone
git clone https://github.com/kishorekrrish3/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer

# 2. Install
npm install

# 3. Dev server
npm run dev
# Open: http://localhost:5173
```

The repo uses the React Router starter template and Vite HMR for fast development. ([GitHub][1])

---

## 🔐 Environment & Puter.js notes

This project is designed to use Puter.js for backend and AI functionality. Depending on how you wired Puter into the project (script tag or SDK), follow Puter docs — they provide zero-key, serverless access to AI & storage.

Minimal steps / guidance:

1. Add Puter.js script (if project uses the client script approach):

```html
<!-- in index.html (if using script) -->
<script src="https://js.puter.com/v2/"></script>
```

2. Common environment needs (if any server-side config or worker names are used) — keep them in `.env` / `.env.local`. Puter also supports programmatic workers and hosting through their dashboard / API. ([Puter.js][3])

> Note: Puter abstracts API keys/server logic; consult Puter docs for best practices (auth flows, worker creation, storage paths). ([Puter.js][2])

---

## 🐳 Docker

A `Dockerfile` is included in the repo (useful for containerized hosting). Example build/run steps (adapt to your Dockerfile):

```bash
# build
docker build -t ai-resume-analyzer .

# run locally (expose port the app serves; adjust if your Dockerfile serves on 3000)
docker run -p 3000:3000 ai-resume-analyzer
```

The repo README / template also includes Docker guidance for deploying to cloud container platforms. ([GitHub][1])

---

## ☁️ Deploying with Puter (no-server / instant)

Puter provides hosting & automatic deployment for client apps — perfect for this project if you want a zero-config deployment. Steps (summary):

1. Create a Puter account and connect your GitHub repo (or upload build).
2. Configure any Puter workers (if you rely on server-side worker code for resume parsing).
3. Publish — Puter will create a live URL and handle storage / API routing.

See Puter’s hosting & Next.js/Static deployment guides for details and examples. ([developer.puter.com][4])

---

## 📁 Project Structure (example)

> Based on the repo's file layout (React Router template + your app files):

```
AI-Resume-Analyzer/
├── app/ or src/                  # React app source (components, pages, hooks)
├── public/                       # Static assets
├── react-router.config.ts        # Router configuration (routes)
├── vite.config.ts                # Vite configuration
├── Dockerfile                    # Containerization
├── package.json
├── tsconfig.json (if TS used)
└── README.md
```

You can expand this to list exact components and Puter worker files if you want the README to include a full tree.

---

## 🛣️ Roadmap & Ideas

* ✅ Core resume parsing & scoring
* 🔁 Add resume versioning + history (store previous uploads)
* 🧾 Export suggestions as downloadable PDF / email
* 🔐 Add authentication & user dashboards (Puter supports auth)
* ⚙️ Add multiple LLM backends and model selection (Puter supports GPT/Claude/Gemini)
* 📈 Integrate analytics (PostHog) to measure conversion & feature usage

---

## 🤝 Contributing

Contributions welcome! A recommended flow:

1. Fork → Create a feature branch
2. `npm install` → `npm run dev` → make changes
3. Open a PR with a clear description and testing steps

---

## 📄 License

Add a `LICENSE` file (MIT recommended) and state licensing if you want this project to be open source.

---

## 🔗 Useful links & references

* Repo (this project): [https://github.com/kishorekrrish3/AI-Resume-Analyzer](https://github.com/kishorekrrish3/AI-Resume-Analyzer). ([GitHub][1])
* Puter.js docs (getting started, auth, storage, AI): [https://docs.puter.com/](https://docs.puter.com/) and [https://developer.puter.com/](https://developer.puter.com/). ([Puter.js][2])
* Puter hosting / deploy tutorial: developer.puter.com (deploy guides). ([developer.puter.com][4])
* React Router template & README (Vite dev server & template features). ([GitHub][1])

---

