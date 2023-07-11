import { postFetcher } from "@/common/utils/axios";
import { useQuery } from "@tanstack/react-query";

const getkelasbooking = ({ id_unit, waktu_pemesanan }) => {
  const url = "/schedulekelas";

  const { data, ...others } = useQuery(
    ["schedulekelas", id_unit, waktu_pemesanan],
    async () =>
      await postFetcher(url, {
        id_unit: id_unit,
        waktu_pemesanan: waktu_pemesanan,
      })
  );

  return { data, ...others };
};

export default getkelasbooking;
