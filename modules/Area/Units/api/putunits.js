import { putFetcher } from "@/common/utils/axios";

const putunits = async (payload) => {
  const url = `/units/update/${payload.id}`;
  const newUnit = {
    nama: payload.nama,
  };

  const data = await putFetcher(url, newUnit);

  return data;
};

export default putunits;
