/*
Represents a user in the list of all users
*/
export interface User {
    id: number;
  }
  
/*
Represents a user request to be added to the list of all users
*/
export interface UserRequest {
  id: number;
  isPending: boolean;
}

/*
Represents a table containing the list of all user requests
*/
export interface UserRequestsTableProps {
  userRequests: UserRequest[];
  onApproveUserRequest: (userId: number) => void;
  onRejectUserRequest: (userId: number) => void;
}

/*
Represents a table containing the list of all users
*/
export interface AllUsersTableProps {
  allUsers: User[];
  onRemoveUser: (userId: number) => void;
}

export interface User {
  id: number;
  link: string;
}
