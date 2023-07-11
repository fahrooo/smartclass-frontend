import { postFetcher } from "@/common/utils/axios";

const postperangkatkelas = async (payload) => {
  const url = "/perangkatkelas/create";
  const newPerangkatKelas = {
    id_kelas: payload.id_kelas,
    id_datastream: payload.id_datastream,
    nama: payload.nama,
  };

  const data = await postFetcher(url, newPerangkatKelas);

  return data;
};

export default postperangkatkelas;
