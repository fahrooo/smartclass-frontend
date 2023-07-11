import { deleteFetcher } from "@/common/utils/axios";

const deleteusers = async (payload) => {
  const url = `/users/delete/${payload.id}`;

  const data = await deleteFetcher(url);

  return data;
};

export default deleteusers;
