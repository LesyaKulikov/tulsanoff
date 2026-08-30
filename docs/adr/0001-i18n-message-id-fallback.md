# Localization via react-intl with message-id fallback

The site is built from a design mockup whose copy is not yet finalized, so we standardize on FormatJS (react-intl) with `{ "key": "value" }` JSON locale files. We ship one default locale (`en-US.json`) now, with infrastructure that supports three locales later (the switcher is out of scope). When a message key is missing from the active locale file, we render the message id itself rather than silently showing an empty string or falling back to another language.

The id-display fallback is deliberate: because copy authoring is deferred, the ids serve double duty as an incomplete-content checklist. Ids are sectioned and semantic (e.g. `footer.contact.phone`) so the fallback text reads like a to-do list. This is surprising without context — a future reader might "fix" it to render nothing or fall back to English — so we record it here rather than let it look like a bug.
