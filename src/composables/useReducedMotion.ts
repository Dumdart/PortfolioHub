import { onBeforeUnmount, onMounted, ref } from "vue";

export const useReducedMotion = () => {
  const reducedMotion = ref(false);
  let mediaQuery: MediaQueryList | undefined;

  const syncPreference = () => {
    reducedMotion.value = mediaQuery?.matches ?? false;
  };

  onMounted(() => {
    mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
  });

  onBeforeUnmount(() => {
    mediaQuery?.removeEventListener("change", syncPreference);
  });

  return reducedMotion;
};
