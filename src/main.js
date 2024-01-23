import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { piniaHistoryPlugin } from "@/plugins/PiniaHistoryPlugin"

const pinia = createPinia()
pinia.use(piniaHistoryPlugin)

// Icons and Styles
import FontAwesomePlugin from "./plugins/FontAwesome";
import "./assets/main.pcss";

// App Wide Components
import AppButton from "./components/AppButton.vue";
import AppCountInput from "./components/AppCountInput.vue";
import AppModalOverlay from "./components/AppModalOverlay.vue";

// Init App
createApp(App)
  .use(createPinia())
  .use(FontAwesomePlugin)
  .use(pinia)
  .component("AppButton", AppButton)
  .component("AppCountInput", AppCountInput)
  .component("AppModalOverlay", AppModalOverlay)
  .mount("#app");
