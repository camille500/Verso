import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import './styles/main.css'
import './lib/gsap' // registers ScrollTrigger once at startup

createApp(App).use(MotionPlugin).mount('#app')
