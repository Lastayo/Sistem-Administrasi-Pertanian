<template>
  <div class="relative">
    <TopNav></TopNav>
    <div class="flex min-h-screen min-w-screen bg-[#ffffff]">
      <SideNavDinas />
      <div class="z-10 mt-[64px] flex-grow overflow-auto sm:ml-[250px]">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import TopNav from "../components/admin/TopNav.vue";
import SideNavDinas from "../components/admin/SideNavDinas.vue";

onMounted(async () => {
  initFlowbite();
});
</script>
