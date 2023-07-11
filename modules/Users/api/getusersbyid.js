import { getFetchcer } from "@/common/utils/axios";
import { useQuery } from "@tanstack/react-query";

const getusersbyid = ({ id }) => {
  const url = `/users/${id}`;

  const { data, ...others } = useQuery(
    ["users", id],
    async () => await getFetchcer(url)
  );

  return { data, ...others };
};

export default getusersbyid;
