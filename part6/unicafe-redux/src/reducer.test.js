import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

describe("unicafe reducer", () => {
    const initialState = {
        good: 0,
        ok: 0,
        bad: 0,
    };

    test("should return a proper initial state when called with undefined state", () => {
        const state = {};
        const action = {
            type: "DO_NOTHING",
        };

        const newState = counterReducer(undefined, action);
        expect(newState).toEqual(initialState);
    });

    test("good is incremented", () => {
        const action = {
            type: "GOOD",
        };
        const state = initialState;

        deepFreeze(state);
        const newState = counterReducer(state, action);
        expect(newState).toEqual({
            good: 1,
            ok: 0,
            bad: 0,
        });
    });

    test("bad is incremented", () => {
        const action = { type: "BAD" };

        const state = initialState;
        deepFreeze(state);
        const newState = counterReducer(state, action);
        expect(newState).toEqual({ good: 0, ok: 0, bad: 1 });
    });

    test("ok is incremented", () => {
        // define state and action
        // deepFreeze the state to check if the reducer is an immutable function
        // call reducer with the state and an action
        // expect new state to be the correct obj
        const state = initialState;
        const action = { type: "OK" };

        deepFreeze(state);

        const newState = counterReducer(state, action);
        expect(newState).toEqual({
            good: 0,
            ok: 1,
            bad: 0,
        });
    });

    test("reset stats will return to initial state", () => {
        // define new state with other values
        // define the action
        // deepFreeze the state to check if the reducer is an immutable function
        // call reducer with the state and action
        // expect new state to equal initialState
        const state = {
            good: 1,
            ok: 1,
            bad: 1,
        };
        const action = { type: "ZERO" };

        deepFreeze(state);

        const newState = counterReducer(state, action);
        expect(newState).toEqual(initialState);
    });
});
