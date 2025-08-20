import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "./index";

describe("Pagination", () => {
  const mockOnPageChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with given props", () => {
    render(
      <Pagination
        currentPage={2}
        onPageChange={mockOnPageChange}
        totalPages={5}
      />,
    );

    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Previous/i })).toBeEnabled();
    expect(screen.getByRole("button", { name: /Next/i })).toBeEnabled();
  });

  it("disables Previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        onPageChange={mockOnPageChange}
        totalPages={5}
      />,
    );

    expect(screen.getByRole("button", { name: /Previous/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Next/i })).toBeEnabled();
  });

  it("disables Next button on last page", () => {
    render(
      <Pagination
        currentPage={5}
        onPageChange={mockOnPageChange}
        totalPages={5}
      />,
    );

    expect(screen.getByRole("button", { name: /Previous/i })).toBeEnabled();
    expect(screen.getByRole("button", { name: /Next/i })).toBeDisabled();
  });

  it("increments currentPage when Next button is clicked", () => {
    render(
      <Pagination
        currentPage={1}
        onPageChange={mockOnPageChange}
        totalPages={5}
      />,
    );

    const nextButton = screen.getByRole("button", { name: /Next/i });

    nextButton.click();

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("decrements currentPage when Previous button is clicked", () => {
    render(
      <Pagination
        currentPage={5}
        onPageChange={mockOnPageChange}
        totalPages={5}
      />,
    );

    const previousButton = screen.getByRole("button", { name: /Previous/i });

    previousButton.click();

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });
});
