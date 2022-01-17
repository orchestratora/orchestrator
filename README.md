# Orchestrator

> Extensible orchestrator of the UI for Angular

[![Test Workflow](https://github.com/orchestratora/orchestrator/actions/workflows/test.yml/badge.svg)](https://github.com/orchestratora/orchestrator/actions/workflows/test.yml)
[![Release Workflow](https://github.com/orchestratora/orchestrator/actions/workflows/release.yml/badge.svg)](https://github.com/orchestratora/orchestrator/actions/workflows/release.yml)

## Packages

| Name                      | Package                | NPM                                                                            |
| ------------------------- | ---------------------- | ------------------------------------------------------------------------------ |
| [Core](/libs/core)        | @orchestrator/core     | ![@orchestrator/core](https://img.shields.io/npm/v/@orchestrator/core)         |
| [Layout](/libs/layout)    | @orchestrator/layout   | ![@orchestrator/layout](https://img.shields.io/npm/v/@orchestrator/layout)     |
| [UiWeb](/libs/ui-web)     | @orchestrator/ui-web   | ![npm](https://img.shields.io/npm/v/@orchestrator/ui-web)                      |
| [Stepper](/libs/stepper)  | @orchestrator/stepper  | ![@orchestrator/stepper](https://img.shields.io/npm/v/@orchestrator/stepper)   |
| [HtmlTag](/libs/html-tag) | @orchestrator/html-tag | ![@orchestrator/html-tag](https://img.shields.io/npm/v/@orchestrator/html-tag) |

### Installation

```bash
$ npm install @orchestrator/core
```

## Build

Run `nx build <package>` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `nx test <package>` to execute the unit tests via Jest. The test coverage will be stored in the `coverage/` directory.

## Running lint

Run `nx lint <package>` to execute the unit tests via Jest.

## Running end-to-end tests

Run `nx e2e <package>` to execute the end-to-end tests via Cypress.
Before running the tests make sure you are serving the app via `ng serve`.
