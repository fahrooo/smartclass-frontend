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
    .fetch(`http://103.155.246.50:5000/me/${id}`);
    // .fetch(`http://103.155.246.50:5000/me/${id}`);
}

export default useAuthUserStore;
