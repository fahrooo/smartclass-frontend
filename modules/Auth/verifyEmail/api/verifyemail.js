import { postFetcherWT } from "@/common/utils/axios";

const verifyemail = async (email, code_otp) => {
  const url = "/verifyemail";

  const data = await postFetcherWT(url, {
    email: email,
    code_otp: code_otp,
  });

  return data;
};

export default verifyemail;
