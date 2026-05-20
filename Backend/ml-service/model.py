from transformers import pipeline
import torch

MODEL_NAME = "facebook/bart-large-mnli"
print(f"\n🔥 Loading model: {MODEL_NAME}\n")

device = 0 if torch.cuda.is_available() else -1

print(f"\nUsing device: {'GPU' if device == 0 else 'CPU'}\n")

classifier = pipeline(
    "zero-shot-classification",
    model=MODEL_NAME,
    device=device
)

print("\n===== PIPELINE INFO =====")
print("Pipeline task:", classifier.task)
print("Model class:", classifier.model.__class__.__name__)
print("Model name:", classifier.model.config._name_or_path)
print("=========================\n")

CANDIDATE_LABELS = [
    "credible news report",
    "misleading or unreliable news"
]


def predict(text: str):

    result = classifier(
        text[:2000],  # limit huge articles
        CANDIDATE_LABELS,
        multi_label=False
    )

    top_label = result["labels"][0]
    confidence = result["scores"][0]

    if top_label == "credible news report":
        label = "REAL"
    else:
        label = "FAKE"

    return {
        "label": label,
        "confidence": round(confidence, 4)
    }
