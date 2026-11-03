# Suggested implementation for Battles of History

## Timeline states
1. Late 1914 — isolated earthworks and shallow trenches.
2. 1915 — linked front/support trenches, communication trenches, wire and shell damage.
3. Early–mid 1916 — expanded dugouts and mine/countermine network; major mine craters.
4. Winter 1916–17 — protected subways, aid posts, supply infrastructure, Canadian assembly preparations.
5. April 1917 — damaged wire and trenches, intense cratering, assault exits and barrage.

## Layer architecture
- `terrain_base`: permanent elevations, roads, settlements and terrain features.
- `surface_trenches`: each segment with `side`, `earliest_date`, `latest_date`, `confidence`, `source_id`, `damage_state`.
- `wire_obstacles`: placement, construction date and damage.
- `fortified_positions`: dugouts, machine-gun posts, bunkers, entrances.
- `underground_mines`: galleries, shafts, listening posts and charges.
- `underground_subways`: assembly passages, access points and facilities.
- `logistics`: tramways, tracks, cable routes, water points, ammunition stores.
- `damage`: artillery craters, mine craters, ruined structures, repaired segments.

## Historical confidence
- `documented`: directly supported by a dated plan, official report, photo or archaeological record.
- `inferred`: supported by multiple sources or geography, but no precise location established.
- `illustrative`: representative construction added for teaching; do not present as a specific historical feature.

## Production checklist for Claude
- Obtain dated georeferenced trench maps for 1914, 1915, 1916 and April 1917 if possible.
- Identify original map projection, scale and coordinates before tracing.
- Distinguish British/French/Canadian and German positions at each date.
- Verify the location of each subway entrance and mine crater against plans.
- Model destruction and rebuilding, not only new construction.
- Use historically plausible tunnel cross sections; avoid connecting every underground element arbitrarily.
- Keep the 9 April 1917 05:30 attack time and creeping barrage distinct from earlier bombardment.
- Label reconstructed features in research metadata even if the map itself remains unlabelled.

## Suggested narration cue
"The ridge did not become a fortress in a single season. Over two years, soldiers cut firing trenches, built shelters and wire obstacles, and dug beneath the ground. By the winter of 1916, the Canadians faced a layered German defence. Their engineers answered with protected tunnels, new supply routes and carefully prepared assault positions."
