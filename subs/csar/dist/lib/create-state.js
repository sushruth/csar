import { notEqualDefault } from './defaults';
import { getReactRenderer } from './react/react';
export function createState({ init, reducer, notEqual = notEqualDefault, }) {
    const handlerMap = new Map();
    const lastResultMap = new Map();
    const stateHolder = {
        _state: init,
        get state() {
            return this._state;
        },
        set state(newState) {
            this._state = newState;
            for (const [fn, handler] of handlerMap.entries()) {
                // Figure out a way to run handlers for ONLY the changed property
                if (!handler)
                    continue;
                const lastResult = lastResultMap.get(fn);
                const newResult = fn(this._state);
                if (notEqual(newResult, lastResult)) {
                    lastResultMap.set(fn, newResult);
                    handler();
                }
            }
        },
    };
    function getState() {
        return stateHolder.state;
    }
    async function dispatch(action) {
        const result = await reducer(action, getState, dispatch);
        stateHolder.state = result;
    }
    function unregister(selector) {
        handlerMap.delete(selector);
        lastResultMap.delete(selector);
    }
    function registerOnce(selector, handler) {
        const value = selector(stateHolder.state);
        if (!handlerMap.has(selector)) {
            handlerMap.set(selector, handler);
            lastResultMap.set(selector, value);
        }
        return value;
    }
    /**
     * Returns a function that returns the result of a selector
     * @param selector Selector function that takes in state and returns a part of it
     * @param getRenderer a function that takes in the selector function and returns a function that can be used to force update the component
     * @returns the selected part of the state
     */
    function useStateSelector(selector, getRenderer = getReactRenderer) {
        const renderer = getRenderer(selector, unregister);
        return registerOnce(selector, renderer);
    }
    return [dispatch, useStateSelector, getState];
}
