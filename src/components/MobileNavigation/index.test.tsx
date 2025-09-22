import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import MobileNavigation from "./index";

describe("MobileNavigation", () => {
  test("renders MobileNavigation component with all links", () => {
    render(
      <MemoryRouter>
        <MobileNavigation />
      </MemoryRouter>,
    );

    expect(screen.getByText("bio")).toBeInTheDocument();
    expect(screen.getByText("news")).toBeInTheDocument();
    expect(screen.getByText("faq")).toBeInTheDocument();
    expect(screen.getByText("music")).toBeInTheDocument();
    expect(screen.getByText("links")).toBeInTheDocument();
    expect(screen.getByText("gallery")).toBeInTheDocument();
    expect(screen.getByText("guestbook")).toBeInTheDocument();
    expect(screen.getByText("contact")).toBeInTheDocument();
  });
});
