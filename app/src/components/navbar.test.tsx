// TEST FILE FOR NAVBAR COMPONENT 
// HAS CASES FOR SNAPSHOT TESTING

import React from 'react';
import { render } from '@testing-library/react';
import Navbar from './navbar';

/**
 * Descrpition: Test function for Navbar component.
 * 
 * Pre-Condition: None
 * 
 * Post-Condition: None
 * 
 * Return: None
 */

describe('Navbar component', () => {

    // Test Case 1 : Checks if the navbar component renders correctly
    it('should render properly', () => {
      const { container } = render(<Navbar />);
      expect(container).toMatchSnapshot();
    });
  
    // Test Case 1 : Checks if all links renders correctly
    it('should render all links properly', () => {
      const { getByText } = render(<Navbar />);
      expect(getByText('About')).toBeInTheDocument();
      expect(getByText('Contact us')).toBeInTheDocument();
      expect(getByText('Help')).toBeInTheDocument();
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