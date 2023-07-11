import { postFetcher } from "@/common/utils/axios";

const postkelas = async (payload) => {
  const url = "/kelas/create";
  const newKelas = {
    nama: payload.nama,
    topic: payload.topic,
    id_unit: payload.id_unit,
  };

  const data = await postFetcher(url, newKelas);

  return data;
};

export default postkelas;
