import React from "react";
import { shallow } from "enzyme";
import HashWatcher from "./HashWatcher";
let mockRenderProp;
describe("HashWatcher", () => {
    beforeEach(() => {
        window.addEventListener = jest.fn();
        window.removeEventListener = jest.fn();
        window.location.hash = "#ish";
        mockRenderProp = jest.fn();
    });
    test("adds event listener on mount", () => {
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        shallow(<HashWatcher>{mockRenderProp}</HashWatcher>);
        const [arg1, arg2] = (window.addEventListener as any).mock.calls[0];
        expect(window.addEventListener).toHaveBeenCalledTimes(1);
        expect(arg1).toBe("hashchange");
        expect(typeof arg2).toBe("function");
    });
    test("removes event listener on unmount", () => {
        window.removeEventListener = jest.fn();
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        const component = shallow(<HashWatcher>{mockRenderProp}</HashWatcher>);
        component.unmount();
        const [arg1, arg2] = (window.removeEventListener as any).mock.calls[0];
        expect(window.removeEventListener).toHaveBeenCalledTimes(1);
        expect(arg1).toBe("hashchange");
        expect(typeof arg2).toBe("function");
    });
    test("renders children with a currentHash", () => {
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        shallow(<HashWatcher>{mockRenderProp}</HashWatcher>);
        expect(mockRenderProp).toHaveBeenCalledTimes(1);
        expect(mockRenderProp).toHaveBeenCalledWith({ currentHash: "#ish" });
    });
});
