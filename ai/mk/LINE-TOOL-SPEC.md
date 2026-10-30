# LINE Tool — Full Functional Spec (for exact recreation)

Source of truth: PDF-MARKUP.dc.html, `tool === 'line'`. This describes every behavior needed to rebuild LINE identically in a new program.

## 1. Data model
Each finished line chain is one action object on the page's action list:
```
{ type: 'stroke', tool: 'line', color: <hex>, lineWidth: <px>, opacity: 1,
  points: [[x,y], [x,y], ...],      // canvas-space coords, one per vertex
  arcs: { <segmentIndex>: <bulgePx>, ... }  // optional, only for curved segments
}
```
`arcs` key `i` bulges the segment between `points[i]` and `points[i+1]`. No entry = straight segment.

## 2. Activation
- Keyboard shortcut: `L` (also `R`) selects the tool, unless currently mid-chain on `line`/`area` (see length-freeze below, which also binds Space/L/R).
- Selecting any tool resets in-progress state: `lineStage=0`, `lineAnchor=null`, `lineChainStart=null`, clears selection.

## 3. Creating a chain
State machine driven by `lineStage` (0 = idle, 1 = mid-chain) plus `lineAnchor` (last placed point) and `lineChainStart` (first point of the chain).

1. **First click** (`lineStage !== 1`): if the click lands within `14px` (canvas px, DPI-scaled: `14 * canvas.width/rect.width`) of an existing line's stroke, it selects that line instead (see §6) and does not start a new chain. Otherwise it sets `lineAnchor = lineChainStart = point`, `lineStage = 1`.
2. **Each subsequent click**: computes `end = applyLineLock(lineAnchor, rawPoint, event)` (straight-lock, §4). If `end` is within `4px` of `lineAnchor`, the chain simply ends (treated as a double-click-in-place) — no zero-length segment is added.
3. **Auto-close to start**: if the chain has ≥2 points placed (`hasChain`) and `end` is within the same `14px` threshold of `lineChainStart`, the click snaps exactly onto `lineChainStart` (`finalEnd = chainStart`), the closing segment is pushed, and the chain **ends automatically** — this is how a chain becomes a closed loop.
4. Otherwise the segment `[lineAnchor, finalEnd]` is pushed as its own action (note: LINE stores each segment as a **separate single-segment stroke action**, not one action with N points — each `push` call sends a 2-point `points` array), `lineAnchor` becomes `finalEnd`, `lineStage` stays `1` for the next segment.
5. Every push clears the redo stack for that page and updates the undo counter.

### Ending a chain
- **Double-click**: fires `closeLineChain`. If pointer is within `4px` of anchor, just ends. Otherwise same close-to-start check as above, then ends.
- **Right-click** and **Esc**: both call `endLineChain()` directly, ending immediately without adding a final segment.
- `endLineChain()` resets `lineStage=0`, `lineAnchor=null`, `lineChainStart=null`, `lineDir=null`, clears `lengthFrozen`, redraws.

### Rectangle shortcut
- Pressing `S` while tool is `line` (or `area`) toggles a one-shot `rectPending` flag (only when not mid-length-freeze, no modifier keys held).
- If `rectPending` and a chain is already started (`lineChainStart` set) OR **Shift+click** is used to start one: the **next click** completes a rectangle from `lineChainStart` (corner 1) to that click point (corner 2), pushing a 5-point closed rectangle path `[c1, (c2x,c1y), c2, (c1x,c2y), c1]` as one action, then ends the chain. This bypasses normal segment-by-segment chaining entirely.
- While `rectPending` is active and one point is placed, pointer-move renders a live rectangle preview.

## 4. Straight-lock + magnet snapping (`applyLineLock`)
Holding **Shift or Ctrl** while placing a point:
- Locks the segment's angle to the nearest 45° increment (0/45/90/135/...) relative to the previous segment's direction, computed once per anchor (cached via `_lockAnchorKey`/`_lockAngle` so it doesn't re-round every frame).
- Additionally snaps to nearby existing geometry: gathers candidate points via `collectVertexPoints(pageNum)` (every vertex of every shape on the page) plus the in-progress chain's own start point and any in-progress AREA points. If any candidate lies within the magnet radius (`getMagnetRadiusCanvas()`) of the *locked-direction line* (found by projecting), the locked point snaps to sit exactly on that candidate along the locked direction.
- Without Shift/Ctrl, no angle lock and no magnet snap — the point is placed exactly at the cursor.
- **Continuation lock**: for the second and later segments in a chain, the direction is locked to match the *first* segment's direction (chain-wide straight lock), per the existing DIMENSION-tool-parity feature.

## 5. Live feedback while drawing
- A live length label follows the cursor while a chain/segment is active (`activeDrawing` includes `lineStage === 1`).
- Length can be frozen (typed exact value) by pressing `Space`, `R`, or `L` while `lineStage === 1` — freezes the currently-projected length so you can type a precise value.
- The zoom/magnifier bubble is visible during line placement, positioned to whichever side has room, with proximity/activity blue glow.
- Hover preview: while idle (`lineStage !== 1`) and not dragging a vertex/arc, hovering within `cursorRadius` of an existing line sets `hoveredLineIdx`, triggering the hover glow.

## 6. Selection & rendering states
- Click-to-select threshold: `14px` canvas-scaled distance from the line's path (`actionHitDistance`).
- Shift-click adds to selection; plain click on empty space clears it (unless it's a chain-start click, see §3.1).
- **Hover** glow: `shadowColor = '#3b82f6'` (blue), `shadowBlur = 16`.
- **Selected** glow: `shadowColor = '#ff0000'` (red), `shadowBlur = 24`.
- When exactly one line/area is selected, every vertex is drawn as a white-filled circle (`r=7`) with a colored stroke (red `#ff0000` for lines, orange `#ff8c00` for areas), 2px line width.
- When exactly two lines are selected and they share an endpoint (within `8px`), that shared vertex is highlighted with a white-filled `16×16` square, red stroke — this is the "shared node" used for dragging two chains' joint simultaneously (`draggingSharedNode`).

## 7. Post-creation editing (mousedown on a selected/existing line)
On mousedown, for each line shape hit-tested against the click:
1. **Vertex hit** (within selection radius of an existing vertex, and vertex distance ≤ nearest-edge distance): starts `draggingAreaVertex` (shared machinery with AREA) — dragging moves that point live.
2. **Edge hit, distance ~0** (`screenDist < 1`, i.e. click essentially exactly on the line): inserts a new vertex at the exact clicked point (using `pointOnArcSeg` so it respects any existing arc bulge on that segment) and immediately starts dragging it (`draggingAreaVertex`). If the segment already had an arc, the bulge is split proportionally between the two new sub-segments (each scaled by `0.7×` the position-weighted portion) so the curve's shape is preserved.
3. **Edge hit, distance ≥1** (click near but not exactly on the line): starts an **arc-bulge drag** on that segment (`draggingArcBulge`) — dragging perpendicular to the segment bulges it into a curve, drawn via `quadraticCurveTo` from the segment midpoint offset by the bulge amount along the segment's normal.
4. **Alt held** on any edge hit forces the arc-bulge-drag path regardless of distance.
5. There is a floating "New Node / Arc" choice popup (`lineEditChoice` state + `chooseLineNewNode`/`chooseLineArc` handlers) wired into the template, but nothing in the current code path actually populates `lineEditChoice` with data — it's present in markup/state but effectively dead in the shipped build. The live behavior is purely the distance/Alt branching in steps 2–4. Worth deciding in the new build whether to keep it as inert scaffolding or wire it up as an explicit choice menu instead of the implicit distance rule.

### Vertex drag completion (`onPointerUp`)
- If a dragged vertex ends within `12px` (canvas-scaled) of another vertex on the same shape, it **merges**: the dragged vertex is deleted (only if the shape still has more than the minimum point count — 2 for lines), collapsing the two into one point. For AREA shapes this also recomputes area/label; not applicable to LINE but the merge still applies to line vertices.

### Undo for point edits
- Every vertex move/insert/delete first calls `snapshotAreaPoints(pageNum, actionIdx, previousPoints)`, pushing onto a **separate per-page undo stack** (`pointEditStackByPage`) distinct from the main action undo/redo stack.
- A dedicated "Undo last point edit" button (`undoPointEdit`, tooltip "Undo the last area point move/insert/delete") pops this stack; shown/enabled only when it's non-empty.

## 8. Rendering (both live canvas and export/print paths — logic duplicated at ~3 scale contexts: live ratio, ratio=1, export)
For each stroke: `moveTo` first point; for each subsequent point, if `arcs[idx-1]` exists, draw `quadraticCurveTo` using a control point at the segment midpoint offset by `bulge * normal` (normal = perpendicular unit vector of the segment, scaled by the render ratio); otherwise `lineTo`. Standard `strokeStyle/lineWidth/lineCap='round'/lineJoin='round'`.

## 9. Color
LINE uses the fixed tool color palette (`COLORS` keyed by `colorKey` state: blue/red/green/yellow/orange), the same color selector as pen/highlighter — **not** an auto-cycling per-shape palette (that's AREA-only, `AREA_COLORS`).

## 10. Deletion
Selected line(s) delete via the standard selection-delete path (Delete/Backspace key) shared across all markup types, removing the action(s) from `actionsByPage` and pushing to the main undo/redo stack.

## Known gaps vs. AREA (for the new build to decide on)
- No proximity-close *preview visual* beyond the length label (AREA doesn't have one either beyond a magnet cue at the candidate point — same behavior, just no fill to render since LINE isn't filled).
- No category/sqft/label system — not applicable to an open/closed line path.
- No auto-cycling color per new shape.
