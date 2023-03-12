import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import AdminPage, { UserRequest, User } from "./AdminPage";

// mock initial data
const initUserRequests: UserRequest[] = [
  {
    id: 2735,
    name: "Jack Black",
    email: "jack.black@example.com",
    requestDate: new Date(),
  },
  {
    id: 1892,
    name: "Mary White",
    email: "mary.white@example.com",
    requestDate: new Date(),
  },
];

const initUsers: User[] = [
  { id: 3921, name: "John Doe", email: "john.doe@example.com" },
  { id: 2012, name: "Jane Smith", email: "jane.smith@example.com" },
  { id: 3289, name: "Bob Johnson", email: "bob.johnson@example.com" },
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

  // test that a user is removed from the all users table
  it("should remove a user from the all users table", async () => {
    const { getByTestId, queryByText } = render(<AdminPage />);

    // find the Remove button for the first user and click it
    const removeButton = getByTestId(`remove-user-${initUsers[0].id}`);
    fireEvent.click(removeButton);

    // check that the user has been removed from the all users table
    await waitFor(() => {
      expect(queryByText(`user-${initUsers[0].id}`)).not.toBeInTheDocument();
    });
  });

  // test that all users can be removed from the users table
  it("should remove multiple users from the all users table", async () => {
    const { getByText, getByTestId, queryByText } = render(<AdminPage />);
    // wait for initial data to load
    await waitFor(() => {
      expect(getByText("User Requests")).toBeInTheDocument();
      expect(getByText("All Users")).toBeInTheDocument();
    });

    // find all Remove buttons for and click them, checking that the user has been removed from the all users table
    initUsers.forEach((user) => {
      const removeButton = getByTestId(`remove-user-${user.id}`);
      fireEvent.click(removeButton);
      expect(queryByText(`user-${user.id}`)).not.toBeInTheDocument();
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
