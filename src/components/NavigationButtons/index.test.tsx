import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationButtons from "./index";
import NavigationProvider from "../../context/NavigationProvider";

// Mock the useNavigation hook
const mockGoForward = jest.fn(() => "/contact");
let mockHistory: string[] = [];

jest.mock("../../hooks/useNavigation/useNavigation", () => ({
  __esModule: true,
  default: () => ({
    goForward: mockGoForward,
    history: mockHistory,
    goBack: jest.fn(),
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
      <Router>
        <NavigationProvider>
          <NavigationButtons />
        </NavigationProvider>
      </Router>,
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
      <Router>
        <NavigationProvider>
          <NavigationButtons />
        </NavigationProvider>
      </Router>,
    );
    const backButton = screen.getByRole("button", { name: /back/i });
    expect(backButton).toBeDisabled();
  });

  it("should enable the back button when there is history", () => {
    mockHistory = ["/music", "/bio"];

    render(
      <Router>
        <NavigationProvider>
          <NavigationButtons />
        </NavigationProvider>
      </Router>,
    );
    const backButton = screen.getByRole("button", { name: /back/i });
    expect(backButton).not.toBeDisabled();
  });
});
