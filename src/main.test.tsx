import React from "react";
import { render } from "@testing-library/react";
import ReactDOM from "react-dom/client";

// Mock the entire main module
jest.mock("./main.tsx", () => ({}));

describe("main.tsx", () => {
    it("should render the app without crashing", () => {
        const rootElement = document.createElement("div");
        rootElement.id = "root";
        document.body.appendChild(rootElement);

        const createRootSpy = jest.spyOn(ReactDOM, "createRoot");
        const mockRender = jest.fn();
        // @ts-ignore
        createRootSpy.mockReturnValue({ render: mockRender });

        // We need to re-require the module to execute it with the mocks
        require("./main.tsx");

        expect(createRootSpy).toHaveBeenCalledWith(rootElement);
        expect(mockRender).toHaveBeenCalled();

        createRootSpy.mockRestore();
        document.body.removeChild(rootElement);
    });
});