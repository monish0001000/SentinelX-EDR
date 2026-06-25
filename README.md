# SentinelX EDR 🛡️

![SentinelX EDR](https://img.shields.io/badge/SentinelX-EDR-3B82F6?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

An advanced, AI-powered Endpoint Detection and Response (EDR) platform designed for modern Security Operations Centers (SOC). SentinelX integrates real-time telemetry collection, multi-layered threat detection, and a multi-agent AI pipeline to automatically investigate and respond to cyber threats.

## 🌟 Key Features

### 🔍 Threat Detection Engine
- **Sigma Rules**: Custom engine to parse and evaluate standard Sigma YAML rules against live telemetry.
- **IOC Matching**: Real-time matching against malicious IP addresses, domains, and file hashes.
- **Behavioral Heuristics**: Detects advanced living-off-the-land (LotL) techniques, anomalous parent-child relationships, reverse shells, and credential dumping.

### 🤖 Multi-Agent AI Pipeline
Powered by Gemini 2.0 Flash (with OpenRouter fallbacks):
- **Detection Agent**: Initial triage and false-positive reduction.
- **Threat Hunter Agent**: Deep-dive analysis querying historical telemetry and hunting for persistence.
- **Incident Analyst Agent**: Correlates data, maps findings to the MITRE ATT&CK framework, and generates a threat timeline.
- **Response Planner Agent**: Suggests containment strategies (e.g., process termination, endpoint isolation).
- **Rule Suggestion Agent**: Automatically generates new YARA/Sigma rules based on analyzed incidents.

### 📊 Modern SOC Dashboard
- **Real-time Metrics**: View MTTD (Mean Time To Detect), alert volume, and system health in a sleek, dark-mode dashboard.
- **Threat Graph**: Interactive force-directed graph (D3.js) visualizing relationships between processes, users, and network connections.
- **Attack Simulation**: Built-in benign simulation engine to validate detection coverage against realistic scenarios.
- **Case Management**: Collaborate on investigations, track evidence, and generate SOC-ready markdown reports.

## 🏗️ Architecture

SentinelX EDR is built on a modular, microservice-ready architecture:

- **Frontend**: React (Vite), Tailwind CSS v3, Recharts, D3.js.
- **Backend**: Python 3.11+, FastAPI, SQLAlchemy, Pydantic, WebSockets.
- **Database**: SQLite (default for development/testing), fully compatible with PostgreSQL for production deployments.

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+ & npm
- (Optional) Gemini API Key for AI features

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```
2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
3. **Configure Environment:**
   Copy `.env.example` to `.env` (or create one) and add your `GEMINI_API_KEY`.
4. **Run the server:**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   The API will be available at `http://localhost:8000` with Swagger documentation at `http://localhost:8000/docs`.

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The dashboard will be available at `http://localhost:5173`.

## 📁 Project Structure

```
SentinelX EDR/
├── backend/
│   ├── app/
│   │   ├── api/          # API Routers (Alerts, Telemetry, Cases, etc.)
│   │   ├── core/         # Config, Security, WebSockets
│   │   ├── models/       # SQLAlchemy ORM Models
│   │   ├── schemas/      # Pydantic validation schemas
│   │   ├── services/     # Core logic (Detection, AI Agents, Graph, etc.)
│   │   └── plugins/      # Custom detection plugins
│   ├── main.py           # FastAPI application entry point
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components (DataTable, StatCard, Graph)
│   │   ├── layouts/      # Dashboard layouts and sidebars
│   │   ├── pages/        # Views (Alerts, Investigations, Endpoints)
│   │   └── App.jsx       # React Router setup
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## 🛡️ License

This project is licensed under the MIT License - see the LICENSE file for details.

---
*Built with ❤️ for Security Engineers and Threat Hunters.*
