import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AllUsersTable from "./AllUsersTable";

const allUsers = [
  { id: 1, link: "http://john.example.com" },
  { id: 2, link: "http://jane.example.com" },
];

describe("AllUsersTable", () => {
  const onRemoveUser = jest.fn();

  it("renders the correct headings", () => {
    render(<AllUsersTable allUsers={allUsers} onRemoveUser={onRemoveUser} />);
    expect(screen.getByText("Approved Users")).toBeInTheDocument();
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getByText("Link")).toBeInTheDocument();
  });

  it("renders the correct users data", () => {
    render(<AllUsersTable allUsers={allUsers} onRemoveUser={onRemoveUser} />);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(3); // Including header row
    expect(rows[1]).toHaveTextContent("1");
    expect(rows[1]).toHaveTextContent("http://john.example.com");
    expect(rows[2]).toHaveTextContent("2");
    expect(rows[2]).toHaveTextContent("http://jane.example.com");
  });

  it("calls onRemoveUser when remove button is clicked for user 1", () => {
    render(<AllUsersTable allUsers={allUsers} onRemoveUser={onRemoveUser} />);
    fireEvent.click(screen.getByTestId("remove-user-1"));
    expect(onRemoveUser).toHaveBeenCalledWith(1);
  });

  it("calls onRemoveUser when remove button is clicked for user 2", () => {
    render(<AllUsersTable allUsers={allUsers} onRemoveUser={onRemoveUser} />);
    fireEvent.click(screen.getByTestId("remove-user-2"));
    expect(onRemoveUser).toHaveBeenCalledWith(2);
  });
});
