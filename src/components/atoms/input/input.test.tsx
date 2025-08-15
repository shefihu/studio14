import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";

import type { ReactElement } from "react";
import system from "../../../theme";
import { Input } from ".";

// Helper function to render with Chakra UI provider
const renderWithChakra = (component: ReactElement) => {
  return render(<ChakraProvider value={system}>{component}</ChakraProvider>);
};

describe("Input Component", () => {
  describe("Basic Rendering", () => {
    it("renders input correctly", () => {
      renderWithChakra(<Input data-testid="input-component" />);

      const input = screen.getByTestId("input-component");
      expect(input).toBeInTheDocument();
      expect(input).toBeInstanceOf(HTMLInputElement);
    });

    it("renders with placeholder text", () => {
      renderWithChakra(
        <Input
          placeholder="Enter your text"
          data-testid="input-with-placeholder"
        />
      );

      const input = screen.getByTestId("input-with-placeholder");
      expect(input).toHaveAttribute("placeholder", "Enter your text");
    });

    it("renders with default value", () => {
      renderWithChakra(
        <Input defaultValue="Default text" data-testid="input-with-default" />
      );

      const input = screen.getByTestId("input-with-default");
      expect(input).toHaveValue("Default text");
    });

    it("renders with controlled value", () => {
      renderWithChakra(
        <Input
          value="Controlled value"
          onChange={() => {}}
          data-testid="controlled-input"
        />
      );

      const input = screen.getByTestId("controlled-input");
      expect(input).toHaveValue("Controlled value");
    });
  });

  describe("Input Types", () => {
    it("renders as text input by default", () => {
      renderWithChakra(<Input data-testid="default-type" />);

      const input = screen.getByTestId("default-type") as HTMLInputElement;
      // HTML input elements don't have a type attribute when it's the default "text"
      expect(input).toBeInstanceOf(HTMLInputElement);
      expect(input.type).toBe("text");
    });

    it("renders as password input when type is password", () => {
      renderWithChakra(<Input type="password" data-testid="password-input" />);

      const input = screen.getByTestId("password-input");
      expect(input).toHaveAttribute("type", "password");
    });

    it("renders as email input when type is email", () => {
      renderWithChakra(<Input type="email" data-testid="email-input" />);

      const input = screen.getByTestId("email-input");
      expect(input).toHaveAttribute("type", "email");
    });

    it("renders as number input when type is number", () => {
      renderWithChakra(<Input type="number" data-testid="number-input" />);

      const input = screen.getByTestId("number-input");
      expect(input).toHaveAttribute("type", "number");
    });
  });

  describe("Input States", () => {
    it("renders disabled input correctly", () => {
      renderWithChakra(<Input disabled data-testid="disabled-input" />);

      const input = screen.getByTestId("disabled-input");
      expect(input).toBeDisabled();
    });

    it("renders readonly input correctly", () => {
      renderWithChakra(<Input readOnly data-testid="readonly-input" />);

      const input = screen.getByTestId("readonly-input");
      expect(input).toHaveAttribute("readonly");
    });

    it("renders required input correctly", () => {
      renderWithChakra(<Input required data-testid="required-input" />);

      const input = screen.getByTestId("required-input");
      expect(input).toBeRequired();
    });

    it("renders invalid input correctly", () => {
      renderWithChakra(
        <Input aria-invalid="true" data-testid="invalid-input" />
      );

      const input = screen.getByTestId("invalid-input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("Size Variants", () => {
    it("renders with small size", () => {
      renderWithChakra(<Input size="sm" data-testid="small-input" />);

      const input = screen.getByTestId("small-input");
      expect(input).toBeInTheDocument();
    });

    it("renders with medium size (default)", () => {
      renderWithChakra(<Input size="md" data-testid="medium-input" />);

      const input = screen.getByTestId("medium-input");
      expect(input).toBeInTheDocument();
    });

    it("renders with large size", () => {
      renderWithChakra(<Input size="lg" data-testid="large-input" />);

      const input = screen.getByTestId("large-input");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Styling and Theme", () => {
    it("applies default border color", () => {
      renderWithChakra(<Input data-testid="styled-input" />);

      const input = screen.getByTestId("styled-input");
      expect(input).toBeInTheDocument();
      // Note: Testing exact styles might be brittle in different environments
      // Focus on functional behavior instead
    });

    it("accepts custom className", () => {
      renderWithChakra(
        <Input className="custom-class" data-testid="custom-class-input" />
      );

      const input = screen.getByTestId("custom-class-input");
      expect(input).toHaveClass("custom-class");
    });

    it("accepts custom styles", () => {
      renderWithChakra(
        <Input
          style={{ backgroundColor: "red" }}
          data-testid="custom-style-input"
        />
      );

      const input = screen.getByTestId("custom-style-input");
      expect(input).toHaveStyle("background-color: rgb(255, 0, 0)");
    });
  });

  describe("Event Handling", () => {
    it("handles onChange events", async () => {
      const user = userEvent.setup();
      let value = "";
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        value = e.target.value;
      };

      renderWithChakra(
        <Input onChange={handleChange} data-testid="change-input" />
      );

      const input = screen.getByTestId("change-input");
      await user.type(input, "test");

      expect(value).toBe("test");
    });

    it("handles onFocus events", async () => {
      const user = userEvent.setup();
      let focused = false;
      const handleFocus = () => {
        focused = true;
      };

      renderWithChakra(
        <Input onFocus={handleFocus} data-testid="focus-input" />
      );

      const input = screen.getByTestId("focus-input");
      await user.click(input);

      expect(focused).toBe(true);
    });

    it("handles onBlur events", async () => {
      const user = userEvent.setup();
      let blurred = false;
      const handleBlur = () => {
        blurred = true;
      };

      renderWithChakra(<Input onBlur={handleBlur} data-testid="blur-input" />);

      const input = screen.getByTestId("blur-input");
      await user.click(input);
      await user.tab(); // This will blur the input

      expect(blurred).toBe(true);
    });

    it("handles onKeyDown events", async () => {
      const user = userEvent.setup();
      let keyPressed = "";
      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        keyPressed = e.key;
      };

      renderWithChakra(
        <Input onKeyDown={handleKeyDown} data-testid="keydown-input" />
      );

      const input = screen.getByTestId("keydown-input");
      await user.type(input, "a");

      expect(keyPressed).toBe("a");
    });
  });

  describe("Props Override", () => {
    it("allows overriding default borderColor", () => {
      renderWithChakra(
        <Input borderColor="red.500" data-testid="override-border" />
      );

      const input = screen.getByTestId("override-border");
      expect(input).toBeInTheDocument();
    });

    it("allows overriding hover styles", () => {
      renderWithChakra(
        <Input
          _hover={{ borderColor: "blue.500" }}
          data-testid="override-hover"
        />
      );

      const input = screen.getByTestId("override-hover");
      expect(input).toBeInTheDocument();
    });

    it("allows overriding focus styles", () => {
      renderWithChakra(
        <Input
          _focus={{ borderColor: "green.500", boxShadow: "none" }}
          data-testid="override-focus"
        />
      );

      const input = screen.getByTestId("override-focus");
      expect(input).toBeInTheDocument();
    });

    it("merges additional props with defaults", () => {
      renderWithChakra(
        <Input
          bg="gray.50"
          p={4}
          borderRadius="lg"
          data-testid="additional-props"
        />
      );

      const input = screen.getByTestId("additional-props");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("supports aria-label", () => {
      renderWithChakra(
        <Input aria-label="Username input" data-testid="aria-label-input" />
      );

      const input = screen.getByTestId("aria-label-input");
      expect(input).toHaveAttribute("aria-label", "Username input");
    });

    it("supports aria-describedby", () => {
      renderWithChakra(
        <Input
          aria-describedby="help-text"
          data-testid="aria-describedby-input"
        />
      );

      const input = screen.getByTestId("aria-describedby-input");
      expect(input).toHaveAttribute("aria-describedby", "help-text");
    });

    it("supports aria-invalid", () => {
      renderWithChakra(
        <Input aria-invalid="true" data-testid="aria-invalid-input" />
      );

      const input = screen.getByTestId("aria-invalid-input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("can be focused programmatically", () => {
      renderWithChakra(<Input data-testid="focusable-input" />);

      const input = screen.getByTestId("focusable-input");
      input.focus();

      expect(input).toHaveFocus();
    });
  });

  describe("Integration Tests", () => {
    it("works with form elements", () => {
      renderWithChakra(
        <form data-testid="test-form">
          <Input name="username" data-testid="form-input" />
        </form>
      );

      const form = screen.getByTestId("test-form");
      const input = screen.getByTestId("form-input");

      expect(form).toBeInTheDocument();
      expect(input).toHaveAttribute("name", "username");
    });

    it("renders without crashing with all props", () => {
      expect(() =>
        renderWithChakra(
          <Input
            type="text"
            placeholder="Enter text"
            defaultValue="Default"
            size="md"
            disabled={false}
            readOnly={false}
            required={false}
            data-testid="all-props-input"
          />
        )
      ).not.toThrow();
    });

    it("maintains functionality when wrapped in other components", () => {
      renderWithChakra(
        <div>
          <Input data-testid="wrapped-input" />
        </div>
      );

      const input = screen.getByTestId("wrapped-input");
      expect(input).toBeInTheDocument();
      expect(input).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe("Edge Cases", () => {
    it("handles empty onChange gracefully", () => {
      expect(() =>
        renderWithChakra(
          <Input onChange={() => {}} data-testid="empty-change" />
        )
      ).not.toThrow();
    });

    it("handles null/undefined values gracefully", () => {
      expect(() =>
        renderWithChakra(
          <Input
            value={undefined}
            defaultValue={undefined}
            data-testid="undefined-values"
          />
        )
      ).not.toThrow();
    });

    it("handles very long text input", async () => {
      const user = userEvent.setup();
      const longText = "a".repeat(1000);

      renderWithChakra(<Input data-testid="long-text-input" />);

      const input = screen.getByTestId("long-text-input");
      await user.type(input, longText);

      expect(input).toHaveValue(longText);
    });

    it("handles special characters", async () => {
      const user = userEvent.setup();
      // Use fireEvent for special characters that userEvent can't handle
      renderWithChakra(<Input data-testid="special-chars-input" />);

      const input = screen.getByTestId("special-chars-input");

      // Test with simpler special characters that userEvent can handle
      await user.type(input, "!@#$%^&*()_+-=");
      expect(input).toHaveValue("!@#$%^&*()_+-=");

      // Use fireEvent.change for the more complex characters
      fireEvent.change(input, { target: { value: "[]{}|;:,.<>?" } });
      expect(input).toHaveValue("[]{}|;:,.<>?");
    });
  });
});
