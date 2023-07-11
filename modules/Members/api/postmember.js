import { postFetcher } from "@/common/utils/axios";

const postmember = async (payload) => {
  const url = "/member/create";
  const newMember = {
    id_booking: payload.id_booking,
    id_user: payload.id_user,
  };

  const data = await postFetcher(url, newMember);

  return data;
};

export default postmember;
