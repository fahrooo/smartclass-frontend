import { postFetcher } from "@/common/utils/axios";
import { useQuery } from "@tanstack/react-query";

const getperangkatkelas = ({
  page,
  limit,
  nama,
  id_unit,
  id_kelas,
  filter_unit,
  filter_kelas,
  filter_nama,
}) => {
  const url = "/perangkatkelas";

  const { data, ...others } = useQuery(
    [
      "perangkatKelas",
      page,
      limit,
      nama,
      id_unit,
      id_kelas,
      filter_unit,
      filter_kelas,
      filter_nama,
    ],
    async () =>
      await postFetcher(url, {
        filter_nama: filter_nama,
        filter_unit: filter_unit,
        filter_kelas: filter_kelas,
        nama: nama,
        id_unit: id_unit,
        id_kelas: id_kelas,
        page: page,
        limit: limit,
      })
  );

  return { data, ...others };
};

export default getperangkatkelas;
