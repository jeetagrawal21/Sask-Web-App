import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import AdminPage, { User, UserRequest } from "./AdminPage";

// Mock data for testing
const mockUserRequests: UserRequest[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    requestDate: new Date(),
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    requestDate: new Date(),
  },
];

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
  },
];

// Mock fetch functions for testing
const mockFetchUserRequests = jest.fn(() => Promise.resolve(mockUserRequests));
const mockFetchAllUsers = jest.fn(() => Promise.resolve(mockUsers));
const mockHandleApproveUserRequest = jest.fn();
const mockHandleRejectUserRequest = jest.fn();
const mockHandleRemoveUser = jest.fn();

// Mock the useState hook
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));


// Mock the useEffect hook
describe("AdminPage", () => {
  beforeEach(() => {
    // Reset the mock functions and the state
    jest.clearAllMocks();
    (React.useState as jest.Mock).mockReturnValueOnce([
      [],
      mockFetchUserRequests,
    ]);
    (React.useState as jest.Mock).mockReturnValueOnce([[], mockFetchAllUsers]);
  });

  // Test that the page renders the correct headings
  it("renders user requests and all users", async () => {
    const { getByText } = render(<AdminPage />);
    await waitFor(() => {
      // Check that the page renders the correct headings
      expect(getByText("User Requests")).toBeInTheDocument();
      expect(getByText("All Users")).toBeInTheDocument();
    });
  });

  // Test that the fetch functions are called on mount
  it("calls fetch functions on mount", async () => {
    render(<AdminPage />);
    await waitFor(() => {
      expect(mockFetchUserRequests).toHaveBeenCalledTimes(1);
      expect(mockFetchAllUsers).toHaveBeenCalledTimes(1);
    });
  });
});
  