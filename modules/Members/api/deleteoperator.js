import { deleteFetcher } from "@/common/utils/axios";

const deletemember = async (payload) => {
  const url = `/member/delete/${payload.id}`;

  const data = await deleteFetcher(url);

  return data;
};

export default deletemember;
