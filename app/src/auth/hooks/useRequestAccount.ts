import axios from "axios";
import { useMutation } from "react-query";

const requestAccount = async ({ participantID }: { participantID: string }) => {
  const { data } = await axios.post("/api/request-account", { participantID });
  return data;
};

export function useRequestAccount() {
  const { isLoading, mutateAsync } = useMutation(requestAccount);
  return { isLoading, requestAccount: mutateAsync };
}
