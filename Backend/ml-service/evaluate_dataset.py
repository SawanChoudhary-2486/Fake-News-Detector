import pandas as pd
import time

from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)

from model import predict, MODEL_NAME

print("\n====================================")
print("FAKE NEWS MODEL EVALUATION")
print("====================================")

print(f"\nModel Under Test: {MODEL_NAME}\n")

print("Loading datasets...\n")

# ==========================================
# LOAD DATASETS
# ==========================================

fake_df = pd.read_csv("Fake.csv")
real_df = pd.read_csv("True.csv")

# ==========================================
# BALANCED SUBSET
# ==========================================

fake_df = fake_df.sample(10000, random_state=42)
real_df = real_df.sample(10000, random_state=42)

fake_df["label"] = "FAKE"
real_df["label"] = "REAL"

# ==========================================
# COMBINE DATASETS
# ==========================================

df = pd.concat([fake_df, real_df]).reset_index(drop=True)

print(f"Total Samples : {len(df)}")
print(f"Fake Samples  : {len(fake_df)}")
print(f"Real Samples  : {len(real_df)}\n")

# ==========================================
# EVALUATION VARIABLES
# ==========================================

y_true = []
y_pred = []

total_latency = 0

overall_start = time.time()

print("Running evaluation...\n")

# ==========================================
# MAIN EVALUATION LOOP
# ==========================================

for count, (_, row) in enumerate(df.iterrows(), start=1):

    text = row["text"]
    actual = row["label"]

    try:

        start = time.time()

        result = predict(text)

        end = time.time()

        latency = end - start

        total_latency += latency

        predicted = result["label"]

        y_true.append(actual)
        y_pred.append(predicted)

        # Print every 100 samples
        if count % 100 == 0:

            print(
                f"[{count}/{len(df)}] "
                f"Actual: {actual} | "
                f"Predicted: {predicted} | "
                f"Confidence: {result['confidence']:.4f} | "
                f"Latency: {latency:.4f}s"
            )

    except Exception as e:

        print(f"ERROR at sample {count}: {e}")

overall_end = time.time()

# ==========================================
# METRICS
# ==========================================

accuracy = accuracy_score(y_true, y_pred)

precision = precision_score(
    y_true,
    y_pred,
    average="macro"
)

recall = recall_score(
    y_true,
    y_pred,
    average="macro"
)

f1 = f1_score(
    y_true,
    y_pred,
    average="macro"
)

avg_latency = total_latency / len(y_true)

# ==========================================
# REPORTS
# ==========================================

print("\n====================================")
print("CLASSIFICATION REPORT")
print("====================================\n")

print(classification_report(y_true, y_pred))

print("\n====================================")
print("CONFUSION MATRIX")
print("====================================\n")

print(confusion_matrix(y_true, y_pred))

print("\n====================================")
print("ADDITIONAL METRICS")
print("====================================\n")

print(f"Accuracy               : {accuracy:.4f}")
print(f"Precision              : {precision:.4f}")
print(f"Recall                 : {recall:.4f}")
print(f"F1 Score               : {f1:.4f}")
print(f"Average Inference Time : {avg_latency:.4f} sec")

print(
    f"Total Evaluation Time  : "
    f"{overall_end - overall_start:.2f} sec"
)

print("\n====================================")
print("EVALUATION COMPLETED")
print("====================================\n")
