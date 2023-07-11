import { putFetcher } from "@/common/utils/axios";

const putoperator = async (payload) => {
  const url = `/operator/update/${payload.id}`;
  const newOperator = {
    id_user: payload.id_user,
    id_kelas: payload.id_kelas,
  };

  const data = await putFetcher(url, newOperator);

  return data;
};

export default putoperator;
