import { putFetcher } from "@/common/utils/axios";

const putmqtt = async (payload) => {
  const url = `/mqtt/update/${payload.id}`;

  const data = await putFetcher(url, {
    nama: payload.nama,
  });

  return data;
};

export default putmqtt;
