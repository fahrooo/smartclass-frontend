import { postFetcher } from "@/common/utils/axios";
import { useQuery } from "@tanstack/react-query";

const getdatastream = ({
  page,
  limit,
  filter_nama,
  filter_perangkat,
  nama,
  id_perangkat,
}) => {
  const url = "/datastream";

  const { data, ...others } = useQuery(
    [
      "datastream",
      page,
      limit,
      nama,
      id_perangkat,
      filter_nama,
      filter_perangkat,
    ],
    async () =>
      await postFetcher(url, {
        filter_nama: filter_nama,
        filter_perangkat: filter_perangkat,
        nama: nama,
        id_perangkat: id_perangkat,
        page: page,
        limit: limit,
      })
  );

  return { data, ...others };
};

export default getdatastream;
