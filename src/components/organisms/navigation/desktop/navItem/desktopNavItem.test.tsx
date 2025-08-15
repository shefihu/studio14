import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import system from "../../../../../theme";
import type { ReactElement } from "react";
import { NavItem } from ".";

// Mock the Text component
vi.mock("../../../../atoms/text", () => ({
  Text: vi.fn((componentProps) => (
    <div
      data-testid="nav-text"
      style={{
        color: componentProps.color,
        fontWeight: componentProps.fontWeight,
        transform: componentProps.transform,
        transition: componentProps.transition,
        padding: `${componentProps.py * 4}px ${componentProps.px * 4}px`,
      }}
    >
      {componentProps.children}
    </div>
  )),
}));

// Helper function to render with Chakra UI provider
const renderWithChakra = (component: ReactElement) => {
  return render(<ChakraProvider value={system}>{component}</ChakraProvider>);
};

describe("NavItem Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders children content correctly", () => {
    renderWithChakra(<NavItem>Home</NavItem>);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByTestId("nav-text")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const mockOnClick = vi.fn();
    renderWithChakra(<NavItem onClick={mockOnClick}>Contact</NavItem>);

    const textElement = screen.getByTestId("nav-text");
    const navContainer = textElement.parentElement;

    if (navContainer) {
      fireEvent.click(navContainer);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    }
  });
});
