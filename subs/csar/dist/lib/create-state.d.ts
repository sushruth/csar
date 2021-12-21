import { CreateStateOptions, DeepReadonly } from './create-state.types';
import { getReactRenderer } from './react/react';
export declare function createState<State, Actions>({ init, reducer, notEqual, }: CreateStateOptions<State, Actions>): readonly [(action: Actions) => Promise<void>, <SelectedValue, Selector extends (state: State) => SelectedValue>(selector: Selector, getRenderer?: typeof getReactRenderer) => SelectedValue, () => DeepReadonly<State>];
