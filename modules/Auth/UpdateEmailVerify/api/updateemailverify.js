import { postFetcherWT } from "@/common/utils/axios";

const updateemailverify = async (newEmail, oldEmail) => {
  const url = "/updateemailverify";

  const data = await postFetcherWT(url, {
    new_email: newEmail,
    old_email: oldEmail,
  });

  return data;
};

export default updateemailverify;
