# Until Debt Do Us Part

A mobile-first game guide for a personal Monopoly Deal deck. Original card artwork, a quick-start walkthrough, 15 searchable card types, and detailed rules for play.

## Deploy on Vercel

1. In Vercel, choose **Add New → Project** and import `nadyangkasa18-bit/tildebtdouspart`.
2. Choose **Other** as the framework. Keep the repository root as the Root Directory.
3. No install or build command is needed. The included `vercel.json` serves the repository root (`.`).
4. Deploy. Open the production URL on your phone and test it before printing your QR code.
5. Make the QR code point to the final production domain (or your custom domain), not a temporary preview URL. No deployment URL is hardcoded in this source.

No database, environment variables, API keys, third-party scripts, or package installation are required. The website has not been deployed by this task; the owner will deploy it through Vercel.

## Local preview

From the repository directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173 in a browser. To check JavaScript syntax with Node:

```sh
node --check app.js
node --check cards.js
```

## Edit

- `index.html` — introduction, quick-start instructions, and complete rules.
- `cards.js` — custom card names, classic names, effects, search categories, and artwork references.
- `styles.css` — responsive layouts, colors, typography, and motion.
- `app.js` — search, filters, accessible native card dialog, turn walkthrough, navigation highlighting, and print behavior.
- `assets/` — optimized WebP crops extracted from the owner's five supplied design sheets; no generated substitutes.

The gallery searches both custom and classic card names. Core rules remain readable if JavaScript is disabled. All visual card text is also explained in readable HTML. Native dialogs support Escape, focus containment, and focus return. Motion is disabled with `prefers-reduced-motion`; no continuous animation or sound is used.

## Rules and sources

The guide follows Hasbro's classic E3113 rule sheet and official Consumer Care clarifications. The site's prose is original, with action names and cash values taken from the physical custom cards. Match rent and set sizes to the printed custom cards rather than to a standard-deck color chart. This is an unofficial personal guide, not a Hasbro product.

- [Official E3113 instructions](https://instructions.hasbro.com/en-us/instruction/monopoly-deal-card-game-instructions)
- [Just Say No does not consume a card play](https://hasbro-new.custhelp.com/app/answers/detail/a_id/953/)
- [Two Double the Rent cards use all three plays and quadruple rent](https://hasbro-new.custhelp.com/app/answers/detail/a_id/951/)
- [Countering Just Say No](https://hasbro-new.custhelp.com/app/answers/detail/a_id/952/)
- [Moving property wild cards](https://hasbro-new.custhelp.com/app/answers/detail/a_id/937/)
- [A full set needs at least one standard Property card](https://hasbro-new.custhelp.com/app/answers/detail/a_id/942/)
- [House before Hotel](https://hasbro-new.custhelp.com/app/answers/detail/a_id/927/)
- [Apple Human Interface Guidelines — Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)

Different Monopoly Deal printings can differ on niche edge cases. The core guide identifies its classic rules baseline and links the official rules, rather than silently mixing mechanics from themed editions. The custom Free Ticket artwork says $2M; the site preserves that printed cash value.

## Design

Warm ivory, olive, soft gold, and blush come from the actual cards. Editorial serif headings echo the deck, while system sans-serif text prioritizes readability. Buttons and inputs are designed for touch, content reflows for narrow screens, and cards open into readable detail sheets.

[Design canvas — desktop and mobile](https://superdesign.dev/teams/f7f7fec1-e31a-4930-9760-b4e00dfc98f7/projects/92e948ff-8488-435b-bf72-a5cf4486e3a9)
