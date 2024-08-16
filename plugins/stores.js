import { useGeneralStore } from "~/stores/general";
import { useLoginStore } from "~/stores/login";

// BPP
import { useDashboardBPPStore } from "~/stores/adminBPP/dashboardBPP";
import { useBaruBPPStore } from "~/stores/adminBPP/baruBPP";

// Dinas
import { useDashboardDinasStore } from "~/stores/adminDinas/dashboardDinas";
import { useBaruDinasStore } from "~/stores/adminDinas/baruDinas";
import { useTidakSesuaiStore } from "~/stores/adminDinas/tidak-sesuai";
import { useTervalidasiDinasStore } from "~/stores/adminDinas/tervalidasiDinas";
import { useRealisasiDinasStore } from "~/stores/adminDinas/realisasiDinas"
import { useArsipDataStore } from "~/stores/adminDinas/arsipdata-Dinas";

// User
import { useUploadDokumen } from "~/stores/user/upload_dokumen";;

// import { useForgetPasswordStore } from "~/stores/forget_password";
// import { useProfileStore } from "~/stores/profile";

export default defineNuxtPlugin((NuxtApp) => {
  return {
    provide: {
      generalStore: useGeneralStore(),
      loginStore: useLoginStore(),

      // dinas
      useDashboardDinasStore: useDashboardDinasStore(),
      baruDinasStore: useBaruDinasStore(),
      tidakSesuaiStore: useTidakSesuaiStore(),
      tervalidasiDinasStore: useTervalidasiDinasStore(),
      realisasiDinasStore: useRealisasiDinasStore(),
      arsipdataDinasStore: useArsipDataStore(),

      //BPP
      useDashboardBPPStore: useDashboardBPPStore(),
      baruBPPStore: useBaruBPPStore(),

      // User
      useUploadDokumen: useUploadDokumen(),
      
      // profileStore: useProfileStore(),
      // forgetPasswordStore: useForgetPasswordStore(),
      
    },
  };
});
