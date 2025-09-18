import { act, screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationButtons from "./index";
import NavigationProvider from "../../context/NavigationProvider";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Mock the useNavigation hook
const mockGoForward = jest.fn(() => {
  return mockHistory.length > 0 ? mockHistory[mockHistory.length - 1] : null;
});
let mockHistory: string[] = [];
const mockGoBack = jest.fn(() => {
  return mockHistory.length > 1 ? mockHistory[mockHistory.length - 2] : null;
});
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

jest.mock("@hooks", () => ({
  __esModule: true,
  useNavigation: () => ({
    goForward: mockGoForward,
    history: mockHistory,
    goBack: mockGoBack,
    updateHistory: jest.fn(),
  }),
}));

describe("NavigationButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render the navigation buttons", () => {
    mockHistory = ["/music", "/bio"];

    render(
      <Provider store={mockReduxStore}>
        <Router>
          <NavigationProvider>
            <NavigationButtons />
          </NavigationProvider>
        </Router>
      </Provider>,
    );
    const backButton = screen.getByRole("button", { name: /back/i });
    const homeButton = screen.getByRole("button", { name: /home/i });
    const nextButton = screen.getByRole("button", { name: /next/i });

    expect(backButton).toBeInTheDocument();
    expect(homeButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("should disable the back button when there is no history", () => {
    mockHistory = ["/"];

    render(
      <Provider store={mockReduxStore}>
        <Router>
          <NavigationProvider>
            <NavigationButtons />
          </NavigationProvider>
        </Router>
      </Provider>,
    );
    const backButton = screen.getByRole("button", { name: /back/i });
    expect(backButton).toBeDisabled();
  });

  it("should enable the back button when there is history", () => {
    mockHistory = ["/music", "/bio"];

    render(
      <Provider store={mockReduxStore}>
        <Router>
          <NavigationProvider>
            <NavigationButtons />
          </NavigationProvider>
        </Router>
      </Provider>,
    );
    const backButton = screen.getByRole("button", { name: /back/i });
    expect(backButton).not.toBeDisabled();
  });

  it("should call the goBack function when the Back button is clicked", () => {
    mockHistory = ["/music", "/bio"];

    render(
      <Provider store={mockReduxStore}>
        <Router>
          <NavigationProvider>
            <NavigationButtons />
          </NavigationProvider>
        </Router>
      </Provider>,
    );
    const backButton = screen.getByRole("button", { name: /back/i });

    act(() => backButton.click());
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it("should call the goForward function when the Next button is clicked", () => {
    mockHistory = ["/music", "/bio"];

    render(
      <Provider store={mockReduxStore}>
        <Router>
          <NavigationProvider>
            <NavigationButtons />
          </NavigationProvider>
        </Router>
      </Provider>,
    );
    const nextButton = screen.getByRole("button", { name: /next/i });

    act(() => nextButton.click());
    expect(mockGoForward).toHaveBeenCalledTimes(1);
  });
});
