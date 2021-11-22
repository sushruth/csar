# Sanchi

A simple external state helper for react with a reducer-like API.

> **What's with the name?** - pronounced "sun-chi" (root word `संचित` meaning "collected") means "a bag" in some sanskrit-derived languages. There are probably a thousand state management tools out there for react, and all the good names are taken. So I looked towards other languages to pick something I could say easily.

## Why?

I wanted to recreate what [zustand](https://github.com/pmndrs/zustand) / [jotai](https://github.com/pmndrs/jotai) / [valtio](https://github.com/pmndrs/valtio) do but smaller. I ended up with something that has fewer features and maybe even less optimized. If you want a more production-tested library, look to those.

However, `sanchi` is about **595 bytes** minified, by itself, when devtools aren't included (can be tree-shaken away for prod builds). I like that. It makes it easier for me to make other smaller libraries which need this type of global state. It has a few benefits too.

## Install

```
npm i -E sanchi
# or
yarn add -E sanchi
```

Needs `react@^16.12.0` to work.

## Usage

Example project is [available here](https://github.com/sushruth/sanchi/tree/main/subs/demo-site) and is also sort of outlined below.

```tsx
// Assume this file is ./state.ts
import { init } from "./init"; // Initial state
import { reducer } from "./reducer"; // Reducer for the state

import { createState } from 'sanchi'

let options = { init, reducer };

if (process.env.NODE_ENV === "development") { // shake it off for non-dev builds
  const { addDevtools } = require("sanchi");  // basic Redux devtools support
  options = addDevtools({ init, reducer, name: "My app state" })
}

export const [dispatch, useStateSelector] = createState(options);
```

An example reducer can look like - 

```tsx
// Assume this file is reducer.ts
import { Actions, State } from "./types";
import { getUsers } from "./helper";

import { StateReducer } from "sanchi";

export const reducer: StateReducer<State, Actions> = async (
  action,
  getState, // call getState() to get the most updated state
  dispatch // Reducer has access to dispatch
) => {
  if (action.type === "change") {
    const { ids } = action.payload;

    try {
      const data = await getUsers(ids);
      
      return {
        ...getState(),
        users: {
          type: 'success',
          data
        }
      };
    } catch (error) {
      return {
        ...getState(),
        users: {
          type: 'failure',
          error
        }
      }
    }

  }

  return getState();
};
```

Now this state could be used in a component like this - 

```tsx
// Assume this file is my-user.tsx
import { useStateSelector } from './state'

const MyUser: React.FC<{id: string}>({id}) {
  // Now MyUser re-renders only if state.users[id] changes
  const user = useStateSelector(state => state.users[id]);

  return (
    <ul>User {user.id} name is {user.name}</ul>
  )
}
```

## Benefits of `sanchi`

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
2. composing a bunch of dispatchs can happen within the reducer - all business logic is now in the reducer.
3. I avoid adding a bunch of libraries just to get some of the above basic functionality

## Dangers of async reducers - 

Consider this timeline of dispatches starting and finishing at different times. 
- Handler for A starts before B and ends after the B's handler is finished at `t2`. 
- This means if `getState()` was called in A's handler before B was dispatched, A has a stale reference to state.
- When A's handler returns at time `t3`, changes made by B's handler is gone since A's handler applies it's changes on top of whatever state it got in the beginning.

![Stale state](https://i.imgur.com/baDTOSv.png)

This is probably one of the reasons why react or redux teams did not decide to allow async reducers in the first place. However, I am slightly backwards and its working out for me so far. So, I said `¯\_(ツ)_/¯` and made this accept async reducers anyway.

One thing is - if you call `getState()` at the very end of your async handler for a given action, you probably wont fire this foot-gun.