import { postFetcher } from "@/common/utils/axios";
import { useQuery } from "@tanstack/react-query";

const getperangkat = ({ page, limit, nama }) => {
  const url = "/perangkat";

  const { data, ...others } = useQuery(
    ["perangkat", page, limit, nama],
    async () =>
      await postFetcher(url, {
        nama: nama,
        page: page,
        limit: limit,
      })
  );

  return { data, ...others };
};

export default getperangkat;
