import { postFetcherWT } from "@/common/utils/axios";

const updatepassword = async (email, password) => {
  const url = "/updatepassword";

  const data = await postFetcherWT(url, {
    email: email,
    password: password,
  });

  return data;
};

export default updatepassword;
