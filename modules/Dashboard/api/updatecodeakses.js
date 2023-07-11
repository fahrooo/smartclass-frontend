import { postFetcher } from "@/common/utils/axios";

const updatecodeakses = async (payload) => {
  const url = `/updatecodeakses`;
  const newCodeAkses = {
    id: payload.id,
    code_akses: payload.code_akses,
  };

  const data = await postFetcher(url, newCodeAkses);

  return data;
};

export default updatecodeakses;
