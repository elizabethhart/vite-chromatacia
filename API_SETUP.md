# API Proxy Setup with Cloudflare Workers

This application now uses a Cloudflare Worker to proxy Google Books API requests, providing better CORS handling and request management.

## Setup Instructions

### 1. Install Dependencies

```bash
yarn install
```

### 2. Development Mode

#### Option A: Run both frontend and worker with proxy (Recommended)

```bash
# This runs both the worker and Vite dev server with API proxy
yarn dev:full
```

#### Option B: Run both services manually

```bash
# Terminal 1: Start the Cloudflare Worker
yarn dev:worker

# Terminal 2: Start the Vite development server (with API proxy)
yarn dev
```

#### Option C: Frontend only (API calls will fail)

```bash
yarn dev
```

### 3. Deploy to Cloudflare

```bash
# Build the application
yarn build

# Deploy to Cloudflare Workers
yarn deploy
```

## API Endpoint

The worker provides a single endpoint:

- `GET /api/books?q={searchQuery}` - Proxies requests to Google Books API

## Benefits of This Setup

1. **CORS Handling**: The worker handles CORS headers automatically
2. **Rate Limiting**: Built-in retry logic with exponential backoff
3. **Error Handling**: Centralized error handling and logging
4. **Performance**: Requests are served from Cloudflare's edge network
5. **Security**: API keys and sensitive logic can be kept server-side

## Configuration

The worker configuration is in `wrangler.jsonc`:

- Main script: `src/worker.ts`
- Route pattern: `/api/books`
- Assets served from `./dist` directory

## Development Notes

- The worker handles retries and rate limiting automatically
- CORS is configured to allow all origins (`*`) - consider restricting this in production
- The frontend now makes requests to `/api/books` instead of directly to Google Books API
- All retry logic has been moved from the client to the worker
