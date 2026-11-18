# Rogue Artisan — GitHub Pages site

A static three-page leathercraft portfolio built with plain HTML, CSS, and JavaScript.

## Files
- `index.html` — home page
- `commissions.html` — commission / maker's-choice inquiry
- `catalogue.html` — responsive slideshow
- `styles.css` — all visual styling
- `script.js` — mobile nav, slideshow controls, and commission email handling
- `images/` — supplied leatherwork photography

## Before publishing
1. Open `script.js`.
2. Find `YOUR_EMAIL@example.com`.
3. Replace it with the email address where you want commission inquiries sent.
4. Replace the working name "Rogue Artisan" with your own maker/business name if desired.

## GitHub Pages
1. Create a new GitHub repository.
2. Upload everything in this folder to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your main branch and `/ (root)`.
6. Save. GitHub will publish the site at your GitHub Pages address.

The site has no server-side code, so it works directly on GitHub Pages.

## About the commission form
Because GitHub Pages is static hosting, the form currently prepares a `mailto:` inquiry. This is intentionally simple and requires no backend. For a more polished production setup, the form can later be connected to a form service or a small serverless endpoint without changing the site's visual design.


## Product pages
The Catalogue page links to six individual product pages: The Warden, 3 Pocket Cardholder, The Classic Bifold, The Sentinel Bifold, The Sentinel MkII, and Passport Holder. Product inquiry links prefill the commission form.

Some product photography and specifications were not included in the supplied files. Those pages use a branded placeholder and clearly invite visitors to confirm build details rather than claiming unprovided specifications. Replace the placeholder with product photos and add confirmed specifications as they become available.


## Adding product gallery photos
Each of the six product detail pages now has a three-image gallery directly beneath its main product image. To add a photo, open the relevant product HTML file, find the `product-gallery` section, and replace one `.gallery-add` placeholder with an `<img>` element. Put the image file in the `images/` folder. Use descriptive, lowercase, hyphen-separated filenames (for example, `warden-interior-pocket-layout.jpg`), unique and accurate alt text, and keep `loading="lazy"`, `decoding="async"`, and the actual image dimensions. Update the matching caption so it accurately describes the photograph. Do not reuse the same alt text across different images or add keywords that are not visible in the photo.


## Base44 catalogue integration

The Catalogue page now uses the seven-piece catalogue from the Rogue Artisan Base44 site. Individual catalogue pages are provided for The Weekender Holdall, The Bifold No. 02, The Roll-Top Pack, The Field Belt, The Flap Satchel, The Dopp Kit, and The Sentinel Mk.II. Catalogue starting prices are in CAD; final details and build dates are confirmed by commission. Product images are not copied from Base44, so the catalogue uses neutral image placeholders until approved photographs are added.

### Product photo galleries
Each product detail page includes an independent six-position thumbnail gallery with previous/next controls. Add each product's photographs to `images/products/` using the filenames below (JPG format):

- `weekender-holdall-1.jpg` through `weekender-holdall-6.jpg`
- `bifold-no-02-1.jpg` through `bifold-no-02-6.jpg`
- `roll-top-pack-1.jpg` through `roll-top-pack-6.jpg`
- `field-belt-1.jpg` through `field-belt-6.jpg`
- `flap-satchel-1.jpg` through `flap-satchel-6.jpg`
- `dopp-kit-1.jpg` through `dopp-kit-6.jpg`
- `sentinel-mk-ii-1.jpg` through `sentinel-mk-ii-6.jpg`

Use at least four photos per product; positions five and six are optional. Missing photo files display tasteful placeholders until the corresponding images are added. Suggested sequence: front, alternate angle, interior/construction, hardware/detail, back/side, and in-use/scale.


## Easy product editing (no AI required)

Product names, categories, starting prices, catalogue summaries and product-page headings are managed in **`products.js`**. Edit that file once and the catalogue and matching product page update automatically.

### Change an existing product
1. Open `products.js` in GitHub (or VS Code).
2. Find the product entry by its `id` (for example `sentinel`).
3. Edit `name`, `category`, `price` or `summary`. Keep the commas and quotation marks.
4. Save/commit the change. GitHub Pages publishes the update automatically.

### Add a new product
1. Make a copy of an existing product page, rename the copy (for example `new-piece.html`) and update its unique page content, specifications, story and gallery image filenames.
2. In that page, change the `<main data-product-page="...">` value to a new unique id.
3. Add a new entry to `window.ROGUE_PRODUCTS` in `products.js`, using that same id and the new page filename.
4. Commit both files to GitHub. The catalogue card is generated from the new entry.

### Add or change gallery photos
Put product images in `images/products/`. The gallery filenames are listed in the individual product HTML page; use the same filename pattern already there (for example `sentinel-mk-ii-1.jpg`). Add or remove thumbnail button blocks in that page when you need a different number of images.

### Edit the live GitHub Pages site without downloading ZIP files
Open your repository on GitHub.com, browse to `products.js`, click the pencil **Edit** icon, make your changes, then click **Commit changes**. You can do the same for HTML and image files. GitHub Pages rebuilds/publishes after the commit; allow a short time for the live site to refresh. For a more comfortable editor, press the `.` key while viewing the repository to open github.dev in your browser.

**Important:** Keep filenames and product `id` values stable unless you also update links and gallery references.


## Catalogue product photos

Each product in `products.js` has an `image` field. Set it to a path such as `images/products/my-wallet-main.jpg` to show that photo on the catalogue card. Upload the image to the matching folder in GitHub first, then commit the `products.js` change. Set `image` to an empty string (`""`) to use the built-in placeholder. Catalogue images are cropped consistently to a 4:3 frame and gently zoom on hover.

The Cardholders catalogue entry links to `cardholders.html`. Its price is set to `null`, so the site displays “Enquire for pricing” until you choose a starting price.


### Logo and favicon
The site header, browser favicon, and Apple touch icon reference `images/Rogue-Logo-1-White.png`. Add that exact PNG file to the `images/` folder before publishing so the references resolve.


## Search visibility and custom domain

This site is prepared for the canonical domain **https://rogueartisan.ca**. It includes `CNAME`, `robots.txt`, `sitemap.xml`, canonical page URLs, social sharing metadata, and JSON-LD structured data for the brand, website, catalogue, products, and commissions service.

Before launch:
1. In GitHub repository Settings → Pages, set the custom domain to `rogueartisan.ca` and enable HTTPS once DNS verification is complete.
2. Configure the domain DNS records for GitHub Pages using GitHub's current instructions. Decide whether the preferred public address is the apex domain or `www` and configure redirects consistently.
3. Add `images/Rogue-Logo-1-White.png` to the `images` folder. The header, favicon, Apple touch icon, and Organization logo structured data already reference that exact path.
4. Replace `YOUR_EMAIL@example.com` in `script.js` with the email address that should receive commission enquiries. The current static form opens the visitor's email application; it does not send submissions to a server.
5. Review every product photograph, filename, caption and alt description after adding the final product images. Use accurate descriptions of what each photograph actually shows.
6. After the site is live, verify it in Google Search Console and Bing Webmaster Tools, then submit `https://rogueartisan.ca/sitemap.xml`.

The site describes Rogue Artisan as serving Vancouver and the Lower Mainland, with shipping within Canada and the United States. No street address or storefront is claimed.

## Catalogue category filters

The Catalogue page includes filters for **Wallets**, **Bags & Travel**, and **Small Goods**, plus **All pieces** to show the complete collection. Each product's filter placement is controlled by its `filterGroup` field in `products.js`. Use one of these exact values: `Wallets`, `Bags & Travel`, or `Small Goods`. This is separate from the product's `category` field, which controls the descriptive category label shown on product cards and pages.
