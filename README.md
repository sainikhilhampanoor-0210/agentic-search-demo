# Agentic Search

A Python router selects a catalog or order lookup. Catalog queries extract price constraints, match search terms, and sort by price. The response includes a trace of the route taken.

[Try the browser demo](https://sainikhilhampanoor-0210.github.io/agentic-search-demo/) · [Open the Python app](https://agentic-search-demo1.onrender.com) · [Explore the API](https://agentic-search-demo1.onrender.com/docs)

## Try it

Search for `headphones under 100`, then try `order A1042`. The first request filters and sorts products. The second looks up a single order.

## Inside the repository

- [Python service](service.py) — request validation and query routing, catalog filters, and order lookup.
- [Web client](server-client.mjs) — sends requests to the Python service and displays the response.
- [Browser engine](engine.mjs) — powers the standalone GitHub Pages demo.

## Run locally

Follow the [FastAPI and Docker instructions](BACKEND.md). For the standalone browser version, run `python3 -m http.server 8000` from the repository root and open `http://localhost:8000`.

This portfolio demo uses fictional data. The hosted Python service runs on Render’s free tier and may take a moment to wake up.
