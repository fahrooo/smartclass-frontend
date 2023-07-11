import { postFetcher } from "@/common/utils/axios";
import { useQuery } from "@tanstack/react-query";

const getkelas = ({ filter_nama, filter_unit, nama, id_unit, page, limit }) => {
  const url = "/kelas";

  const { data, ...others } = useQuery(
    ["kelas", filter_nama, filter_unit, nama, id_unit, page, limit],
    async () =>
      await postFetcher(url, {
        filter_nama: filter_nama,
        filter_unit: filter_unit,
        nama: nama,
        id_unit: id_unit,
        page: page,
        limit: limit,
      })
  );

  return { data, ...others };
};

export default getkelas;
