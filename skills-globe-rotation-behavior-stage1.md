# Skills Globe Rotation State Model

This note defines the Stage 1 interaction model for `src/components/sections/SkillsSection.tsx`.
It preserves the current globe presentation by keeping the existing resting tilt and the same visible left-to-right idle spin bias.

## Interaction states

### `reduced`
- Enter when `prefers-reduced-motion: reduce` is active.
- Behavior: render the globe at a fixed resting rotation with no continuous animation and no momentum playback.
- Exit when reduced motion no longer applies, resuming `idle`.

### `idle`
- Default animated state when reduced motion is off and no pointer interaction is active.
- Behavior: advance rotation from the baseline idle angular velocity each frame.
- Exit to `pressed` on pointer down.

### `pressed`
- Enter on pointer down before a drag threshold is crossed.
- Behavior: pause visible auto-spin while retaining the current rotation; clear any residual momentum so a new gesture starts from rest.
- Exit to `dragging` once pointer travel passes the drag activation threshold.
- Exit back to `idle` on pointer up/cancel/leave if no drag was activated.

### `dragging`
- Enter after an active pointer crosses the drag threshold.
- Behavior: apply pointer deltas directly to rotation and derive angular velocity from recent movement so release momentum matches the gesture direction.
- Exit to `momentum` on pointer up/cancel/leave.

### `momentum`
- Enter when a drag ends with non-trivial residual angular velocity.
- Behavior: keep advancing rotation from the stored velocity while applying decay every frame.
- Exit to `idle` once velocity magnitude falls below the resume threshold, at which point velocity blends back to the baseline idle vector.
- Exit to `pressed` on a new pointer down.

## State transitions

| From | Event | To | Notes |
| --- | --- | --- | --- |
| `idle` | pointer down | `pressed` | freeze auto-spin at current rotation |
| `pressed` | move below threshold | `pressed` | still paused, not yet dragging |
| `pressed` | move crosses threshold | `dragging` | start direct rotation control |
| `pressed` | pointer up/cancel/leave | `idle` | resume idle spin immediately |
| `dragging` | pointer up/cancel/leave | `momentum` or `idle` | use `idle` directly if release velocity is already below threshold |
| `momentum` | velocity decays below threshold | `idle` | blend velocity back to baseline idle vector |
| `momentum` | pointer down | `pressed` | interrupt momentum cleanly |
| any animated state | reduced motion enabled | `reduced` | stop continuous animation and reset to resting rotation |
| `reduced` | reduced motion disabled | `idle` | restart loop from resting rotation |

## Rotation state fields

```ts
type GlobeInteractionPhase = 'reduced' | 'idle' | 'pressed' | 'dragging' | 'momentum'

type GlobeRotationState = {
  rotation: { x: number; y: number }
  velocity: { x: number; y: number }
  phase: GlobeInteractionPhase
  activePointerId: number | null
  pointerStart: { x: number; y: number } | null
  pointerCurrent: { x: number; y: number } | null
  lastSampleTime: number | null
  dragActivated: boolean
}

type GlobeRotationTuning = {
  dragStartDistancePx: number
  momentumDecayPerFrame: number
  releaseVelocityThreshold: number
  idleResumeBlend: number
}
```

Field intent:

- `rotation`: current rendered globe rotation. This replaces pointer-target interpolation as the animation source of truth.
- `velocity`: current angular velocity in radians per frame or time-normalized radians per millisecond, as long as the implementation stays consistent.
- `phase`: controls whether the loop applies idle spin, pause, drag updates, momentum decay, or reduced-motion fallback.
- `activePointerId`: keeps mouse/touch interaction on one captured pointer path.
- `pointerStart`: anchor used to detect when a press becomes a drag.
- `pointerCurrent`: latest pointer position for delta calculation.
- `lastSampleTime`: supports stable velocity derivation from pointer samples and frame deltas.
- `dragActivated`: separates simple press-and-hold pause from actual drag rotation.
- `dragStartDistancePx`: small activation threshold to avoid accidental drags during a press.
- `momentumDecayPerFrame`: friction term used only in `momentum`.
- `releaseVelocityThreshold`: minimum remaining speed before the controller stops momentum and returns to idle.
- `idleResumeBlend`: per-frame blend factor that steers post-momentum velocity back to the idle vector instead of snapping.

## Baseline idle constants

These values are chosen to preserve the current presentation when no user input is active.

```ts
const RESTING_ROTATION = { x: -0.34, y: 0.78 }
const IDLE_SPIN_VELOCITY = { x: 0, y: 0.003 }
const DRAG_START_DISTANCE_PX = 6
const RELEASE_VELOCITY_THRESHOLD = 0.0008
const IDLE_RESUME_BLEND = 0.04
```

Notes:

- `RESTING_ROTATION` matches the current initial globe tilt.
- `IDLE_SPIN_VELOCITY.y = 0.003` matches the current per-frame idle yaw increment, which is about `0.18 rad/s` at 60 FPS.
- `IDLE_SPIN_VELOCITY.x = 0` keeps the current presentation stable instead of introducing vertical drift.
- `RELEASE_VELOCITY_THRESHOLD` is intentionally below idle yaw speed so the controller can leave momentum before smoothly returning to the baseline spin vector.

## Implementation notes for Stage 2

- Keep the existing point generation, projection, depth ordering, and node styling unchanged.
- Treat vertical drag input conservatively; the spec's open question about tighter vertical clamping remains unresolved in Stage 1.
- Use a single animation loop that reads `phase`, updates `rotation` from `velocity`, and only schedules continuous frames outside `reduced`.
