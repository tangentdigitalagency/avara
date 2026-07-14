# The Avara Component Process

Every component in `@avara/react` follows this sequence. Skipping steps produces components that look done but aren't.

## 1. Identity & Contract

Define the component's purpose and what it explicitly does _not_ do. Pick props from the existing shared vocabulary first (`size`, `color`, `variant`, `radius`, `isX`) — only invent new props when the component genuinely needs something no existing component covers. Every new prop should pass the Guessability Test: could someone who's used one Avara component correctly guess this one?

## 2. Scaffold

Same folder shape every time:

    src/components/<name>/
      <name>.tsx
      <name>.variants.ts
      <name>.test.tsx

## 3. Build in layers

1. Accessibility & behavior first — reach for Base UI only when native HTML semantics genuinely aren't enough (Button didn't need it; Input will).
2. Composition
3. Styling — tokens only, never a hardcoded value. If a value isn't in `theme.css`, it doesn't belong in a component.
4. Motion — deliberate, tied to `motion-tokens.ts`, never decorative-only.

## 4. Comprehensive visual test page

Every variant × color × size combination, in both light and dark mode. Screenshot it and actually look — don't assume correctness from reading the code.

## 5. Fix real bugs found by looking

Contrast, focus rings, spacing, edge cases. This step reliably finds things step 4 alone doesn't.

## 6. Real tests

Behavioral coverage for every prop — not just "does it render." If a prop has a non-obvious behavior (like Button's `aria-disabled` choice), it gets its own dedicated test.

## 7. Full pipeline, clean

Run before every commit, all green locally, not just "looks right":

    pnpm lint && pnpm typecheck && pnpm test && pnpm build

## 8. Commit, push, confirm CI

Every component lands with CI green, not just a local pass.

## Deferred on purpose (do not do prematurely)

- Extracting shared logic into `@avara/tokens`, `@avara/motion`, etc. — wait for 3+ components to reveal real patterns (duplicate first, abstract later).
- A second theme — wait until enough components exist to know what actually varies between themes.
- The full docs site template — wait until enough components exist to know what a docs page actually needs to show.
