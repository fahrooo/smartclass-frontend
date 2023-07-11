import { postFetcherWT } from "@/common/utils/axios";

const repeatsendverifyemail = async (email) => {
  const url = "/sendverifyemail";

  const data = await postFetcherWT(url, {
    email: email,
  });

  return data;
};

export default repeatsendverifyemail;
