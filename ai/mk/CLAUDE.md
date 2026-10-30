# EEZMARKUP project rules

- Working DC source file: `ey.dc.html` (project root). Edit this with dc_* tools, then copy it to `index.html` for delivery.
- Deploy/zip must contain ONLY: `index.html`, `support.js`, `ey.dc.html`, `_ds/` folder, `manifest.json`, `sw.js`, `icons/` folder (PWA install support). Nothing else.
- Before sending any zip (present_fs_item_for_download with no path, i.e. whole project): delete any junk from root first — `.bundles`, `uploads`, `.thumbnail`, screenshots, or other stray files/folders. Delete for good, don't just stash-and-restore (stashing risks a race where the zip captures the mid-move state).
- Do not leave temp/stash folders lying around.
