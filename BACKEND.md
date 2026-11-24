# Python service

Run from the repository root with Python 3.12:

```sh
python -m pip install -r requirements.txt
python -m uvicorn service:app --host 0.0.0.0 --port 8000
```

Open http://localhost:8000 for the interactive client, /docs for the request schema and /health for readiness. Docker: `docker build -t portfolio-demo . && docker run --rm -p 8000:8000 portfolio-demo`.

Routes order IDs to a fictional order store and product requests to a catalog, filters by price and terms, and sorts the matches. The trace identifies the selected operation.

Independent portfolio implementation using fictional data. No hosted LLM, private company system, or cloud credentials required. Static hosting continues to use the browser implementation.
