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
          Form Pengisian Siswa
        </h1>

        <div
          class="box-utama w-full h-[550px] bg-white rounded-xl border p-10 overflow-y-auto"
        >
          <div class="flex flex-col md:flex-row md:gap-10">
            <div class="w-full">
              <div class="py-3">
                <span for="nama" class="font-semibold">Nama</span>
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
                <span for="tamu" class="font-semibold">Jumlah Tamu</span>
                <input
                  required
                  type="number"
                  name="tamu"
                  id="tamu"
                  class="block w-full px-3 py-1 my-2 text-base placeholder-gray-500 transition duration-500 ease-in-out transform border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  placeholder="Masukan Jumlah Tamu"
                  v-model="jumlah_tamu"
                />
              </div>
              <div class="py-3">
                <span for="janji" class="font-semibold">Ada Janji?</span>
                <select
                  required
                  name="janji"
                  id="janji"
                  class="block w-full px-3 py-1 my-2 text-base placeholder-gray-500 transition duration-500 ease-in-out transform border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  placeholder="Pilih"
                  v-model="janji"
                >
                  <option value="Ada">Ada</option>
                  <option value="Tidak Ada">Tidak Ada</option>
                </select>
              </div>
            </div>

            <div class="w-full">
              <div class="py-3">
                <span for="no_telp" class="font-semibold">No Telp</span>
                <input
                  required
                  type="tel"
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
                  v-model="id_siswa"
                  id="ditemui"
                  :options="filteredSiswa"
                  label="nama_siswa"
                  valueProp="id_siswa"
                  :searchable="true"
                />
              </div>
              <div class="py-3">
                <span for="foto" class="font-semibold">Upload foto</span>
                <input
                  required
                  type="file"
                  name="foto"
                  id="foto"
                  @change="handleFileChange"
                  class="block w-full px-3 my-2 text-base placeholder-gray-500 transition duration-500 ease-in-out transform border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  placeholder="Masukan No Telp"
                />
              </div>
            </div>
          </div>

          <div class="w-full">
            <div class="py-3">
              <span for="keterangan" class="font-semibold">Keterangan</span>
              <textarea
                name="keterangan"
                id="keterangan"
                class="w-full h-40 text-base placeholder-gray-500 transition duration-500 ease-in-out transform border-2 border-gray-200 rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                placeholder="Masukkan keterangan"
                v-model="keterangan"
              ></textarea>
            </div>
          </div>

          <div class="flex justify-end mt-5">
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
    const id_siswa = ref(""); // Pastikan nilai ini sesuai dengan nilai yang benar
    const janji = ref("");
    const jumlah_tamu = ref("");
    const keterangan = ref("");
    const foto = ref(null);
    const { $formSiswaStore } = useNuxtApp();
    const handleFileChange = (event) => {
      foto.value = event.target.files[0];
    };
    // Computed property to filter options based on user input
    const filteredSiswa = computed(() => {
      return $formSiswaStore.daftarSiswa.data;
    });
    const saveData = async () => {
      try {
        const formData = new FormData();
        formData.append("nama_tamu", nama_tamu.value);
        formData.append("no_tlp", no_tlp.value);
        formData.append("id_siswa", id_siswa.value);
        formData.append("janji", janji.value);
        formData.append("jumlah_tamu", jumlah_tamu.value.toString());
        formData.append("keterangan", keterangan.value);
        formData.append("foto", foto.value);
        const response = await $formSiswaStore.transaksiSiswa(formData);
        response;
        console.log("Data saved successfully");
      } catch (error) {
        console.error("Failed to save data:", error);
      }
    };
    onMounted(() => {
      $formSiswaStore.fetchDataSiswa();
    });
    return {
      nama_tamu,
      no_tlp,
      id_siswa,
      janji,
      jumlah_tamu,
      keterangan,
      foto,
      handleFileChange,
      saveData,
      daftarSiswa: $formSiswaStore.daftarSiswa.data,
      filteredSiswa,
    };
  },
  components: {
    Multiselect,
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
