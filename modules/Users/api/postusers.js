import { postFetcher } from "@/common/utils/axios";

const postusers = async (payload) => {
  const url = "/users/create";
  const newUser = {
    nama: payload.nama,
    nik: payload.nik,
    id_unit: payload.id_unit,
    role: payload.role,
    email: payload.email,
    password: payload.password,
    is_active: true,
  };

  const data = await postFetcher(url, newUser);

  return data;
};

export default postusers;
