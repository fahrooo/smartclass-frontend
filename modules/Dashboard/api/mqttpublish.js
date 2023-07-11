import { postFetcher } from "@/common/utils/axios";

const mqttpublish = async ({ topic, message }) => {
  const url = "/mqtt/publish";

  const data = await postFetcher(url, {
    topic: topic,
    message: message,
  });

  return data;
};

export default mqttpublish;
