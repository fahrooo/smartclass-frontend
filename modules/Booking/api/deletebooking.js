import { deleteFetcher } from "@/common/utils/axios";

const deletebooking = async (payload) => {
  const url = `/booking/delete/${payload.id}`;

  const data = await deleteFetcher(url);

  return data;
};

export default deletebooking;
