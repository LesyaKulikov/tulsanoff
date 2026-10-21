# TULSANOFF

A website for TULSANOFF, a massage studio. The first build is the homepage, reconstructed faithfully from a fixed 1440px-wide design mockup into componentized React.

## Language

**TULSANOFF**:
The massage studio the site represents. Its name is real and final.
_Avoid_: the studio, the business (when TULSANOFF would be clearer)

**Homepage**:
The single page in scope for the first build. Other pages are not yet planned.

**Massage**:
A single bookable massage type with its own URL detail page (`/services/:id`) showing its title, image, a fact list (classification, duration, for-whom), and a tabbed section (description, indications, results, approach) when that massage has content authored for it. The 6 gallery tiles and the 3 studio cards on the services page are all Massages; clicking one opens its detail.
_Avoid_: service type, booking (when "Massage" is clearer)

**Message id**:
A unique semantic key into a locale file used for all user-facing copy, grouped by section (e.g. `footer.contact.phone`). When a message id has no value in the active locale file, the UI renders the id itself. Because copy is deferred, message ids are the canonical checklist of unfinished content. A whole section may instead probe for the id's presence (`hasMessage`) and hide itself until its copy is authored.
_Avoid_: translation key, string key

**Locale file**:
A `{ "key": "value" }` JSON file holding the copy for one language. `ru-RU.json` is the shipped default, with `he-IL.json` as the second locale the header switcher offers; `en-US.json` is kept complete but is not exposed in the UI yet. Hebrew is right-to-left — the active locale sets `<html dir>`.
_Avoid_: lang file (when being precise)

**Component**:
A React file with a single responsibility (a page section, or a shared Button/Icon), paired with its own CSS module.
