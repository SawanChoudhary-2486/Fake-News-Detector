from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

MODEL_NAME = "jy46604790/Fake-News-Bert-Detect"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)

model.eval()

def predict(text: str):
    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=512
    )

    with torch.no_grad():
        outputs = model(**inputs)

    probs = torch.softmax(outputs.logits, dim=1)
    confidence, predicted_class = torch.max(probs, dim=1)

    label = "FAKE" if predicted_class.item() == 1 else "REAL"

    return {
        "label": label,
        "confidence": round(confidence.item(), 4)
    }
