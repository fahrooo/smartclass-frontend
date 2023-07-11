import { postFetcher } from "@/common/utils/axios";
import { useQuery } from "@tanstack/react-query";

const getwaktubooking = ({ id_kelas, waktu_pemesanan }) => {
  const url = "/schedulebooking";

  const { data, ...others } = useQuery(
    ["schedulebooking", id_kelas, waktu_pemesanan],
    async () =>
      await postFetcher(url, {
        id_kelas: id_kelas,
        waktu_pemesanan: waktu_pemesanan,
      })
  );

  return { data, ...others };
};

export default getwaktubooking;
