# Nirvana Inventory App (Angular)

A simple responsive Angular app for inventory selection and quantity submission.

## What it does
- Shows an admin-style responsive UI
- Lets user select category:
  - Vanzon items
  - Vegetables
  - Meat Items
  - Bar Inventory Items
  - Wines
  - Miscellaneous items
- Displays category items in a table with:
  - Item pic (placeholder badge)
  - Item name
  - Quantity input (`number`)
- On submit:
  - Generates an Excel file (`.xlsx`)
  - Sends to `nirvanakitchenleuven@gmail.com` via:
    - EmailJS (optional config), or
    - mailto fallback with summary and instruction to attach generated Excel

## Run locally
```bash
npm start
```
Open: `http://localhost:4200`

## Deploy to GitHub Pages
This is a static Angular-in-browser app (ES modules), so you can deploy as static files directly:
1. Push repository to GitHub
2. In GitHub repo settings, enable Pages from the default branch root
3. Ensure `index.html`, `main.js`, and `styles.css` are in the published root

## Optional: EmailJS auto-send setup
Edit `main.js` and set values in `emailJsConfig`:
- `publicKey`
- `serviceId`
- `templateId`
