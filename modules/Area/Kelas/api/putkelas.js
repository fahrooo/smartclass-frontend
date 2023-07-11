import { putFetcher } from "@/common/utils/axios";

const putkelas = async (payload) => {
  const url = `/kelas/update/${payload.id}`;
  const newkelas = {
    nama: payload.nama,
    topic: payload.topic,
    id_unit: payload.id_unit,
  };

  const data = await putFetcher(url, newkelas);

  return data;
};

export default putkelas;
