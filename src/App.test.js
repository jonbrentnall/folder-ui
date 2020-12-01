import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders folder UI ", () => {
    render(<App />);
    const linkElement = screen.getByText(/folder ui/i);
    expect(linkElement).toBeInTheDocument();
});

test("renders sample json data", () => {
    render(<App />);
    const jsonData = screen.getByText(/Employee Handbook/i);
    expect(jsonData).toBeInTheDocument();
});
