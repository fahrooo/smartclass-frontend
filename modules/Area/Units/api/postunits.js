import { postFetcher } from "@/common/utils/axios";

const postunits = async (payload) => {
  const url = "/units/create";
  const newUnit = {
    nama: payload.nama,
  };

  const data = await postFetcher(url, newUnit);

  return data;
};

export default postunits;
