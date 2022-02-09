import { CreateStateOptions, DeepReadonly } from './create-state.types';
export declare function createState<State, Actions>({ init, reducer, notEqual, }: CreateStateOptions<State, Actions>): readonly [(action: Actions) => Promise<void>, <SelectedValue>(fn: (state: State) => SelectedValue) => SelectedValue, () => DeepReadonly<State>];
export default createState;
