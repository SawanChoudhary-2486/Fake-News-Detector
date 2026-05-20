from fastapi import FastAPI, HTTPException
import requests
from bs4 import BeautifulSoup

from model import predict

from newspaper import Article

app = FastAPI(title="Fake News Detection ML Service")

def extract_text_from_url(url: str) -> str:
    try:
        print(f"\n🔗 Fetching URL: {url}")

        article = Article(url)

        article.download()
        article.parse()

        text = article.text

        print(f"📄 Extracted Text Length: {len(text)}")
        print(f"📄 First 500 chars:\n{text[:500]}")

        if len(text.strip()) < 100:
            raise ValueError("Not enough article text extracted")

        return text

    except Exception as e:
        print(f"❌ Extraction Error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/predict")
def predict_from_url(payload: dict):
    if "url" not in payload:
        raise HTTPException(status_code=400, detail="URL is required")

    url = payload["url"]

    article_text = extract_text_from_url(url)

    result = predict(article_text)

    return result
