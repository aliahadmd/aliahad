import { createRouter, createWebHistory } from 'vue-router';
import AboutMe from './pages/AboutMe.vue';
import Notes from './pages/Notes.vue';
import Note from './pages/Note.vue';
import Portfolio from './pages/Portfolio.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'about Me',
      component: AboutMe
    },
    {
      path: '/notes',
      name: 'notes',
      component: Notes
    },
    {
      path: '/notes/:slug',
      name: 'note',
      component: Note
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio
    }
  ]
});

export default router;
