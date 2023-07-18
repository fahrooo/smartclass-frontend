import { postFetcher } from "@/common/utils/axios";
import { useQuery } from "@tanstack/react-query";

const getperangkatkelasbyschedule = ({ waktu_pemesanan, time_start }) => {
  const url = "/getperangkatkelasbyschedule";

  const { data, ...others } = useQuery(
    ["getperangkatkelasbyschedule", waktu_pemesanan, time_start],
    async () =>
      await postFetcher(url, {
        waktu_pemesanan: waktu_pemesanan,
        time_start: time_start,
      })
  );

  return { data, ...others };
};

export default getperangkatkelasbyschedule;
