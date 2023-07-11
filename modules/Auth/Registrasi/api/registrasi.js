import { postFetcherWT } from "@/common/utils/axios";

const registrasi = async (nama, nik, unit, email, password, confPassword) => {
  const url = "/register";

  const data = await postFetcherWT(url, {
    nama: nama,
    nik: nik,
    id_unit: unit,
    email: email,
    password: password,
    confPassword: confPassword,
  });

  return data;
};

export default registrasi;
