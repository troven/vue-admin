## Introduction

`vue-admin` is a headless CMS that uses a declarative JSON model to describe the structure and configure the functionality.

## Features

```
- Keycloak Integration

- Role-based Authorisation
  - Route features
  - Directive features

- Feature Toggles
  - Page/route features

- Multi-environment build
  - dev sit stage prod

- Global Features
  - I18n
  - Multiple dynamic themes
  - Dynamic sidebar (supports multi-level routing)
  - Dynamic breadcrumb
  - Tags-view (Tab page Support right-click operation)
  - Svg Sprite
  - Full screen
  - Responsive Sidebar

- Editor
  - Rich Text Editor
  - Markdown Editor
  - JSON Editor
  - Code Editor

- Excel
  - Export Excel
  - Upload Excel
  - Visualization Excel
  - Export zip

- Table
  - Dynamic Table
  - Drag And Drop Table
  - Inline Edit Table

- Error Page
  - 401
  - 404

- Components
  - Avatar Upload
  - Back To Top

- Examples
  - Drag Dialog
  - Drag Select
  - Drag Kanban
  - Drag List
  - SplitPane
  - Dropzone
  - Sticky
  - CountTo
  - Error Log
  - Home
  - Guide Page
  - ECharts
  - Clipboard
  - Markdown to html
```

## Getting started

```bash
# clone the project
git clone https://github.com/troven/vue-admin.git

# enter the project directory
cd vue-admin

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9527

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```


## Browsers support

Modern browsers and Internet Explorer 10+.

## License

[MIT](https://github.com/troven/vue-admin/blob/master/LICENSE)

Copyright (c) 2020-present Troven
