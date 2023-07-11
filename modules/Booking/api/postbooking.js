import { postFetcher } from "@/common/utils/axios";

const postbooking = async (payload) => {
  const url = "/booking/create";

  const newBooking = {
    id_user: payload.id_user,
    id_kelas: payload.id_kelas,
    id_waktu: payload.id_waktu,
    waktu_pemesanan: payload.waktu_pemesanan,
    is_booking: payload.is_booking,
    status: payload.status,
    keterangan: payload.keterangan,
  };

  const data = await postFetcher(url, newBooking);

  return data;
};

export default postbooking;
