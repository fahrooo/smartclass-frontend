import { getFetchcer } from "@/common/utils/axios";

const getmqtt = async (email, password) => {
  const url = "/mqtt";

  const data = await getFetchcer(url);

  return data;
};

export default getmqtt;
