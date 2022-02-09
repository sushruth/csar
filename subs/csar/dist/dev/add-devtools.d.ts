import { CreateStateOptionsWithDevtools } from './add-devtools.types';
import { CreateStateOptions } from '../lib/create-state.types';
export declare function addDevtools<State, Actions>({ init, reducer, name, replacer, reviver, ...rest }: CreateStateOptionsWithDevtools<State, Actions>): CreateStateOptions<State, Actions>;
