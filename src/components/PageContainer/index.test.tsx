import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PageContainer from "./index";
import NavigationProvider from "../../context/NavigationProvider";
import { BrowserRouter } from "react-router-dom";

describe("PageContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders PageContainer component with children", () => {
    render(
      <PageContainer>
        <div data-testid="child-element">Child Element</div>
      </PageContainer>,
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
      <PageContainer>
        <div>Test Content</div>
      </PageContainer>,
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
      <BrowserRouter>
        <NavigationProvider>
          <PageContainer>
            <div>Test Content</div>
          </PageContainer>
        </NavigationProvider>
      </BrowserRouter>,
    );

    const navigationButtons = screen.getByRole("button", { name: /back/i });
    expect(navigationButtons).toBeInTheDocument();
  });
});
