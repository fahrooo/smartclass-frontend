import { deleteFetcher } from "@/common/utils/axios";

const deletedatastream = async (payload) => {
  const url = `/datastream/delete/${payload.id}`;

  const data = await deleteFetcher(url);

  return data;
};

export default deletedatastream;
