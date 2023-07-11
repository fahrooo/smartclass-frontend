import { postFetcher } from "@/common/utils/axios";

const rejectbooking = async (payload) => {
  const url = "/booking/reject";
  const updateBooking = {
    id_kelas: payload.id_kelas,
    id_waktu: payload.id_waktu,
    waktu_pemesanan: payload.waktu_pemesanan,
  };

  const data = await postFetcher(url, updateBooking);

  return data;
};

export default rejectbooking;
