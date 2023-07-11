import { postFetcher } from "@/common/utils/axios";
import { useQuery } from "@tanstack/react-query";

const getunits = ({ filter_nama, nama, page, limit }) => {
  const url = "/units";

  const { data, ...others } = useQuery(
    ["units", filter_nama, nama, page, limit],
    async () =>
      await postFetcher(url, {
        filter_nama: filter_nama,
        nama: nama,
        page: page,
        limit: limit,
      })
  );

  return { data, ...others };
};

export default getunits;
