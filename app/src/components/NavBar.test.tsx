// TEST FILE FOR NAVBAR COMPONENT
// HAS CASES FOR SNAPSHOT TESTING

import React from "react";
import { render } from "@testing-library/react";
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
    const { getByText } = render(<NavBar />);
    expect(getByText("About")).toBeInTheDocument();
  });

  // Test Case 3 : Checks if Contact Us link renders correctly
  it("should render Contact Us link properly", () => {
    const { getByText } = render(<NavBar />);
    expect(getByText("Contact us")).toBeInTheDocument();
  });

  // Test Case 4 : Checks if Help link renders correctly
  it("should render Help link properly", () => {
    const { getByText } = render(<NavBar />);
    expect(getByText("Help")).toBeInTheDocument();
  });
});

/**
    test('snapshot test for About link', () => {
    const component = create(<NavBar />);
    const aboutLink = component.root.findByProps({ href: '/about' });
    expect(aboutLink.props.children).toBe('About');
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('snapshot test for Contact Us link', () => {
    const component = create(<NavBar />);
    const contactLink = component.root.findByProps({ href: '/contactus' });
    expect(contactLink.props.children).toBe('Contact Us');
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('snapshot test for Help link', () => {
    const component = create(<NavBar />);
    const contactLink = component.root.findByProps({ href: '/help' });
    expect(contactLink.props.children).toBe('Help');
    expect(component.toJSON()).toMatchSnapshot();
   */
