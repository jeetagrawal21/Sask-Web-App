import React from 'react';
import ReactDom from 'react-dom';
import Header from './header';
import {render} from '@testing-library/react';
// import { isTSAnyKeyword} from '@label/types';

it('header component should render',async () => {
    const wrapper = render(<Header/>);

    expect(wrapper).toMatchSnapshot();
    // expect(<Header></Header>).toBe(<Header></Header>);
});

it('H1 tag should have the right text (SASK)',async () => {
    const wrapper = render(<Header/>);

    const heading = await wrapper.findAllByText('SASK');

    expect(heading).toBeTruthy();

});


it('H2 tag should have the right text (LONGCOVID)',async () => {
    const wrapper = render(<Header/>);

    const heading = await wrapper.findAllByText('LONGCOVID');

    expect(heading).toBeTruthy();

});