<template>
  <section>
    <div class="h-screen bg-[#F6F7FF]">
      <div class="flex justify-end">
        <img src="/form/tlkm.svg" />
      </div>
      <div>
        <button
          @click="navigateTo('/user/welcoming')"
          class="font-bold text-xl px-20 hover:text-red-600"
        >
          Back
        </button>
      </div>
      <div class="flex flex-col items-center mx-5 md:mx-60">
        <h1 class="mx-10 py-10 text-center text-2xl md:text-3xl font-semibold">
          Form Pengisian Kurir
        </h1>
        <div
          class="box-utama w-full h-[550px] md:w-[600px] bg-white rounded-xl border p-10 overflow-y-auto"
        >
          <div class="flex flex-col md:flex-row md:gap-10">
            <div class="w-full">
              <div class="py-3">
                <span for="nama" class="font-semibold">Nama Pengirim</span>
                <input
                  required
                  type="text"
                  name="nama"
                  id="nama"
                  class="block w-full px-3 py-1 my-2 text-base placeholder-gray-500 transition duration-500 ease-in-out transform border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  placeholder="Masukan Nama"
                  v-model="nama_tamu"
                />
              </div>
              <div class="py-3">
                <span for="no_telp" class="font-semibold">No Telp</span>
                <input
                  required
                  type="bolean"
                  name="no_telp"
                  id="no_telp"
                  class="block w-full px-3 py-1 my-2 text-base placeholder-gray-500 transition duration-500 ease-in-out transform border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  placeholder="Masukan No Telp"
                  v-model="no_tlp"
                />
              </div>
              <div class="py-3">
                <span for="ditemui" class="font-semibold"
                  >Orang Yang Ditemui</span
                >
                <Multiselect
                  v-model="id_moklet"
                  id="ditemui"
                  :options=filteredMoklet
                  label="nama_moklet"
                  valueProp="id_moklet"
                  :searchable="true"
                />
              </div>
              <div class="py-3">
                <span for="instansi" class="font-semibold">Asal Instansi</span>
                <input
                  required
                  type="text"
                  name="instansi"
                  id="instansi"
                  class="block w-full px-3 py-1 my-2 text-base placeholder-gray-500 transition duration-500 ease-in-out transform border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  placeholder="Pilih Instansi"
                  v-model="asal_instansi"
                />
              </div>
              <div class="py-3">
                <span for="file" class="font-semibold">Upload file</span>
                <input
                  required
                  type="file"
                  name="file"
                  id="file"
                  class="block w-full px-3 my-2 text-base placeholder-gray-500 transition duration-500 ease-in-out transform border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  placeholder="Masukan No Telp"
                  @change="handleFileChange"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-10">
            <button
              @click="saveData"
              class="text-white py-2 px-10 rounded-lg bg-[#C53030]"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import Multiselect from "@vueform/multiselect";

export default {
    setup() {
        const nama_tamu = ref("");
        const no_tlp = ref("");
        const id_moklet = ref(""); 
        const asal_instansi = ref("");
        const foto = ref(null);
        const { $formKurirStore } = useNuxtApp();
        const handleFileChange = (event) => {
            foto.value = event.target.files[0];
        };
        // Computed property to filter options based on user input
        const filteredMoklet = computed(() => {
            return $formKurirStore.daftarMoklet;
        });

    const saveData = async () => {
      try {
        const formData = new FormData();
        formData.append("nama_tamu", nama_tamu.value);
        formData.append("no_tlp", no_tlp.value);
        formData.append("id_moklet", id_moklet.value);
        formData.append("asal_instansi", asal_instansi.value);
        formData.append("foto", foto.value);
        const response = await $formKurirStore.transaksiKurir(formData);
        response;
        console.log("Data saved successfully");
      } catch (error) {
        console.error("Failed to save data:", error);
      }
    };
    onMounted(() => {
      $formKurirStore.fetchDataMoklet();
    });
    return {
      nama_tamu,
      no_tlp,
      id_moklet,
      asal_instansi,
      foto,
      handleFileChange,
      saveData,
      daftarMoklet: $formKurirStore.daftarMoklet,
      filteredMoklet,
    };
  },
  components: {
    Multiselect,
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
