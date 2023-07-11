import { postFetcher } from "@/common/utils/axios";
import { useQuery } from "@tanstack/react-query";

const getmember = ({
  page,
  limit,
  filter_nama,
  nama,
  filter_booking,
  id_booking,
}) => {
  const url = "/member";

  const { data, ...others } = useQuery(
    ["member", page, limit, nama, filter_nama, filter_booking, id_booking],
    async () =>
      await postFetcher(url, {
        filter_booking: filter_booking,
        filter_nama: filter_nama,
        nama: nama,
        page: page,
        limit: limit,
        id_booking: id_booking,
      })
  );

  return { data, ...others };
};

export default getmember;
