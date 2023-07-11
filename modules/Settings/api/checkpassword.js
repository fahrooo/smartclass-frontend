import { postFetcher } from "@/common/utils/axios";

const checkpassword = async (email, password) => {
  const url = "/checkpassword";

  const data = await postFetcher(url, {
    email: email,
    password: password,
  });

  return data;
};

export default checkpassword;
