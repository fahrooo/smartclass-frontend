import { deleteFetcher } from "@/common/utils/axios";

const deleteoperator = async (payload) => {
  const url = `/operator/delete/${payload.id}`;

  const data = await deleteFetcher(url);

  return data;
};

export default deleteoperator;
