import { getFetchcer } from "@/common/utils/axios";
import { useQuery } from "@tanstack/react-query";

const getwaktu = () => {
  const url = "/waktu";

  const { data, ...others } = useQuery(
    ["waktu"],
    async () => await getFetchcer(url)
  );

  return { data, ...others };
};

export default getwaktu;
