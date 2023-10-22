import { createRouter, createWebHistory } from 'vue-router'
import blankLayout from '../layout/BlankLayout.vue';
import MainLayout from '../layout/MainLayout.vue';
import HomeView from '../views/LoginView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      component: blankLayout,
      children: [
        {
          path:'',
          component: HomeView,
          name: 'login',
        }
      ]
    },
    {
      path: '/',
      component: MainLayout,
      meta: {
        allowedRoles: ['admin'],
        isGuard:true
      },
      children: [
        {
          path:'/dashboard',
          name:'dashboard',
          component: ()=> import('../views/DashboardView.vue')
        },
        {
          path:'/project',
          name:'project',
          component: ()=> import('../views/ProjectView.vue')
        },
        {
          path:'/blog',
          name:'blog',
          component: ()=> import('../views/BlogView.vue')
        },
        {
          path:'/contact',
          name:'contact',
          component: ()=> import('../views/ContactView.vue')
        },
        {
          path:'/profile',
          name:'profile',
          component: ()=> import('../views/ProfileView.vue')
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to.meta.isGuard );
  if(to.meta.isGuard){
  
    const userRole = JSON.parse(localStorage.getItem('user')) // Get the user's role
    if(!userRole)    {
      return next({ name: 'login' });

    }
    
    const isAuthenticated = checkAuthentication(); // Check if the user is authenticated
    
    const allowedRoles = to.meta.allowedRoles || [];
    
    if (!isAuthenticated) {
      
      return next({ name: 'login' });
    } else if (allowedRoles.length === 0 || allowedRoles.includes(userRole.status.statusName)) {
      return next();
    } else {
      return next({ name: 'login' });
    }

  }else{
    if(checkAuthentication()){
      return next({ name: 'dashboard' });
    }
   return next()
  }
});

const checkAuthentication=()=>{
  const token=localStorage.getItem('token')
  if(!token) return false;
  return true
}

export default router
