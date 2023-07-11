import { postFetcher } from "@/common/utils/axios";
import { useQuery } from "@tanstack/react-query";

const getusers = ({
  page,
  limit,
  filter_nama,
  filter_role,
  filter_unit,
  nama,
  id_unit,
  role,
}) => {
  const url = "/users";

  const { data, ...others } = useQuery(
    [
      "users",
      page,
      limit,
      role,
      nama,
      id_unit,
      filter_nama,
      filter_unit,
      filter_role,
    ],
    async () =>
      await postFetcher(url, {
        filter_nama: filter_nama,
        filter_unit: filter_unit,
        filter_role: filter_role,
        nama: nama,
        id_unit: id_unit,
        role: role,
        page: page,
        limit: limit,
      })
  );

  return { data, ...others };
};

export default getusers;
