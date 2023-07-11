import { postFetcherWT } from "@/common/utils/axios";

const mqttsubscribe = async ({ topic }) => {
  const url = "/mqtt/subscribe";

  const data = await postFetcherWT(url, {
    topic: topic,
  });

  return data;
};

export default mqttsubscribe;
