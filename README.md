# No Phone

A Dutch-language, self-hosted activity list for spending time together away from screens. Built with React + Vite and served by Nginx in Docker. Works on Raspberry Pi 5 (ARM64).

## Features

- 24 starter activities from the supplied list
- Add, edit and delete activities
- Mark activities as completed directly from the list
- Edit-list mode for management controls
- Search and category filters
- Responsive Material 3-inspired interface, light and dark themes
- Local browser storage; no account or external database required

## Run with Docker Compose

```sh
docker compose up -d --build
```

Open `http://YOUR-UMBREL-IP:8097`.

To change the port, create a `.env` file:

```env
NO_PHONE_PORT=8097
```

Then run `docker compose up -d --build` again.

## Development

Requires Node.js 22+.

```sh
npm install
npm run dev
```

## Data and privacy

Activities are stored in localStorage in the browser used to access the app. This first version does not use a server database, accounts, analytics or external API. Browser data is device/browser-specific; use the same browser to see the same list. Clearing browser site data will clear the list, so export/backup is not yet included.

## Umbrel

This repository contains a Docker Compose deployment suitable for running alongside Umbrel on a Raspberry Pi 5. Deploy it as a custom compose app/container using the compose file; it is not yet packaged as an installable Umbrel App Store catalogue entry.
