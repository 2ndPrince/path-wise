# 🧭 Path Wise – Frontend App

**Path Wise** is a life-advice and spiritual guidance chatbot powered by Google Vertex AI with RAG (Retrieval-Augmented Generation).  
This repository contains the frontend code built with **React + TypeScript**, designed to interface with a cloud function backend.

### https://path-wise-792e5.web.app/

---

## 📘 Project Overview

- **Frontend**: React + TypeScript + Firebase Hosting
- **Backend**: Google Cloud Functions (Node.js), Vertex AI
- **Database**: Firestore (NoSQL)
- **Deployment**: GCP Cloud Run + Firebase Hosting

**Goal**: Provide users with AI-powered, biblical and practical responses to life questions through a clean and responsive web interface.

---

## ✨ Features

| Feature Description                              | Date Added | Date Finished | Status     | Commit |
|--------------------------------------------------|------------|----------------|------------|--------|
| User input form with message send button         | 2025-06-21 | 2025-06-21     | ✅ Done     | [`09a6b8c`](https://github.com/2ndPrince/path-wise/commit/09a6b8cb0a62cd9df19b38bb1f5a5ea04b2e4919) |
| Connect to backend function via fetch POST       | 2025-06-21 | 2025-06-22     | ✅ Done     | [`f48b2d1`](https://github.com/2ndPrince/path-wise/commit/f48b2d1c5d291c4ad89912dfbd2dc9e0f4e004ad) |
| Scroll to bottom on new message                  | 2025-06-21 | 2025-06-21     | ✅ Done     | [`7ce9a7a`](https://github.com/2ndPrince/path-wise/commit/7ce9a7ab2ae68db9999470b3e70a754a5c8700bc) |
| Message formatting for structured agent replies  | 2025-06-28 | 2025-06-28     | ✅ Done     | [`83a2bd7`](https://github.com/2ndPrince/path-wise/commit/83a2bd70ec25adcc1aa92e476503f4fdc60d69b3) |
| Display loading spinner while waiting for response| 2025-07-01 | 2025-07-01     | ✅ Done     | [`15bf26c`](https://github.com/2ndPrince/path-wise/commit/15bf26cf581b07801b95d135de971722341193f0) |

---

## 🐛 Known Defects / Issues

| Description                                       | Reported On | Status        | Notes                          |
|--------------------------------------------------|-------------|----------------|--------------------------------|
| Double response occasionally appears             | 2025-06-22  | ✅ Done        | Possibly due to re-rendering  |

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
