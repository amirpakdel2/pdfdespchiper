Flight Study Prototype 0.5
=========================
This release upgrades annotations while retaining the existing local storage keys and backup format.

New in 0.5:
- Annotation highlight color is independent from meaning and note text.
- Meaning and note can be stored together for the same selected phrase.
- Nine pastel preset colors plus a custom color picker.
- The annotation editor lets you update color, meaning and notes without creating a separate blue note mark.
- Optional inline meanings/notes under text and images, controlled by the top-bar toggle; setting is remembered.
- Existing note/highlight records are merged where their text/context/offset match, retaining memo and highlight color.
- Supports annotations for images by clicking an image; details are shown in the popup and inline mode.
- Selection wrapping now handles ranges spanning multiple text nodes (where the saved offset can be resolved).
- Responsive adjustments for small screens.

Important:
- Notes and vocabulary are stored locally in the browser/device, not synchronized between devices.
- Before upgrading the deployed copy, use the Export Backup button to save FlightStudy-Backup.json.
- The updated ZIP is a static site package for Cloudflare Pages/Workers static upload. Upload the contents of FlightStudyApp, including index.html, assets, icons, manifest, and sw.js.
- Mobile visual behavior was adjusted and syntax/ZIP/assets were checked, but a full rendered browser test was blocked in this environment. Please test the new deployment on your own screen sizes before relying on it.
