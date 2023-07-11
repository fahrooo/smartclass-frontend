import { getFetchcerWT } from "@/common/utils/axios";
import { useQuery } from "@tanstack/react-query";

const getunitsall = () => {
  const url = "/units";

  const { data, ...others } = useQuery(
    ["units"],
    async () => await getFetchcerWT(url)
  );

  return { data, ...others };
};

export default getunitsall;
