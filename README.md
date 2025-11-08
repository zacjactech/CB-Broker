# CB Broker - Crypto Trading Platform

A secure crypto trading broker platform with real-time trading capabilities.

## Project Structure

```
Broker/
├── frontend/          # Next.js frontend
├── backend/           # NestJS backend
└── CONTEXT.md         # Project documentation
```

## Setup

### Backend
```bash
cd backend
npm install
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and configure your environment variables.

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Zustand
- **Backend:** NestJS, TypeORM, PostgreSQL, Redis
- **Real-time:** WebSockets

## Documentation

See [CONTEXT.md](./CONTEXT.md) for detailed project documentation.
