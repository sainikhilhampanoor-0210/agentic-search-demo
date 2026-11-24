from pathlib import Path
import re
from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field, ConfigDict, field_validator

ROOT = Path(__file__).resolve().parent
app = FastAPI(title="Agentic product and order search")

class Query(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    query: str = Field(min_length=1, max_length=2000)
    previous_order: str | None = Field(default=None, pattern=r"^[A-Z]\d{4}$")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/", include_in_schema=False)
def home():
    return FileResponse(ROOT / "index.html")

@app.get("/app.mjs", include_in_schema=False)
def client():
    return FileResponse(ROOT / "server-client.mjs", media_type="text/javascript")

@app.get("/engine.mjs", include_in_schema=False)
def engine():
    return FileResponse(ROOT / "engine.mjs", media_type="text/javascript")

@app.get("/style.css", include_in_schema=False)
def style():
    return FileResponse(ROOT / "style.css")
ORDERS = {"A1042": "Shipped. Estimated delivery in two business days.", "B2077": "Processing. Estimated dispatch tomorrow."}
CATALOG = [
    ("Studio Headphones", 89, "audio wireless"), ("Travel Headphones", 129, "audio wireless"),
    ("Desk Microphone", 69, "audio voice usb"), ("Compact Keyboard", 55, "wireless office"),
    ("Travel Charger", 29, "usb power"),
]
@app.post("/api/query")
def query(request: Query):
    q = request.query.lower()
    order = re.search(r"\b[a-z]\d{4}\b", q)
    if order or re.search(r"\border\b", q):
        key = order[0].upper() if order else None
        return {"trace": "Order lookup", "answer": ORDERS.get(key, "Unknown sample order." if key else "Which order? Try A1042.")}
    price = re.search(r"\b(under|below|less than|at most|up to)\s*\$?(\d+(?:\.\d+)?)", q)
    terms = set(re.findall(r"[a-z]+", q.replace(price[0], "") if price else q))
    terms -= set("show find me a an the all please products items for with and dollars".split())
    matches = []
    for name, cost, tags in sorted(CATALOG, key=lambda item: item[1]):
        if price:
            limit = float(price[2])
            if cost > limit or (cost == limit and price[1] not in ("up to", "at most")):
                continue
        tokens = set((name.lower() + " " + tags).split())
        if all(any(t.rstrip("s") == w.rstrip("s") for w in tokens) for t in terms):
            matches.append({"name": name, "price": cost})
    return {"trace": "Catalog → filter → sort by price", "items": matches,
            "answer": "\n".join(f"{m['name']} — \u0024{m['price']}" for m in matches) or "No matching sample products."}
