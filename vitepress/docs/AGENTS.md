# AGENTS.md — Agent Operating Guidelines

Purpose
- This file tells agentic coding assistants how to work in this repository: how to build, lint, test, and which coding conventions to follow.
- If there are more specific AGENTS.md files in subdirectories, those take precedence for files inside that subtree.

Quick facts discovered by this agent
- No `.cursor` rules found in `.cursor/`.
- No `.cursorrules` found.
- No Copilot instructions found at `.github/copilot-instructions.md`.

If you add Cursor/Copilot rules
- If you or another maintainer adds `.cursor/rules/` or `.cursorrules` or `.github/copilot-instructions.md`, update this AGENTS.md to summarize the most important constraints for agents.

---

**Build / Lint / Test Commands**

General guidance
- The repository currently has no language-specific files at the root that this agent could discover automatically. Below are standard commands to try based on the project's language. Run the command that matches your stack. If none apply, ask the human for the correct commands.
- Always run commands from the repository root (this AGENTS.md location) unless a subdirectory contains its own README with different instructions.

Node / JavaScript / TypeScript
- Install: `npm ci` (or `yarn install`)
- Build: `npm run build` (or `yarn build`)
- Lint: `npm run lint` (common: `eslint "**/*.{js,ts,tsx}"`)
- Format: `npm run format` (common: `prettier --write .`)
- Test (all): `npm test` (often runs `jest`)
- Test (single test file): `npx jest path/to/testfile.test.js` or `npm test -- -t "test name pattern"`
- Test (single test name): `npx jest -t "should do X"`

Python
- Install: `python -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt` (or use poetry)
- Lint: `flake8 .`
- Format: `black .` and `isort .`
- Test (all): `pytest` (uses `pytest.ini` or `pyproject.toml` if present)
- Test (single test): `pytest tests/test_module.py::test_function`

Go
- Build: `go build ./...`
- Lint: `golangci-lint run` or `go vet ./...`
- Format: `gofmt -w .` or `go fmt ./...`
- Test (all): `go test ./...`
- Test (single): `go test ./pkg/name -run TestName`

Rust
- Build: `cargo build --release`
- Lint: `cargo clippy --all-targets --all-features -- -D warnings`
- Format: `cargo fmt --all -- --check` (or without `--check` to apply)
- Test (all): `cargo test`
- Test (single): `cargo test test_name`

Java / Maven / Gradle
- Maven build: `mvn clean install`
- Run tests: `mvn test`
- Single test (Maven Surefire): `mvn -Dtest=ClassName#methodName test`
- Gradle test: `./gradlew test`
- Single test: `./gradlew test --tests "com.example.TestClass.testMethod"`

.NET
- Build: `dotnet build`
- Test (all): `dotnet test`
- Test (single): `dotnet test --filter "FullyQualifiedName~Namespace.Class.TestMethod"`

Makefile / Generic
- If a `Makefile` exists, prefer `make test`, `make lint`, `make build`.

Running a single test — quick reference
- Jest: `npx jest path/to/file.test.js` or `npx jest -t "name"`
- Pytest: `pytest path/to/test_file.py::test_name`
- Go: `go test ./pkg -run TestName`
- Cargo: `cargo test test_name`
- Maven: `mvn -Dtest=Class#method test`
- Gradle: `./gradlew test --tests "path.to.TestClass.method"`

---

**Code Style & Conventions**

Purpose
- These guidelines are intentionally conservative so multiple languages and developer preferences are supported. When a project contains its own style config (ESLint, Prettier, pyproject.toml, rustfmt.toml, .editorconfig), prefer those rules and mirror them here.

General
- Follow existing project configs first. If none exist, follow the rules below.
- Use an `.editorconfig` to normalize basic formatting across editors.
- Prefer small, focused commits. Do not commit generated files unless the project policy explicitly requires it.

Formatting
- Keep line length <= 100 characters where feasible.
- Use 2 spaces for JS/TS indentation, 4 spaces for Python.
- Use `utf-8` encoding and LF newlines.
- Always run the project's formatter before committing (`prettier`, `black`, `gofmt`, `cargo fmt`).

Imports / Dependencies
- Keep imports grouped and ordered: standard library / built-ins -> third-party -> local modules.
- Avoid deep relative imports; prefer package-style imports if the project layout supports them.
- Keep dependency lists minimal; remove unused dependencies and imports.
- For JS/TS, prefer explicit named imports over `import * as` unless re-exporting.

Types
- In TypeScript prefer explicit return types on public functions and exported members.
- Avoid `any`. When unavoidable, document why it is required and restrict scope.
- In dynamically typed languages (Python, JS), add type hints / JSDoc for public APIs.

Naming
- Use `camelCase` for variables and functions in JS/TS, `snake_case` in Python, `PascalCase` for classes and constructor functions.
- Use clear, descriptive names; avoid single-letter names except for short lived loop counters.
- Prefix boolean variables with `is/has/should/can` where it improves readability.

Functions / Modules
- Keep functions small and single-responsibility. If a function exceeds ~80–120 lines, consider splitting.
- Favor composition over deep inheritance.
- Export a minimal public surface from modules; prefer explicit exports.

Error Handling
- Fail fast and return/throw predictable error types.
- For libraries: use typed error classes (or specific exception classes) so callers can handle known error cases.
- For applications: surface user-meaningful messages and log internal details at debug level.
- Never swallow exceptions silently. If a caught error is intentionally ignored, add a comment explaining why and what conditions justify ignoring it.

Logging
- Use structured logging where available (JSON with keys: timestamp, level, msg, module, error).
- Avoid logging secrets (API keys, tokens, passwords). Redact or exclude sensitive fields.

Testing
- Tests should be deterministic and fast. Mock external network/IO when practical.
- Use clear naming: `test_action_expectedResult` or descriptive test names for BDD frameworks.
- Each unit test should assert a single concept when possible.
- When adding integration tests, separate them from unit tests (e.g., `tests/integration/`) and avoid running them in unit-only CI stages unless explicitly configured.

Documentation & Comments
- Public modules, functions and classes should have short docstrings/comments explaining intent, inputs and outputs.
- Prefer self-documenting code over noisy comments. Use comments to explain why, not what.

Security
- Validate and sanitize external input at boundaries.
- Prefer parameterized queries for DB access.
- Do not commit secrets. If you find secrets, notify the repository owner and rotate them.

CI / Automation
- Respect and follow existing CI config (GitHub Actions, GitLab CI, etc.) if present.
- When introducing new checks (linters, formatters) coordinate to avoid breaking PRs unexpectedly.

Agent behavior rules (for automated agents)
- Always check for and obey any repository-level AGENTS.md or more-specific AGENTS.md in a file's directory tree before editing that file.
- If a file contains an explicit header comment with agent instructions, follow it.
- If unsure about build/test commands, ask the human rather than guessing and running destructive commands.
- Do not push or create remotes or force push without explicit user permission.
- Do not commit or expose secrets; if you detect potential secrets, open an issue or ask the human.
- When making code changes: create minimal, focused edits and explain the rationale in the change summary.
- Prefer to run a single test or a narrow test subset first when reproducing a failing test.

Using the TODO/Plan tool
- Use the repository's task planning tool if the maintainer requested it. Keep plans small and incremental.
- When working on multi-step changes, create a short todo plan with 3–6 steps and keep one item `in_progress` at a time.

When adding or updating AGENTS.md
- If you update or add Cursor/Copilot rules, include a short summary at the top of this file stating the important rules for agents.
- Keep this file roughly 100–200 lines. Make the content actionable and concise.

Contact / Questions
- If the repository has a CONTRIBUTING.md, use it for workflow questions.
- Otherwise, open an issue describing the question and tag a maintainer, or ask the human who requested the change.

---

Change log
- 1.0 — Initial AGENTS.md added by agent: created build/lint/test quick commands, single-test shortcuts, style guidelines, and agent behavior rules. No cursor/copilot rules were found at creation time.


