import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserRequestsTable from "./UserRequestsTable";

const testUserRequests = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    requestDate: new Date("2022-01-01"),
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    requestDate: new Date("2022-02-01"),
  },
];

const testOnApproveUserRequest = jest.fn();
const testOnRejectUserRequest = jest.fn();

describe("UserRequestsTable", () => {
  it("renders the correct headings", () => {
    render(
      <UserRequestsTable
        userRequests={testUserRequests}
        onApproveUserRequest={testOnApproveUserRequest}
        onRejectUserRequest={testOnRejectUserRequest}
      />
    );

    expect(screen.getByText("User Requests")).toBeInTheDocument();
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Request Date")).toBeInTheDocument();

    expect(screen.getByTestId("approve-user-1")).toBeInTheDocument();
    expect(screen.getByTestId("reject-user-1")).toBeInTheDocument();
  });

  it("renders the correct user requests data", () => {
    render(
      <UserRequestsTable
        userRequests={testUserRequests}
        onApproveUserRequest={testOnApproveUserRequest}
        onRejectUserRequest={testOnRejectUserRequest}
      />
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(3); // Including header row
    expect(rows[1]).toHaveTextContent("1");
    expect(rows[1]).toHaveTextContent("John Doe");
    expect(rows[1]).toHaveTextContent("john.doe@example.com");
    expect(rows[1]).toHaveTextContent(
      "Sat Jan 01 2022 00:00:00 GMT+0000 (Coordinated Universal Time)"
    );
    expect(rows[1]).toContainElement(screen.getByTestId("approve-user-1"));
    expect(rows[1]).toContainElement(screen.getByTestId("reject-user-1"));
    expect(rows[2]).toHaveTextContent("2");
    expect(rows[2]).toHaveTextContent("Jane Doe");
    expect(rows[2]).toHaveTextContent("jane.doe@example.com");
    expect(rows[2]).toHaveTextContent(
      "Tue Feb 01 2022 00:00:00 GMT+0000 (Coordinated Universal Time)"
    );
    expect(rows[2]).toContainElement(screen.getByTestId("approve-user-2"));
    expect(rows[2]).toContainElement(screen.getByTestId("reject-user-2"));
  });

  it("calls onApproveUserRequest when approve button is clicked", () => {
    render(
      <UserRequestsTable
        userRequests={testUserRequests}
        onApproveUserRequest={testOnApproveUserRequest}
        onRejectUserRequest={testOnRejectUserRequest}
      />
    );

    fireEvent.click(screen.getByTestId("approve-user-1"));
    expect(testOnApproveUserRequest).toHaveBeenCalledWith(1);
  });

  it("calls onRejectUserRequest when reject button is clicked", () => {
    render(
      <UserRequestsTable
        userRequests={testUserRequests}
        onApproveUserRequest={testOnApproveUserRequest}
        onRejectUserRequest={testOnRejectUserRequest}
      />
    );

    fireEvent.click(screen.getByTestId("reject-user-2"));
    expect(testOnRejectUserRequest).toHaveBeenCalledWith(2);
  });
});
