import { getFetchcerWT } from "@/common/utils/axios";
import Cookies from "js-cookie";
import { create } from "zustand";

const useAuthUserStore = create((set) => ({
  session: {},
  fetch: async (url) => {
    const response = await getFetchcerWT(url);
    set({ session: await response });
  },
}));

const id = Cookies.get("_id");
if (id) {
  useAuthUserStore
    .getState()
    .fetch(`https://qa-smartclass.pindad.co.id/be/me/${id}`);
    // .fetch(`http://localhost:5000/me/${id}`);
}

export default useAuthUserStore;
