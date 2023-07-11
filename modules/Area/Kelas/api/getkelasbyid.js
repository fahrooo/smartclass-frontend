import { getFetchcer } from "@/common/utils/axios";
import { useQuery } from "@tanstack/react-query";

const getkelasbyid = ({ id }) => {
  const url = `/kelas/${id}`;

  const { data, ...others } = useQuery(
    ["kelas", id],
    async () => await getFetchcer(url)
  );

  return { data, ...others };
};

export default getkelasbyid;
