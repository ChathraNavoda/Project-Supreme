import { render, screen, cleanup } from "@testing-library/react";
import Header from "../Header";


test('should render Header component', () => {
    render(<Header />);
    const headerElement = screen.getByTestId('test-1');
    expect(headerElement).toBeInTheDocument();
})