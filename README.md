# `@ds-pack/tapable`

A React Hook for creating accessible clickable primatives!

## Installation:

```sh
yarn add @ds-pack/tapable
```

## Usage:

```tsx
import { useTapable } from '@ds-pack/tapable'

let Tapable = forwardRef(function Tapable(props, ref) {
  let baggage = useTapable(props, ref)

  return <div {...baggage} />
})

render(<Tapable onClick={addLike}>Like!</Tapable>)
```

## Contributing:

### `build`

```sh
yarn turbo run build
```

### `test`

```sh
yarn turbo run test
```

### Tools:

- Typescript
- Babel
- Jest
