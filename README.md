# No Phone

A Dutch-language, self-hosted activity list for spending time together away from screens. Built with React + Vite and served by Nginx in Docker. Designed for Umbrel, including Raspberry Pi 5 (ARM64).

## Features

- 24 starter activities from the supplied list
- Add, edit and delete activities
- Mark activities as completed directly from the list
- Edit-list mode for management controls
- Search and category filters
- Responsive Material 3-inspired interface, light and dark themes
- Local browser storage; no account or external database required

## Install on Umbrel

1. Open the Umbrel App Store.
2. Add this community app store:
   `https://github.com/stormvideo95-dotcom/no_phone`
3. Find **No Phone** in the **Stormvideo App Store** and install it.

The first image build is published automatically by GitHub Actions for both `linux/amd64` and `linux/arm64`. Before installing from the community store, the GitHub Container Registry package must be set to **Public** so Umbrel can pull it without credentials.

## Build image locally

```sh
docker build -t no-phone:local .
```

## Run directly with Docker Compose

From the repository root:

```sh
docker compose up -d --build
```

Then open `http://YOUR-UMBREL-IP:8097`.

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

Activities and the selected theme are stored in localStorage in the browser used to access the app. This version does not use a server database, accounts, analytics or external API. Browser data is device/browser-specific; use the same browser to see the same list. Clearing browser site data will clear the list. Browser localStorage is not included in Umbrel's server-side app-data backups.

## Raspberry Pi 5

The GitHub Actions workflow builds and publishes a multi-platform image for `linux/arm64` (Raspberry Pi 5) and `linux/amd64`.
