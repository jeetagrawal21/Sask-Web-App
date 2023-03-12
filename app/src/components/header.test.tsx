import React from 'react';
// import ReactDom from 'react-dom';
import Header from './header';
import {render, screen} from '@testing-library/react';
// import { isTSAnyKeyword} from '@label/types';

it('header component should render',async () => {
    const view = render(<Header/>);

    expect(view).toMatchSnapshot();
    // expect(<Header></Header>).toBe(<Header></Header>);
});

it('H1 tag should have the right text (SASK)',async () => {
    render(<Header/>);

    const heading = await screen.findAllByText('SASK');

    expect(heading).toBeTruthy();

});


it('H2 tag should have the right text (LONGCOVID)',async () => {
    render(<Header/>);

    const heading = await screen.findAllByText('LONGCOVID');

    expect(heading).toBeTruthy();

});