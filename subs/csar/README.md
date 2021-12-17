# `csar`

Short for "**Context-less state & async reducers**". A simple external state helper for react with a reducer-like API.

## Why?

I wanted to recreate what [zustand](https://github.com/pmndrs/zustand) / [jotai](https://github.com/pmndrs/jotai) / [valtio](https://github.com/pmndrs/valtio) do but smaller. I ended up with something that has fewer features and maybe even less optimized. If you want a more production-tested library, look to those.

However, `csar` is about **672 bytes** minified, by itself, when devtools aren't included (can be tree-shaken away for prod builds). I like that. It makes it easier for me to make other smaller libraries which need this type of global state. It has a few benefits too.

## Install

```
npm i -E csar
# or
yarn add -E csar
```

Needs `react@^16.12.0` to work. This only works with function components for now.

## Usage

`createState` function takes in an object with an initial state and a reducer.

```tsx
import { createState } from "csar";

const [dispatch, useStateSelector] = createState({
  init: {}, // initial state
  async reducer(action, getState, dispatch) { // async reducer
    // reducer logic here
  }
});
```

The selector and dispatch returned by the function can be used in any react component like this - 

```tsx
function UserView({ id }) {
  const userData = useStateSelector((state) => state.users[id]);

  const fetchUser = useCallback(() => {
    dispatch({ type: "FETCH_USER", payload: { id } });
  }, []);

  if (!userData.isFetched) return <button onClick={fetchUser}>Get User</button>;
  if (userData.isLoading) return "loading...";

  return <div>You are now seeing - {userData.value.firstName} data</div>;
}
```

Example project is [available here](https://github.com/sushruth/csar/tree/main/subs/demo-site) for more details on usage.

## Customizing equality check

`useStateSelector` relies on `!==` equality check to compare the result of the selector function between dispatches to determine if a re-render is necessary. This equality check can be customized by passing the `notEqual` function in the options like below - 

```tsx
import equal from 'fast-deep-equal/es6'
import { createState } from "csar";

const [dispatch, useStateSelector] = createState({
  init,
  reducer,
  noEqual: (a, b) => !equal(a, b),
});
```

Note that this has performance implications and must be carefully evaluated.

## Computed values

Best way to have computed values from state using `csar` is to have custom hooks for them - 

```tsx
function useUserFullName(id) {
  const user = useStateSelector(state => state.user[id]?.value);
  if(!user) return 'FNU';
  return `${user?.firstName} ${user?.lastName}`
}
```

## Benefits of `csar`

1. No global providers - fewer whole-tree re-renders
2. It is tiny
3. Supports basic debugging with redux devtools
4. Async reducers (more below)

## Differences from a usual reducer

Reducers for createState have some bonuses -

1. They can be async functions
2. They have access to `dispatch()` inside
3. Previous state is not available in params directly - a `getState()` param is passed which can be called to get the latest state at any given moment - this is to avoid race conditions in async updates.

## Benefits of async reducers

1. Network calls can happen inside the reducer now
2. composing a bunch of dispatches can happen within the reducer - all business logic is now in the reducer.
3. I avoid adding a bunch of libraries just to get some of the above basic functionality

## Dangers of async reducers -

Consider this timeline of dispatches starting and finishing at different times.

- Handler for A starts before B and ends after the B's handler is finished at `t2`.
- This means if `getState()` was called in A's handler before B was dispatched, A has a stale reference to state.
- When A's handler returns at time `t3`, changes made by B's handler is gone since A's handler applies it's changes on top of whatever state it got in the beginning.

![Stale state](https://i.imgur.com/baDTOSv.png)

This is probably one of the reasons why react or redux teams did not decide to allow async reducers in the first place. However, I am slightly backwards and its working out for me so far. So, I said `¯\_(ツ)_/¯` and made this accept async reducers anyway.

# There is hope!

if you call `getState()` at the very end of your async handler for a given action, you probably wont fire the foot-gun I explained above.

#### `esbuild` build analysis

```

  dist/index.cjs.js ────────── 2.7kb ─ 100.0%
   ├ src/dev/add-devtools.ts ─ 679b ─── 24.8%
   │  └ src/dev/index.ts
   │     └ src/index.ts
   ├ src/lib/create-state.ts ─ 670b ─── 24.5%
   │  └ src/index.ts
   └ src/index.ts ───────────── 49b ──── 1.8%


  dist/index.esm.js ────────── 2.2kb ─ 100.0%
   ├ src/dev/add-devtools.ts ─ 679b ─── 30.5%
   │  └ src/dev/index.ts
   │     └ src/index.ts
   └ src/lib/create-state.ts ─ 672b ─── 30.2%
      └ src/index.ts

```