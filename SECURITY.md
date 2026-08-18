# Security Policy

Security is an important part of Hermes.

Hermes is currently under active development, so security practices and
infrastructure may evolve as the project grows.

---

## Supported Versions

Hermes is currently in early development.

Security fixes are primarily applied to the latest stable release and the
active development branch.

| Version / Branch      | Supported |
| --------------------- | --------- |
| Latest `main` release | Yes       |
| `develop`             | Yes       |
| Older releases        | No        |

---

## Reporting a Vulnerability

Please **do not report security vulnerabilities through public GitHub issues**.

If you discover a security vulnerability, report it privately through the
repository's available private security reporting mechanism.

A useful report should include:

- A clear description of the vulnerability.
- Steps required to reproduce the issue.
- The affected functionality.
- The potential security impact.
- Relevant logs or screenshots, if safe to provide.
- A proof of concept, when appropriate.
- Suggested mitigation, if known.

Please do not include real passwords, OAuth credentials, API keys, access
tokens, or other sensitive information in the report.

---

## Security Guidelines for Contributors

Contributors must:

- Never commit secrets to the repository.
- Never commit OAuth client secrets.
- Never commit database passwords.
- Never commit API keys or access tokens.
- Never place production credentials in documentation.
- Use environment variables for sensitive configuration.
- Use `.env.example` for safe configuration examples.
- Avoid exposing authentication information in logs.
- Review authentication and authorization changes carefully.
- Keep dependencies reasonably up to date.
- Avoid introducing unnecessary dependencies.

---

## Authentication Security

Hermes uses Better Auth for authentication.

The current authentication system integrates:

- GitHub OAuth
- Google OAuth
- PostgreSQL
- Prisma

OAuth credentials are supplied through environment variables.

The following values must never be committed:

```text
GITHUB_CLIENT_SECRET
GOOGLE_CLIENT_SECRET
```

Authentication configuration should remain outside the source code whenever the
value is sensitive or environment-specific.

---

## Database Security

Hermes uses PostgreSQL for persistent application and authentication data.

Database credentials must be supplied through environment variables.

Never commit database connection strings containing real credentials.

For example, do not commit:

```bash
postgresql://real-user:real-password@production-host/database
```

Use safe placeholders in `.env.example` instead.

---

## Environment Files

The following files must not contain real credentials when committed:

```text
.env.example
README.md
CONTRIBUTING.md
documentation
source code
```

The `.env` file should remain local and must not be committed.

---

## Automated Security Analysis

Hermes uses GitHub CodeQL for automated security analysis.

CodeQL helps identify potential security issues in the application's
JavaScript and TypeScript code.

Security findings should be reviewed before merging affected changes.

---

## Dependency Security

When adding or updating dependencies:

- Prefer actively maintained packages.
- Review the purpose of the dependency.
- Avoid unnecessary dependencies.
- Review security advisories when relevant.
- Run the project's validation checks after dependency changes.

---

## Authentication and Security-Sensitive Changes

Changes involving authentication, sessions, OAuth providers, authorization,
or database-backed identity data should receive additional review.

Examples include:

- Authentication configuration
- OAuth callback handling
- Session handling
- Protected routes
- Account linking
- User identity handling
- Authentication database schema
- Security-related middleware

Security-sensitive changes should include appropriate testing in the pull
request.

---

## Responsible Disclosure

Please allow maintainers reasonable time to investigate and address a
vulnerability before publicly disclosing it.

Security reports should help maintainers understand, reproduce, and safely
resolve the issue.

Thank you for helping keep Hermes and its users secure.
