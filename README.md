# 🧭 Path Wise – Frontend App

**Path Wise** is a life-advice and spiritual guidance chatbot powered by Google Vertex AI with Retrieval-Augmented Generation (RAG).  
The AI engine is trained on carefully curated sermon content that explains how to live wisely and practically based on biblical principles.  
This repository contains the frontend application built with **React + TypeScript**, designed to interact with [a serverless backend](https://github.com/2ndPrince/path-wise-functions) via cloud functions.

### https://path-wise-792e5.web.app/

---

## 📘 Project Overview

- **Frontend**: React + TypeScript + Firebase Hosting
- **Backend**: Google Cloud Functions (Node.js), Vertex AI
- **Database**: Firestore (NoSQL)
- **Deployment**: GCP Cloud Run + Firebase Hosting

**Goal**: Provide users with AI-powered, biblical and practical responses to life questions through a clean and responsive web interface.

---

## 🛣 Roadmap

| Step | Description                                                                                     | Status        | Date Completed | Notes                              |
|------|-------------------------------------------------------------------------------------------------|---------------|----------------|------------------------------------|
| 1️⃣   | **Build Transcript Pool**: Collect and curate sermon transcripts via Google Drive               | ✅ Done        | 2025-06-15     | Google Drive + Python Script       |
| 2️⃣   | **Train Vertex AI RAG Engine**: Use transcript pool to fine-tune or configure RAG model         | ✅ Done        | 2025-06-20     | Vertex AI + Custom Retriever Setup |
| 3️⃣   | **Shadow Launch Testing**: Validate RAG engine performance via internal testing                 | ✅ Done        | 2025-06-24     | CLI & isolated prompt testing      |
| 4️⃣   | **Frontend Integration**: Connect trained engine to React frontend and enable conversation flow | ✅ Done        | 2025-07-01     | Firebase Hosting + Cloud Function  |
| 5️⃣   | **Performance Tuning**: Define benchmark dataset, compare models/parameters, optimize response | ⏳ In Progress | –              | Latency, relevance, cost analysis  |
| 6️⃣   | **Production Launch & Feature Expansion**: Add clickable references and production stability    | 🔜 Planned     | –              | Reference UX, analytics, logging   |

---

## ✨ Features

| Feature Description                              | Date Added | Date Finished | Status     | Commit |
|--------------------------------------------------|------------|----------------|------------|--------|
| User input form with message send button         | 2025-06-21 | 2025-06-21     | ✅ Done     | |
| Connect to backend function via fetch POST       | 2025-06-21 | 2025-06-22     | ✅ Done     | |
| Scroll to bottom on new message                  | 2025-06-21 | 2025-06-21     | ✅ Done     | |
| Message formatting for structured agent replies  | 2025-06-28 | 2025-06-28     | ✅ Done     | |
| Display loading spinner while waiting for response| 2025-07-01 | 2025-07-01     | ✅ Done     | [`15bf26c`](https://github.com/2ndPrince/path-wise/commit/15bf26cf581b07801b95d135de971722341193f0) |
| Structured Output with Reference | 2025-07-01 | | | | |
| Clear previous chat history | 2025-07-01 | | | | |
| Multiple Chat Sessions per User | 2025-07-01 | | | | |

---

## 🐛 Known Defects / Issues

| Description                                       | Reported On | Status        | Notes                          | Commit |
|--------------------------------------------------|-------------|----------------|--------------------------------|--------|
| Double response occasionally appears             | 2025-06-22  | ✅ Done        | Possibly due to re-rendering  | [`8d42106`](https://github.com/2ndPrince/path-wise/commit/8d42106af6a16215090a860f6551236554edf3e4)

---

## 🧩 Related Repositories

- [🔗 Backend Cloud Function](https://github.com/2ndPrince/path-wise-functions)

---

## 📌 Notes

- This frontend app is deployed via Firebase Hosting and communicates with a Cloud Function-based backend on GCP.
- RAG responses are formatted and displayed using a combination of `Accordion` and markdown-like styling.

---

## 📫 Contact

If you have questions or suggestions, feel free to open an issue or contact [astonisher88@gmail.com](mailto:astonisher88@gmail.com).
