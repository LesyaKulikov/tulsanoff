# TULSANOFF

A website for TULSANOFF, a massage studio. The first build is the homepage, reconstructed faithfully from a fixed 1440px-wide design mockup into componentized React.

## Language

**TULSANOFF**:
The massage studio the site represents. Its name is real and final.
_Avoid_: the studio, the business (when TULSANOFF would be clearer)

**Homepage**:
The single page in scope for the first build. Other pages are not yet planned.

**Message id**:
A unique semantic key into a locale file used for all user-facing copy, grouped by section (e.g. `footer.contact.phone`). When a message id has no value in the active locale file, the UI renders the id itself. Because copy is deferred, message ids are the canonical checklist of unfinished content.
_Avoid_: translation key, string key

**Locale file**:
A `{ "key": "value" }` JSON file holding the copy for one language. `en-US.json` is the shipped default; two more locales are planned but not yet present.
_Avoid_: lang file (when being precise)

**Component**:
A React file with a single responsibility (a page section, or a shared Button/Icon), paired with its own CSS module.
