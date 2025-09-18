import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PageContainer from "./index";
import NavigationProvider from "../../context/NavigationProvider";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const mockReduxStore = configureStore({
  reducer: {
    auth: (
      state = {
        isAuthenticated: true,
        user: {
          username: "mockuser",
          password: "mockpass",
        },
      },
    ) => state,
  },
});

describe("PageContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders PageContainer component with children", () => {
    render(
      <Provider store={mockReduxStore}>
        <PageContainer>
          <div data-testid="child-element">Child Element</div>
        </PageContainer>
      </Provider>,
    );
    const pageContainerElement = screen.getByTestId("child-element");
    expect(pageContainerElement).toBeInTheDocument();
    expect(pageContainerElement).toHaveTextContent("Child Element");
  });

  it("should not render the navigation buttons when on root path", () => {
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/",
      },
      writable: true,
    });

    render(
      <Provider store={mockReduxStore}>
        <PageContainer>
          <div>Test Content</div>
        </PageContainer>
      </Provider>,
    );

    const navigationButtons = screen.queryByRole("button", { name: /back/i });
    expect(navigationButtons).not.toBeInTheDocument();
  });

  it("should render the navigation buttons when not on root path", () => {
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/bio",
      },
      writable: true,
    });

    render(
      <Provider store={mockReduxStore}>
        <BrowserRouter>
          <NavigationProvider>
            <PageContainer>
              <div>Test Content</div>
            </PageContainer>
          </NavigationProvider>
        </BrowserRouter>
      </Provider>,
    );

    const navigationButtons = screen.getByRole("button", { name: /back/i });
    expect(navigationButtons).toBeInTheDocument();
  });
});
