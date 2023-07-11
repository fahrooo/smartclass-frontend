import { postFetcher } from "@/common/utils/axios";

const postoperator = async (payload) => {
  const url = "/operator/create";
  const newOperator = {
    id_user: payload.id_user,
    id_kelas: payload.id_kelas,
  };

  const data = await postFetcher(url, newOperator);

  return data;
};

export default postoperator;
