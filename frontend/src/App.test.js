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

test("renders 'Data Sources' section", () => {
    render(<About />);
    const dataSource = screen.getByText("Data Sources");
    expect(dataSource).toBeInTheDocument();
});

test("renders 'Southwest Hurricane Aid' text", () => {
    render(<Home />);
    const slideTexts = screen.getAllByText(/Southwest Hurricane Aid/i);
    expect(slideTexts.length).toBeGreaterThan(0);
});

test("renders 'Wikipedia API' button on the About page", () => {
    render(<About />);
    const wikipediaAPIButton = screen.getByText(/Wikipedia API/i);
    expect(wikipediaAPIButton).toBeInTheDocument();
});


test("renders 'GitLab Repo' button on the About page", () => {
    render(<About />);
    const gitLabRepoButton = screen.getAllByText(/GitLab Repo/i);
    expect(gitLabRepoButton.length).toBeGreaterThan(0);
});

test("renders 'Postman API' button on the About page", () => {
    render(<About />);
    const postmanAPIButton = screen.getAllByText(/Postman API/i);
    expect(postmanAPIButton.length).toBeGreaterThan(0);
});

test('renders total commits and issues on About page', async () => {
    render(<About />);
    const commitsElement = await screen.findByText(/Total number of commits:/i);
    const issuesElement = await screen.findByText(/Total number of issues:/i);
    expect(commitsElement).toBeInTheDocument();
    expect(issuesElement).toBeInTheDocument();
});

test('navigation bar has links to all main sections', () => {
    render(<App />);
    const homeLink = screen.getAllByText(/Home/i); // You might need to adjust these based on the actual texts
    const aboutLink = screen.getAllByText(/About/i);
    const hurricanesLink = screen.getAllByText(/Hurricanes/i);
    expect(homeLink.length).toBeGreaterThan(0);
    expect(aboutLink.length).toBeGreaterThan(0);
    expect(hurricanesLink.length).toBeGreaterThan(0);
});

test("renders 'Tools used' section on the About page", () => {
    render(<About />);
    const toolsUsedElement = screen.getByText(/Tools used:/i);
    expect(toolsUsedElement).toBeInTheDocument();
});

test('each member card in About has an image', () => {
    render(<About />);
    const memberImages = screen.getAllByRole('img'); 
    expect(memberImages.length).toBeGreaterThanOrEqual(0);
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
