from fastapi import FastAPI, HTTPException
import requests
from bs4 import BeautifulSoup

from model import predict

app = FastAPI(title="Fake News Detection ML Service")

def extract_text_from_url(url: str) -> str:
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "lxml")

        paragraphs = soup.find_all("p")
        text = " ".join(p.get_text() for p in paragraphs)

        if len(text.strip()) < 100:
            raise ValueError("Not enough text extracted")

        return text

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/predict")
def predict_from_url(payload: dict):
    if "url" not in payload:
        raise HTTPException(status_code=400, detail="URL is required")

    url = payload["url"]

    article_text = extract_text_from_url(url)

    result = predict(article_text)

    return result
