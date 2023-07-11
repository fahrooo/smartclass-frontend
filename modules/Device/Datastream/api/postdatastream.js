import { postFetcher } from "@/common/utils/axios";

const postdatastream = async (payload) => {
  const url = "/datastream/create";
  const newDatastream = {
    id_perangkat: payload.id_perangkat,
    nama: payload.nama,
    turn_on: payload.turn_on,
    turn_off: payload.turn_off,
    default_value: payload.default_value,
    max_value: payload.max_value,
    min_value: payload.min_value,
  };

  const data = await postFetcher(url, newDatastream);

  return data;
};

export default postdatastream;
