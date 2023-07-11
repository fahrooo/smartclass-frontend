import { putFetcher } from "@/common/utils/axios";

const putperangkatkelas = async (payload) => {
  const url = `/perangkatkelas/update/${payload.id}`;
  const newPerangkatKelas = {
    id_kelas: payload.id_kelas,
    id_datastream: payload.id_datastream,
    nama: payload.nama,
  };

  const data = await putFetcher(url, newPerangkatKelas);

  return data;
};

export default putperangkatkelas;
