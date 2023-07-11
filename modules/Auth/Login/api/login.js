import { postFetcherWT } from "@/common/utils/axios";

const login = async (email, password) => {
  const url = "/login";

  const data = await postFetcherWT(url, {
    email: email,
    password: password,
  });

  return data;
};

export default login;
