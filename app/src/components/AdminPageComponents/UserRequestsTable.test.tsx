import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserRequestsTable from "./UserRequestsTable";

const testUserRequests = [
  {
    id: 1,
    isPending: true,
  },
  {
    id: 2,
    isPending: false,
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
    expect(screen.getByText("Approve")).toBeInTheDocument();
    expect(screen.getByText("Reject")).toBeInTheDocument();

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
    expect(rows[1]).toContainElement(screen.getByTestId("approve-user-1"));
    expect(rows[1]).toContainElement(screen.getByTestId("reject-user-1"));
    expect(rows[2]).toHaveTextContent("2");
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
