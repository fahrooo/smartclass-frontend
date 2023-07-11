import { postFetcher } from "@/common/utils/axios";
import { useQuery } from "@tanstack/react-query";

const getoperator = ({
  page,
  limit,
  filter_nama,
  filter_kelas,
  filter_unit,
  nama,
  id_unit,
  id_kelas,
}) => {
  const url = "/operator";

  const { data, ...others } = useQuery(
    [
      "operator",
      page,
      limit,
      id_kelas,
      nama,
      id_unit,
      filter_nama,
      filter_unit,
      filter_kelas,
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

export default getoperator;
