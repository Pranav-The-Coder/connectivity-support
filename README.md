# Connectivity Support Website

This repository contains the standalone, customer-facing support website for the Connectivity iOS app. It is completely separate from the iOS application and does not communicate with or modify the app, its project, backend, or APIs.

## Run locally

The site is static and can be opened directly by opening `index.html` in a browser. For a local server, from this directory run:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Before publishing

The support address is configured in `index.html` as `connectivityapphelp@gmail.com` in both the `mailto:` link and visible email text. Replace it there if the support address changes. Replace the placeholder Privacy Policy link when a public policy URL is available.

## Deploy

Upload `index.html`, `privacy.html`, `styles.css`, and `script.js` to any static hosting provider, such as GitHub Pages, Netlify, Vercel static hosting, or an equivalent web host. No build step or backend is required.

The final HTTPS address of the deployed site, for example `https://support.example.com/`, is the URL to enter in App Store Connect as the Support URL.