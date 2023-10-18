import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For expect(...).toBeInTheDocument()

import App from './App';
import Home from './Home';
import About from './About';
import Hurricanes from './Hurricanes';
import Counties from "./Counties";
import AidOrganizations from './Aid Organizations';




test('renders the landing page', () => {
    render(<App />);
});

test('check if the navigation var exists', () => {
    render(<App />);

    const navigationBar = screen.getByRole('banner'); 
    expect(navigationBar).toBeInTheDocument();
});

test('renders the Home page', () => {
    render(<Home />);

});

test('renders the About page', () => {
    render(<About />);

});

test("renders title 'About our project'", () => {
    const { getByText } = render(<About />);
    const titleElement = getByText(/About our project/i);
    expect(titleElement).toBeInTheDocument();
});

test("renders 'Our Team' on the About page", () => {
    render(<About />);
    const teamElement = screen.getByText(/Our Team/i);
    expect(teamElement).toBeInTheDocument();
});

test("renders 'Carolyn Stripling' on the About page", () => {
    render(<About />);
    const carolynElement = screen.getByText(/Carolyn Stripling/i);
    expect(carolynElement).toBeInTheDocument();
});

test("renders 'Carolyn Stripling' on the About page", () => {
    render(<About />);
    const carolynElement = screen.getByText(/Eshitha Bangray/i);
    expect(carolynElement).toBeInTheDocument();
});

test("renders 'Carolyn Stripling' on the About page", () => {
    render(<About />);
    const carolynElement = screen.getByText(/James Stewart/i);
    expect(carolynElement).toBeInTheDocument();
});

test("renders 'Carolyn Stripling' on the About page", () => {
    render(<About />);
    const carolynElement = screen.getByText(/Nitish Bansal/i);
    expect(carolynElement).toBeInTheDocument();
});

test("renders 'Carolyn Stripling' on the About page", () => {
    render(<About />);
    const carolynElement = screen.getByText(/Rohan Chugh/i);
    expect(carolynElement).toBeInTheDocument();
});


// test('renders the Hurricanes page', () => {
//     render(<Hurricanes />);

// });

// test('renders the Counties page', () => {
//     render(<Counties />);

// });

// test('renders the Aid Organizations page', () => {
//     render(<AidOrganizations />);

// });
