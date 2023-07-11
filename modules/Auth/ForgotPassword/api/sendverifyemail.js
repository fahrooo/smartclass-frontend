import { postFetcherWT } from "@/common/utils/axios";

const sendverifyemail = async (email) => {
  const url = "/sendverifyemail";

  const data = await postFetcherWT(url, {
    email: email,
  });

  return data;
};

export default sendverifyemail;
