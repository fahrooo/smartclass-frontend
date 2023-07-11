import { getFetchcer } from "@/common/utils/axios";
import { useQuery } from "@tanstack/react-query";

const getoperatorbyid = ({ id }) => {
  const url = `/operator/${id}`;

  const { data, ...others } = useQuery(
    ["operator", id],
    async () => await getFetchcer(url)
  );

  return { data, ...others };
};

export default getoperatorbyid;
