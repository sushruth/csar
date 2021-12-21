const devtoolsName = "__REDUX_DEVTOOLS_EXTENSION__";
let devtools = (() => {
    try {
        return window[devtoolsName] || window.top[devtoolsName];
    }
    catch (error) {
        return undefined;
    }
})();
let instanceId = 0;
export function addDevtools({ init, reducer, name, replacer, reviver, ...rest }) {
    if (devtools) {
        devtools.connect({
            name: name || `ProxyState ${instanceId++}`,
            serialize: {
                replacer,
                reviver,
            },
            features: {
                persist: false,
                export: true,
                import: "custom",
                jump: false,
                skip: false,
                reorder: false,
                dispatch: true,
                test: true, // generate tests for the selected actions
            },
        });
        devtools.send("__INIT__", init);
        const wrappedReducer = async (action, getState, dispatch) => {
            const __startTime = new Date().toISOString();
            const result = reducer(action, getState, dispatch);
            const output = await result;
            if (result instanceof Promise) {
                devtools.send({
                    ...action,
                    __startTime,
                    __endTime: new Date().toISOString(),
                }, output);
            }
            else {
                devtools.send(action, result);
            }
            return result;
        };
        return {
            reducer: wrappedReducer,
            init,
            ...rest
        };
    }
    else {
        return { reducer, init, ...rest };
    }
}
