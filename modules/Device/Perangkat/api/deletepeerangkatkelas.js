import { deleteFetcher } from "@/common/utils/axios";

const deleteperangkatkelas = async (payload) => {
  const url = `/perangkatkelas/delete/${payload.id}`;

  const data = await deleteFetcher(url);

  return data;
};

export default deleteperangkatkelas;
