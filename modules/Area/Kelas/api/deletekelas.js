import { deleteFetcher } from "@/common/utils/axios";

const deletekelas = async (payload) => {
  const url = `/kelas/delete/${payload.id}`;

  const data = await deleteFetcher(url);

  return data;
};

export default deletekelas;
