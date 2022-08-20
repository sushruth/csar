# `csar`

Short for "**Context-less state & async reducers**". A zustand middleware that allows for async reducers. The "context-less state" part is achieved by zustand while te "async reducers" part is achieved with this middleware.

This library used to provide both by itself before. Now it moved on to using zustand since there is a lot of cool work going on with zustand!.

Props to zustand! - https://github.com/pmndrs/zustand

[![codecov](https://codecov.io/gh/sushruth/csar/branch/main/graph/badge.svg?token=2RR6NQJO7R)](https://codecov.io/gh/sushruth/csar)

## Install

```
npm i -E csar
# or
yarn add -E csar
```

## Usage

`createAsyncState` function takes in an object with an initial state and a reducer.

```tsx
import { createAsyncState } from "csar";

const [dispatch, useStateSelector] = createAsyncState(
  async reducer(action, getState, dispatch) { // async reducer
    // reducer logic here
  },
  initialState, // initial state
);
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

## Computed values

Best way to have computed values from state using `csar` is to have custom hooks for them - 

```tsx
function useUserFullName(id) {
  const user = useStateSelector(state => state.user[id]?.value);
  if(!user) return 'FNU';
  return `${user?.firstName} ${user?.lastName}`
}
```

> Note: I am working on a few extra middlewares that provide a better API for computed values. This section may change soon.

# Async Reducers

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

  dist/index.esm.js ────────── 843b ── 100.0%
   └ src/lib/create-state.ts ─ 208b ─── 24.7%
      └ src/index.ts

  dist/index.cjs.js ────────── 1.4kb ─ 100.0%
   ├ src/lib/create-state.ts ─ 225b ─── 16.2%
   │  └ src/index.ts
   └ src/index.ts ───────────── 76b ──── 5.5%

```

## Thanks

Thanks to [@pmndrs](https://github.com/pmndrs) for the library.