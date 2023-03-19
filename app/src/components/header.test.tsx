// TEST FILE FOR HEADER COMPONENT 
// HAS CASES FOR SNAPSHOT TESTING

import React from 'react';
import Header from './header';
import {render, screen} from '@testing-library/react';

/**
 * Descrpition: Test function for Header component.
 * 
 * Pre-Condition: None
 * 
 * Post-Condition: None
 * 
 * Return: None
 */

describe('Header component', () => {

    // Test Case 1 : Checks if the header component renders correctly
    it('header component should render',async () => {
        const view = render(<Header/>);

        expect(view).toMatchSnapshot();
    
    });

    // Test Case 2 : Checks if Sask text appears correctly
    it('H1 tag should have the right text (SASK)',async () => {
        render(<Header/>);

        const heading = await screen.findAllByText('SASK');

        expect(heading).toBeTruthy();

    });

    // Test Case 3 : Checks if Longcovid text appears correctly
    it('H2 tag should have the right text (LONGCOVID)',async () => {
        render(<Header/>);

        const heading = await screen.findAllByText('LONGCOVID');

        expect(heading).toBeTruthy();

    });
});
