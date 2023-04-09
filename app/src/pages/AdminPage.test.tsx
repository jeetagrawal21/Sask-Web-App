import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import AdminPage from "../pages/AdminPage";
import {
  UserRequest,
  User,
} from "../components/AdminPageComponents/interfaces";

// mock initial data
const initUserRequests: UserRequest[] = [
  {
    id: 2735,
    isPending: true
  },
  {
    id: 1892,
    isPending: false
  },
];

const initUsers: User[] = [
  { id: 3921, link: "" },
  { id: 2012, link: "" },
  { id: 3289, link: "" },
];

describe("AdminPage", () => {
  beforeEach(() => {
    // wait for initial data to load before each test
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            userRequests: initUserRequests,
            allUsers: initUsers,
          }),
      } as Response)
    );
  });

  // test that the page renders the correct headings
  it("renders user requests and all users", async () => {
    const { getByText } = render(<AdminPage />);
    await waitFor(() => {
      // Check that the page renders the correct headings
      expect(getByText("User Requests")).toBeInTheDocument();
      expect(getByText("All Users")).toBeInTheDocument();
    });
  });

  // test that a user is added to the all users table when approved
  it("should approve a user request and add user to all users table", async () => {
    const { getByText, getByTestId, queryByText } = render(<AdminPage />);
    // wait for initial data to load
    await waitFor(() => {
      expect(getByText("User Requests")).toBeInTheDocument();
      expect(getByText("All Users")).toBeInTheDocument();
    });

    // find the Approve button for the first user request and click it
    const approveButton = getByTestId(`approve-user-${initUserRequests[0].id}`);
    fireEvent.click(approveButton);

    // check that the user has been removed from the user requests table
    await waitFor(() => {
      expect(
        queryByText(`user-${initUserRequests[0].id}`)
      ).not.toBeInTheDocument();
    });
  });

  // test that a user is removed from the user requests table when rejected
  it("should reject a user request and remove it from user requests table", async () => {
    const { getByText, getByTestId, queryByText } = render(<AdminPage />);
    // wait for initial data to load
    await waitFor(() => {
      expect(getByText("User Requests")).toBeInTheDocument();
      expect(getByText("All Users")).toBeInTheDocument();
    });

    // find the Reject button for the first user request and click it
    const rejectButton = getByTestId(`reject-user-${initUserRequests[0].id}`);
    fireEvent.click(rejectButton);

    // check that the user has been removed from the user requests table
    await waitFor(() => {
      expect(
        queryByText(`user-${initUserRequests[0].id}`)
      ).not.toBeInTheDocument();
    });
  });
});
