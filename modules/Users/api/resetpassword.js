import { postFetcher } from "@/common/utils/axios";

const resetpassword = async (payload) => {
  const url = "/resetpassword";
  const resetPassword = {
    email: payload.email,
  };

  const data = await postFetcher(url, resetPassword);

  return data;
};

export default resetpassword;
