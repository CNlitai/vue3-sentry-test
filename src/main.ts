import { createApp } from 'vue';
import antd from './config/antd.config';
import router from './router';
import { store, key } from './store';
import App from './App.vue';
import i18n from './config/i18n.config';
import globalVar from "./config/globalVar"

import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

const app = createApp(App)

Sentry.init({
    app,
    dsn: "https://465ebbf4d74f41f881950a4e74b6275f@sentry.kezhitech.com/32",
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ["localhost", "my-site-url.com", /^\//],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

app.use(i18n)
app.use(store, key)
app.use(router)
app.use(antd)
app.use(globalVar)
app.mount('#app')
