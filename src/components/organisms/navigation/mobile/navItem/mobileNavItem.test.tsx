import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import type { ReactElement } from "react";
import system from "../../../../../theme";
import MobileMenu from "..";

// Mock the MobileNavItem component - note the correct path
vi.mock("../navItem", () => ({
  default: vi.fn(({ children, isActive, onClick }) => (
    <button
      data-testid={`mobile-nav-item-${children.toLowerCase()}`}
      onClick={onClick}
      className={isActive ? "active" : "inactive"}
    >
      {children}
    </button>
  )),
}));

// Helper function to render with Chakra UI provider
const renderWithChakra = (component: ReactElement) => {
  return render(<ChakraProvider value={system}>{component}</ChakraProvider>);
};

describe("MobileMenu Component", () => {
  const defaultProps = {
    activeItem: "Dashboard",
    onNavItemClick: vi.fn(),
    isEmployeeMode: true,
    onSwitchToggle: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("renders all navigation items correctly when open", () => {
    renderWithChakra(<MobileMenu {...defaultProps} isOpen={true} />);

    expect(screen.getByTestId("mobile-nav-item-dashboard")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-nav-item-resources")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-nav-item-toolkit")).toBeInTheDocument();
  });

  it("does not render navigation items when closed", () => {
    renderWithChakra(<MobileMenu {...defaultProps} isOpen={false} />);

    // When closed, the menu should still be in the DOM but not visible
    // The component uses maxHeight and opacity for animation
    const menu =
      screen
        .getByTestId("mobile-nav-item-dashboard")
        .closest('[role="group"]') ||
      document.querySelector('[data-testid*="mobile-nav-item"]')?.parentElement
        ?.parentElement;

    if (menu) {
      expect(menu).toHaveStyle({ maxHeight: "0" });
    }
  });

  it("applies active state to the correct navigation item", () => {
    renderWithChakra(
      <MobileMenu {...defaultProps} activeItem="Resources" isOpen={true} />
    );

    const dashboardItem = screen.getByTestId("mobile-nav-item-dashboard");
    const resourcesItem = screen.getByTestId("mobile-nav-item-resources");
    const toolkitItem = screen.getByTestId("mobile-nav-item-toolkit");

    expect(dashboardItem).toHaveClass("inactive");
    expect(resourcesItem).toHaveClass("active");
    expect(toolkitItem).toHaveClass("inactive");
  });

  it("handles navigation item clicks correctly", () => {
    const mockOnNavItemClick = vi.fn();
    renderWithChakra(
      <MobileMenu
        {...defaultProps}
        onNavItemClick={mockOnNavItemClick}
        isOpen={true}
      />
    );

    const dashboardItem = screen.getByTestId("mobile-nav-item-dashboard");
    const resourcesItem = screen.getByTestId("mobile-nav-item-resources");
    const toolkitItem = screen.getByTestId("mobile-nav-item-toolkit");

    fireEvent.click(dashboardItem);
    expect(mockOnNavItemClick).toHaveBeenCalledWith("Dashboard");

    fireEvent.click(resourcesItem);
    expect(mockOnNavItemClick).toHaveBeenCalledWith("Resources");

    fireEvent.click(toolkitItem);
    expect(mockOnNavItemClick).toHaveBeenCalledWith("Toolkit");

    expect(mockOnNavItemClick).toHaveBeenCalledTimes(3);
  });

  it("handles click outside to close menu", async () => {
    vi.useFakeTimers();
    const mockOnClose = vi.fn();

    renderWithChakra(
      <MobileMenu {...defaultProps} isOpen={true} onClose={mockOnClose} />
    );

    // Fast-forward past the 150ms timeout to activate the event listener
    vi.advanceTimersByTime(200);

    // Create an element outside the menu
    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);

    // Simulate click outside
    fireEvent.mouseDown(outsideElement);

    // Run any pending timers and effects
    vi.runAllTimers();

    // Check if onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    // Cleanup
    document.body.removeChild(outsideElement);
  });

  it("does not close menu when clicking inside menu area", () => {
    vi.useFakeTimers();
    const mockOnClose = vi.fn();

    renderWithChakra(
      <MobileMenu {...defaultProps} isOpen={true} onClose={mockOnClose} />
    );

    // Fast-forward past the 150ms timeout
    vi.advanceTimersByTime(200);

    // Click on a navigation item (inside the menu)
    const dashboardItem = screen.getByTestId("mobile-nav-item-dashboard");
    fireEvent.mouseDown(dashboardItem);

    // Run any pending timers
    vi.runAllTimers();

    // onClose should not have been called
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("does not set up click outside listeners when menu is closed", () => {
    const mockOnClose = vi.fn();
    const addEventListenerSpy = vi.spyOn(document, "addEventListener");

    renderWithChakra(
      <MobileMenu {...defaultProps} isOpen={false} onClose={mockOnClose} />
    );

    // Since the effect doesn't run when isOpen is false, no listeners should be added
    expect(addEventListenerSpy).not.toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );
    expect(addEventListenerSpy).not.toHaveBeenCalledWith(
      "touchstart",
      expect.any(Function)
    );

    addEventListenerSpy.mockRestore();
  });

  it("cleans up event listeners when component unmounts", () => {
    vi.useFakeTimers();
    const mockOnClose = vi.fn();
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

    const { unmount } = renderWithChakra(
      <MobileMenu {...defaultProps} isOpen={true} onClose={mockOnClose} />
    );

    // Fast-forward to ensure event listeners are set up
    vi.advanceTimersByTime(200);

    // Unmount the component
    unmount();

    // Check that event listeners were removed
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "touchstart",
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });

  it("handles onClose being undefined gracefully", () => {
    vi.useFakeTimers();

    // Render without onClose prop
    renderWithChakra(<MobileMenu {...defaultProps} isOpen={true} />);

    // Fast-forward past the 150ms timeout
    vi.advanceTimersByTime(200);

    // Create an element outside the menu
    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);

    // This should not throw an error even though onClose is undefined
    expect(() => {
      fireEvent.mouseDown(outsideElement);
      vi.runAllTimers();
    }).not.toThrow();

    // Cleanup
    document.body.removeChild(outsideElement);
  });

  it("prevents closing when clicking on menu button or navbar", () => {
    vi.useFakeTimers();
    const mockOnClose = vi.fn();

    renderWithChakra(
      <MobileMenu {...defaultProps} isOpen={true} onClose={mockOnClose} />
    );

    // Fast-forward past the 150ms timeout
    vi.advanceTimersByTime(200);

    // Create elements that should not close the menu
    const menuButton = document.createElement("button");
    menuButton.setAttribute("data-menu-button", "true");
    document.body.appendChild(menuButton);

    const navbar = document.createElement("nav");
    navbar.setAttribute("data-navbar", "true");
    document.body.appendChild(navbar);

    // Click on menu button - should not close
    fireEvent.mouseDown(menuButton);
    vi.runAllTimers();
    expect(mockOnClose).not.toHaveBeenCalled();

    // Click on navbar - should not close
    fireEvent.mouseDown(navbar);
    vi.runAllTimers();
    expect(mockOnClose).not.toHaveBeenCalled();

    // Cleanup
    document.body.removeChild(menuButton);
    document.body.removeChild(navbar);
  });
});
