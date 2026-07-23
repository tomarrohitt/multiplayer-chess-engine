# Real-Time Multiplayer Chess

A real-time multiplayer chess platform built with **Next.js, Node.js, WebSockets, Redis, PostgreSQL, and BullMQ**.

The most difficult part of building a multiplayer chess application wasn't implementing chess rules. It was ensuring that players, spectators, clocks, and backend services remained perfectly synchronized despite network latency, reconnections, and distributed state.

## The Problem

In a real-time game, multiple clients observe and interact with the same state simultaneously.

Without a carefully designed synchronization strategy, several issues emerge:

### Clock Drift

Player A makes a move and their UI updates instantly.

The move takes time to reach the server and other clients. During that delay, clocks continue ticking independently, causing players to see different remaining times.

### Mid-Game Spectators

A spectator joining an ongoing match cannot replay the entire WebSocket stream from the beginning.

They need an accurate snapshot of the current game state immediately.

### Reconnection Recovery

A disconnected player may return after several moves have been played.

Their local state is stale and cannot be trusted.

The challenge is restoring the latest game state without replaying the entire match history.

## Solution: Redis as the Single Source of Truth

To eliminate state divergence, Redis acts as the authoritative source for all live game data.

### Stored State

* Board position
* Move history
* Current turn
* Clock values
* Last move timestamps
* Game metadata

Clients never calculate authoritative state independently. They only render server-provided data.

## Move Flow

```text
Client
  │
  ├─ Validate move locally (chess.js)
  │
  └─► WebSocket
          │
          ▼
      Server
          │
          ├─ Revalidate move (chess.js)
          ├─ Update Redis atomically
          └─ Broadcast new state
                 │
                 ├─ Player A
                 ├─ Player B
                 └─ Spectators
```

### Move Processing

1. Client validates move locally using `chess.js`
2. Move is sent to the server via WebSocket
3. Server validates the move again
4. Redis state is updated atomically
5. Updated game state is broadcast
6. All clients render from the same payload

## Clock Synchronization

The server owns the clocks.

Clients do not calculate official time.

Each state update contains authoritative timestamps from the server, preventing clock drift and ensuring all participants observe the same timing information.

## Spectator Hydration

When a spectator joins:

1. Request current game state via REST API
2. Receive snapshot from Redis
3. Subscribe to WebSocket updates

This provides instant synchronization without replaying historical events.

## Reconnection Strategy

### Client

* Exponential backoff

  * 1s
  * 2s
  * 4s
  * 8s
  * Maximum 5 attempts

### Server

When a connection is restored:

1. Re-establish WebSocket session
2. Fetch latest game state from Redis
3. Send authoritative snapshot
4. Resume real-time updates

Players continue from the current position without losing moves.

## Key Lesson

In real-time multi-user systems:

> If multiple clients can calculate authoritative state independently, they will eventually disagree.

The solution is a single source of truth.

Redis became that source, ensuring every player, spectator, and service operates from the same state at all times.

## Tech Stack

### Frontend

* Next.js
* TypeScript

### Backend

* Node.js
* WebSockets
* BullMQ

### Data Layer

* Redis
* PostgreSQL

### Deployment

* Vercel
* Hugging Face

## Architecture Principles

* Server-authoritative state
* Atomic updates
* Event-driven communication
* Stateless application servers
* Redis-backed synchronization
* Fault-tolerant reconnection handling
* Real-time spectator support
