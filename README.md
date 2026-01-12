# Fake News Detector 📰🔍

A full‑stack **Fake News Detection system** built as a **7th Semester Capstone Project**.
The system analyzes news content or URLs and predicts whether the news is **REAL or FAKE** using a Machine Learning model, while storing analysis results in MongoDB.

---

## 🚀 Project Overview

The Fake News Detector is designed to demonstrate:

* End‑to‑end system design (Backend + ML + Database)
* REST API communication
* Practical deployment and testing
* Reliability after system reboot / shutdown

The project is intentionally kept **simple, stable, and demo‑friendly** for academic evaluation.

---

## 🧱 System Architecture

```
Client (curl / Postman)
        ↓
Node.js Backend (Express)
        ↓
Python ML Service (FastAPI)
        ↓
MongoDB (Docker container)
```

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* Mongoose
* dotenv

### Machine Learning Service

* Python
* FastAPI
* Transformers / Torch (pre‑trained model)

### Database

* MongoDB 6.0 (Docker container)

### DevOps / Tools

* Docker (only for MongoDB)
* curl (API testing)
* npm

---

## 📂 Project Structure

```
Fake News Detector/
├── Backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── models/
│
├── ml-service/
│   ├── app.py
│   ├── requirements.txt
│   └── model/
│
└── README.md
```

---

## ⚙️ Environment Configuration

### Backend `.env`

Create a `.env` file inside the `Backend/` directory:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/fake_news_db
```

---

## ▶️ How to Run the Project (Clean & Reliable)

### 1️⃣ Start MongoDB (Docker)

```bash
docker run -d \
  --name mongo-fake-news \
  --network host \
  mongo:6.0

```

Verify:

```bash
docker ps
```

---

### 2️⃣ Start Backend Server

```bash
cd Backend
npm install
npm start
```

Expected output:

```
🌑 Server running on http://localhost:5000
🗄️ MongoDB connected
```

---

### 3️⃣ Start ML Service

```bash
cd ml-service
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000
```

Expected:

```
Uvicorn running on http://localhost:8000
```

---

## 🧪 API Testing

### Test ML Service Directly

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

Sample Response:

```json
{
  "label": "REAL",
  "confidence": 0.9931
}
```

---

### Test Full Backend Flow

```bash
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

---

## 🔁 Demonstration After Shutdown (Important for Evaluation)

After restarting the system or laptop:

```bash
docker start mongo-fake-news
cd Backend
npm start

```
```bash1
cd "Fake News Detector/Backend/ml-service"
source venv/bin/activate
uvicorn app:app --host 0.0.0.0 --port 8000
```

That’s it. The system works without rebuilding or reconfiguration.

---

## Troubleshooting

> **Note:** On some Linux systems, Docker bridge networking may fail after a system reboot, causing MongoDB connection timeouts.
>
> To ensure reliable local development, MongoDB is run using Docker’s **host network mode**:
>
> ```bash
> docker run -d --name mongo-fake-news --network host mongo:6.0
> ```

## 📌 Key Features

* Fake vs Real classification
* Confidence score output
* MongoDB persistence
* REST API based architecture
* Restart‑safe design

---

## ⚠️ Known Limitations

* Model accuracy depends on training data
* URL scraping may fail for blocked websites
* Heavy ML dependencies increase startup time

---

## 🎓 Academic Notes

This project focuses on:

* System integration
* Practical deployment
* Debugging and reliability

Rather than chasing complex orchestration, the design prioritizes **clarity and correctness**, making it ideal for academic demonstrations.

---

## 👤 Author

**Capstone Project – 7th Semester**
Fake News Detector

---

## ✅ Conclusion

This project demonstrates a complete, working Fake News Detection pipeline that can be reliably tested, restarted, and evaluated with minimal setup.

