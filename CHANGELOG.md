# Changelog

All notable changes to Hermes are documented in this file.

The format of this changelog is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

Version numbers follow
[Semantic Versioning](https://semver.org/).

---

## [Unreleased]

Changes for the next release will be documented here.

---

## [0.2.0] - 2026-08-22

### Added

#### Application Header

- Added the primary authenticated application header.
- Added Hermes branding and application-level controls.
- Added global search control.
- Added workspace context/control.
- Added authenticated user controls.
- Added responsive header layout.
- Established the application shell for workspace-based functionality.

#### Workspaces

- Added the workspace data model.
- Added workspace database schema and Prisma migration.
- Added workspace creation and retrieval functionality.
- Added authenticated user ownership and access handling.
- Added active workspace context.
- Added workspace UI.
- Established the foundation for workspace-level resources.

#### Collections

- Added the collection data model.
- Added workspace-to-collection relationships.
- Added collection database schema and Prisma migration.
- Added collection creation and retrieval functionality.
- Added collection management UI.
- Added workspace-scoped collection access.
- Established the foundation for organizing API requests.

### Changed

- Expanded the Hermes application structure beyond authentication and database
  infrastructure.
- Added workspace and collection organization to the application architecture.
- Updated the application foundation to support future API request management.
- Expanded the authenticated application shell with workspace-aware controls.

### Database

- Added workspace persistence.
- Added collection persistence.
- Added workspace-to-collection relationships.
- Added Prisma migrations for the new workspace and collection models.

### Security

- Added workspace-scoped access validation for collections.
- Maintained authentication and database security practices established in
  `v0.1.0`.

---

## Release Notes

### v0.2.0 — Workspace & Collection Foundation

The second Hermes release introduces the organizational foundation required
for the API client experience.

This release adds:

- Authenticated application header
- Workspace management
- Active workspace context
- Collection management
- Workspace-scoped collections
- Database persistence for workspaces and collections

The API request builder and HTTP request execution functionality are not part
of this release yet.

Future releases will build API request management on top of the workspace and
collection foundation.

---

## [0.1.0] - 2026-08-18

### Added

#### Authentication

- Added Better Auth integration.
- Added GitHub OAuth authentication.
- Added Google OAuth authentication.
- Added authentication client integration.
- Added session management.
- Added current-user session handling.
- Added authentication UI.
- Added authentication API route handling.
- Added authentication hooks for client-side session access.

#### Database

- Added PostgreSQL database integration.
- Added Prisma ORM integration.
- Added Prisma PostgreSQL adapter.
- Added Prisma migration support.
- Added database-backed authentication storage.

#### Local Development

- Added Docker Compose configuration for local PostgreSQL.
- Added environment variable validation for authentication configuration.
- Added Prisma configuration for database migrations.

#### Developer Experience

- Added GitHub issue templates for:
  - Bug reports
  - Feature requests
  - Refactors.
- Added pull request template.
- Added continuous integration workflow.
- Added automated linting, type checking, database migration, and build
  validation.
- Added CodeQL security analysis.

### Changed

- Established the initial Hermes application structure.
- Established the `feature/* → develop → main` development workflow.
- Established the initial authentication and database foundation for future
  API client functionality.

### Security

- Added CodeQL-based security analysis.
- Configured OAuth credentials through environment variables.
- Added database-backed session and authentication storage.

---

## Release Notes

### v0.1.0 — Initial Foundation Release

The first Hermes release establishes the core foundation of the application.

This release focuses on:

- Authentication
- OAuth integration
- Database connectivity
- Prisma integration
- Local development infrastructure
- CI
- Security analysis
- Development workflow

The API request-building functionality is not part of this release yet.

Future releases will build the API client experience on top of this foundation.
