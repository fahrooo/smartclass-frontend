import { putFetcher } from "@/common/utils/axios";

const putusers = async (payload) => {
  const url = `/users/update/${payload.id}`;
  const newUser = {
    nama: payload.nama,
    nik: payload.nik,
    id_unit: payload.id_unit,
    role: payload.role,
    email: payload.email,
    password: payload.password,
    is_active: payload.is_active,
  };

  const data = await putFetcher(url, newUser);

  return data;
};

export default putusers;
