// TEST FILE FOR NAVBAR COMPONENT
// HAS CASES FOR SNAPSHOT TESTING

import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";

/**
 * Descrpition: Test function for NavBar component.
 *
 * Pre-Condition: None
 *
 * Post-Condition: None
 *
 * Return: None
 */

describe("NavBar component", () => {
  // Test Case 1 : Checks if the navbar component renders correctly
  it("should render properly", () => {
    const { container } = render(<NavBar />);
    expect(container).toMatchSnapshot();
  });

  // Test Case 2 : Checks if About link renders correctly
  it("should render About link properly", () => {
    render(<NavBar />);
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  // Test Case 3 : Checks if Contact Us link renders correctly
  it("should render Contact Us link properly", () => {
    render(<NavBar />);
    expect(screen.getByText("Contact us")).toBeInTheDocument();
  });

  // Test Case 4 : Checks if Help link renders correctly
  it("should render Help link properly", () => {
    render(<NavBar />);
    expect(screen.getByText("Help")).toBeInTheDocument();
  });
});


