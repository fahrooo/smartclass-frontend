import { deleteFetcher } from "@/common/utils/axios";

const deleteunits = async (payload) => {
  const url = `/units/delete/${payload.id}`;

  const data = await deleteFetcher(url);

  return data;
};

export default deleteunits;
