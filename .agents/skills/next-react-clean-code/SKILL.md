---
name: next-react-clean-code
description: >-
  Applies clean code and best practices for Next.js and React codebases. Use
  when creating, reviewing, or refactoring components, routes, server actions,
  data fetching logic, or app architecture in Next.js projects.
disable-model-invocation: true
---

# Next.js + React Clean Code

Use this skill to produce maintainable, testable, and performant code in Next.js and React projects.

## Goals

- Prioritize readability over cleverness.
- Keep components and functions small and focused.
- Avoid accidental complexity in data flow and state.
- Prevent common Next.js and React correctness pitfalls.
- Keep code easy to change without regressions.

## Core Workflow

1. Clarify the behavior before coding.
2. Identify whether logic belongs to:
   - server (`route handlers`, `server actions`, server components), or
   - client (`use client` components, browser-only APIs, UI interaction).
3. Implement the smallest correct change first.
4. Refactor for clarity once behavior is correct.
5. Verify with lint/tests and check for edge cases.

## Next.js Best Practices

### Server and Client Boundaries

- Default to server components; add `"use client"` only when needed.
- Do not access browser APIs (`window`, `document`, `localStorage`) in server components.
- Keep server-only logic (secrets, DB access, privileged actions) on the server.
- Pass only minimal serialized props from server to client components.

### Data Fetching and Mutations

- Prefer fetching data on the server when possible.
- Run independent async tasks in parallel with `Promise.all`.
- Avoid waterfalls by starting independent promises early.
- Validate all external input in `route handlers` and `server actions`.
- Treat `server actions` as public endpoints: always check auth and authorization.

### Routing and API Design

- Keep route handlers thin; move business logic to reusable service functions.
- Return explicit status codes and consistent response shapes.
- Use clear error messages for logs; avoid leaking sensitive internals to clients.

## React Best Practices

### Component Design

- Keep components focused on one responsibility.
- Extract repeated UI into reusable components.
- Do not define components inside other components.
- Keep JSX simple; move complex branching to named helpers.

### State and Effects

- Derive values during render instead of storing duplicated state.
- Use effects only for synchronization with external systems.
- Keep effect dependency arrays accurate and minimal.
- Use functional state updates when next state depends on previous state.
- Store transient mutable values in `useRef` when re-renders are not required.

### Performance and Stability

- Memoize only when there is a measured need.
- Avoid premature optimization; optimize hot paths backed by evidence.
- Preserve prop stability for memoized children when it improves rendering behavior.

## Clean Code Rules

### Naming and Structure

- Use intention-revealing names (`isLoadingProfile`, `fetchUserSettings`).
- Prefer many small functions over one large function.
- Keep files cohesive; avoid mixing unrelated responsibilities.
- Remove dead code, commented blocks, and stale TODOs.

### Control Flow

- Prefer early returns over deep nesting.
- Keep branching shallow and explicit.
- Replace magic literals with named constants.
- Centralize shared domain rules in one place.

### Error Handling

- Fail fast on invalid input.
- Handle known failure paths explicitly.
- Do not swallow errors silently.
- Add context when rethrowing errors.

## PR Review Checklist

- Is the behavior correct for success and failure paths?
- Is server/client separation correct for Next.js boundaries?
- Is async work parallelized when dependencies allow it?
- Are naming and function boundaries clear?
- Are effects truly needed and dependencies correct?
- Is validation/auth applied where required?
- Is duplicated logic removed or extracted?
- Are tests/lint checks updated for the change?

## Anti-Patterns to Avoid

- Large components with mixed data fetching, state, and rendering concerns.
- Chained async calls that could run in parallel.
- Using `useEffect` for pure derived values.
- Mutating props or state objects directly.
- Catching errors without logging or returning actionable context.
- Overusing global state for local UI concerns.

## Output Style for the Agent

When applying this skill:

1. Explain key trade-offs briefly.
2. Prefer straightforward implementations over abstraction-heavy designs.
3. Include short rationale comments only where code is non-obvious.
4. Keep user-facing explanations concise and actionable.
