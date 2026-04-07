---
name: conventional-commits
description: >-
  Writes Git commit messages using the Conventional Commits 1.0.0 spec with all
  user-facing text in English (subject, body, footers). Use when drafting or
  revising commit messages, git commit, squash merge messages, changelog-related
  commits, or when the user asks for conventional / semantic commits.
---

# Conventional Commits (English)

Follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). **Every commit title, body, and footer must be written in English**, even if the user speaks another language in chat.

## Format

```
<type>[optional scope][optional !]: <description>

[optional body]

[optional footer(s)]
```

- **One blank line** between title and body, and between body and footers.
- **Title**: imperative mood, lowercase start of the description clause (not a proper noun rule—be consistent), no trailing period in the short description line (team preference: no period).
- **Line length**: aim for ~72 chars on the subject line when reasonable.

## Types (required prefix)

| Type | Meaning |
|------|---------|
| `feat` | New feature (SemVer MINOR) |
| `fix` | Bug fix (SemVer PATCH) |
| `perf` | Performance improvement |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `docs` | Documentation only |
| `test` | Tests only |
| `build` | Build system or dependencies |
| `ci` | CI configuration |
| `chore` | Maintenance tasks that do not touch production code semantics |
| `style` | Formatting, whitespace (no logic change) |

Other types are allowed if they fit the project; `feat` and `fix` are the core semantic types.

## Scope (optional)

- Noun in parentheses after the type: `feat(ui):`, `fix(api):`.
- Describes the area of the codebase touched.

## Breaking changes

Either:

- Add `!` after the type or scope: `feat!:`, `refactor(api)!:`, **or**
- Add a footer:

```
BREAKING CHANGE: description of what breaks and how to migrate
```

`BREAKING CHANGE` correlates with SemVer MAJOR.

## Examples (valid English messages)

```
feat(nav): add responsive mobile menu

fix: prevent duplicate submissions on double click

docs: correct environment variable names in README

refactor(auth)!: replace session cookies with JWT

BREAKING CHANGE: clients must send Authorization: Bearer <token>
```

```
chore: bump eslint to v9
```

## Workflow for the agent

1. Infer `type` from the change (bug → `fix`, new capability → `feat`, etc.).
2. Add `scope` when it clarifies the blast radius (`page`, `api`, `deps`).
3. Write the **description** as a concise imperative phrase in English: "add X", "fix Y", "remove Z".
4. Add a **body** when the *why* or non-obvious details are needed.
5. Mark **breaking** changes with `!` and/or `BREAKING CHANGE:` footer.
6. Never put Spanish (or other languages) in the commit message unless quoting user-visible UI strings that must stay verbatim.

## Do not

- Use vague titles: `update`, `fix stuff`, `changes`.
- Mix languages in the same message.
- Skip the colon and space after the type: always `feat: ` not `feat-`.
