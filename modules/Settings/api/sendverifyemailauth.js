import { postFetcher } from "@/common/utils/axios";

const sendverifyemailauth = async (newEmail, oldEmail) => {
  const url = "/sendverifyemailauth";

  const data = await postFetcher(url, {
    newEmail: newEmail,
    oldEmail: oldEmail,
  });

  return data;
};

export default sendverifyemailauth;
