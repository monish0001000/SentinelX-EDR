# 🛡️ SentinelX EDR

<div align="center">
  <h3>Enterprise AI-Powered Endpoint Detection & Response Platform</h3>
  <p>Real-Time Telemetry • Threat Hunting • AI Investigation • Detection Engineering</p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-blue.svg?logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/FastAPI-0.100+-009688.svg?logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/React-18.2-61DAFB.svg?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/OSQuery-5.11+-4B275F.svg?logo=linux&logoColor=white" alt="OSQuery" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED.svg?logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License" />
  <img src="https://img.shields.io/badge/Phase-13.1-brightgreen.svg" alt="Phase" />
</p>

---

## 📖 Why SentinelX?

Modern threats move faster than traditional SIEMs can process. We built SentinelX to solve the gap between **raw telemetry** and **actionable security intelligence**. 

- **Why OSQuery?** It provides unparalleled visibility into endpoints by exposing the operating system as a high-performance relational database.
- **Why Real-Time?** By utilizing WebSockets and event-driven architecture, SOC analysts see alerts the second a process executes or a socket opens, minimizing the dwell time of adversaries.
- **Why AI?** Security engineers are overloaded with alert fatigue. SentinelX leverages LLMs to automatically investigate anomalous behavior, generating human-readable context before the analyst even opens the alert.

---

## 📊 Project Metrics & Status

```text
Current Status
----------------------------------
Backend Modules      : 14
Frontend Pages       : 8
API Endpoints        : 32+
Detection Rules      : 45
Implemented Features : 16
Development Phase    : 13.1 (UI & RBAC Refinement)
```

## ✨ Enterprise Features Matrix

| Feature | Status | Description |
|---|:---:|---|
| **Live Telemetry** | ✅ | Continuous OSQuery ingestion & processing |
| **Detection Engine** | ✅ | Rule-based (Sigma) & heuristic evaluation |
| **WebSockets** | ✅ | Instant push alerts and agent status updates |
| **RBAC** | ✅ | Granular Role-Based Access Control |
| **Audit Logs** | ✅ | Immutable historical tracking of SOC actions |
| **Threat Hunting** | ✅ | Manual SQL queries against endpoints |
| **AI Investigation** | ✅ | Automated contextual analysis via LLMs |
| **Multi-Endpoint** | 🚧 | Fleet grouping and mass policy deployment |
| **Threat Intel** | 🚧 | Automated external IOC feed integration |
| **Correlation Engine** | 🚧 | Multi-host, time-series anomaly detection |
| **Evidence Locker** | 🚧 | Secure hashing and artifact storage |
| **Reporting** | 🚧 | Automated PDF compliance generation |

---

## 🎯 MITRE ATT&CK Coverage

SentinelX aligns its detection engineering directly with the MITRE ATT&CK framework:

- [x] **Execution**: Catching malicious parent-child process chains.
- [x] **Persistence**: Monitoring autorun keys, scheduled tasks, and services.
- [x] **Discovery**: Detecting excessive `net` or `whoami` enumeration.
- [x] **Credential Access**: Identifying LSASS dumping or registry SAM extraction.
- [x] **Command & Control**: Flagging suspicious outbound beacons to known bad IPs.
- [x] **Defense Evasion**: Spotting log clearing and security tool tampering.

---

## 📸 Demo & Screenshots

> **Note:** Screenshots are currently placeholders while we gather final captures of the Phase 13 UI. Place actual images in `docs/images/`.

### Live Incident Response (Demo)
*A 30-second GIF demonstrating OSQuery triggering an alert to the Dashboard, followed by an AI investigation.*
![Demo Placeholder](docs/images/demo.gif)

### Core Interfaces
- **Dashboard Overview**: `docs/images/dashboard.png`
- **Interactive Threat Hunting**: `docs/images/threat-hunting.png`
- **AI Investigations**: `docs/images/investigations.png`

---

## 📚 Documentation

To keep this README concise and maintainable, deep-dive documentation is split into dedicated files:

- 🏛️ [**Architecture Details**](ARCHITECTURE.md) - System design, data flow, and Mermaid diagrams.
- 🔌 [**API Reference**](API.md) - Endpoints, WebSocket events, and authentication details.
- 🚀 [**Deployment Guide**](DEPLOYMENT.md) - Local, Docker, and Production installation steps.
- 🔒 [**Security Model**](SECURITY.md) - Threat modeling, RBAC matrices, and JWT lifecycle.
- 📝 [**Changelog**](CHANGELOG.md) - Detailed version history and phase tracking.
- 🤝 [**Contributing**](CONTRIBUTING.md) - How to submit PRs and code standards.

---

## 🛣️ Upcoming Milestones

- [ ] **Multi-Agent Fleet**: Advanced fleet management and staggered OSQuery updates.
- [ ] **IOC Intelligence**: Seamless integration with OTX AlienVault and MISP.
- [ ] **Correlation Engine**: Correlating disparate events into singular high-confidence alerts.
- [ ] **Evidence Locker**: Cryptographically secure forensic artifact storage.
- [ ] **PDF Reports**: Scheduled executive SOC summaries.
- [ ] **Production Release**: Final hardening, PostgreSQL migration, and v1.0 tag.

---

## 👨‍💻 Author

**Monish**  
*Cybersecurity Student & Aspiring Security Engineer*  
GitHub: [https://github.com/monish0001000](https://github.com/monish0001000)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
