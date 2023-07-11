import { postFetcher } from "@/common/utils/axios";

const matchcodeakses = async (payload) => {
  const url = `/matchcodeakses`;
  const newCodeAkses = {
    id: payload.id,
    code_akses: payload.code_akses,
  };

  const data = await postFetcher(url, newCodeAkses);

  return data;
};

export default matchcodeakses;
