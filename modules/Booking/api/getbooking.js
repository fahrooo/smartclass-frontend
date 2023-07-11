import { postFetcher } from "@/common/utils/axios";
import { useQuery } from "@tanstack/react-query";

const getbooking = ({
  page,
  limit,
  filter_status,
  filter_kelas,
  filter_unit,
  filter_nama,
  nama,
  status,
  id_unit,
  id_kelas,
}) => {
  const url = "/booking";

  const { data, ...others } = useQuery(
    [
      "booking",
      page,
      limit,
      id_kelas,
      status,
      id_unit,
      filter_status,
      filter_unit,
      filter_kelas,
      filter_nama,
      nama,
    ],
    async () =>
      await postFetcher(url, {
        filter_status: filter_status,
        filter_unit: filter_unit,
        filter_kelas: filter_kelas,
        filter_nama: filter_nama,
        status: status,
        id_unit: id_unit,
        id_kelas: id_kelas,
        nama: nama,
        page: page,
        limit: limit,
      })
  );

  return { data, ...others };
};

export default getbooking;
