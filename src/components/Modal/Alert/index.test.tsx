import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Alert from "./index";
import { AlertType } from "@/types";

describe("Alert", () => {
  const mockOnClose = jest.fn();
  const mockAlertProps: { alertType: AlertType; onClose: () => void } = {
    alertType: "INFO",
    onClose: mockOnClose,
  };

  it("should render the alert component without error", () => {
    render(<Alert {...mockAlertProps}>This is a mock alert!</Alert>);

    expect(screen.getByTestId("alert-container")).toBeInTheDocument();
    expect(screen.queryAllByRole("button")).toHaveLength(2);

    const imgElement = screen.getByRole("img") as HTMLImageElement;
    expect(imgElement).toHaveAttribute("alt", "information icon");
    expect(screen.getByText("This is a mock alert!")).toBeInTheDocument();
  });

  it("should call onClose when the X close button is clicked", () => {
    render(<Alert {...mockAlertProps}>This is a mock alert!</Alert>);

    const xCloseButton = screen.getByRole("button", { name: "X" });

    xCloseButton.click();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when the OK button is clicked", () => {
    render(<Alert {...mockAlertProps}>This is a mock alert!</Alert>);

    const okCloseButton = screen.getByRole("button", { name: "OK" });

    okCloseButton.click();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
