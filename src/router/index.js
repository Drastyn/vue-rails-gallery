import Vue from 'vue';
import VueRouter from 'vue-router';
//import store from '../store';
import DashboardIndex from '../views/dashboard/Index';
import ImagesIndex from '../views/dashboard/children/images/Index';
import ImagesNew from '../views/dashboard/children/images/New';
import ImagesShow from '../views/dashboard/children/images/Show';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: DashboardIndex,
      children: [
        { path: '/imagenes', name: 'images_path', component: ImagesIndex, },
        { path: '/imagenes/nueva', name: 'new_image_path', component: ImagesNew, },
        { path: '/imagenes/:token', name: 'show_image_path', component: ImagesShow, },
      ]
    }

  ],
});

export default router;