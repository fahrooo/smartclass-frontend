import { deleteFetcher } from "@/common/utils/axios";

const logout = async () => {
  const url = "/logout";

  const data = await deleteFetcher(url);

  return data;
};

export default logout;
