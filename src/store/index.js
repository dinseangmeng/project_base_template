
import { createStore } from 'vuex';
// Create a new store instance.
export default createStore({
  state : {
    sideBarNavigation:[
      {
        name:"Dashboard",
        title:"Dashboard",
        icon:'ic:round-home',
        path:'/dashboard',
        pathName:'dashboard',
      },
      {
        name:"Project",
        title:"Project",
        icon:'octicon:project-template-16',
        path:'/project',
        pathName:'project',
      },
      {
        name:"Blog",
        title:"Blog",
        icon:'uil:blogger',
        path:'/blog',
        pathName:'blog',
      },
      {
        name:"Contact",
        title:"Contact",
        icon:'lucide:contact',
        path:'/contact',
        pathName:'contact',
      },
      {
        name:"Profile",
        title:"Profile",
        icon:'pajamas:profile',
        path:'/profile',
        pathName:'profile',
      },
    ]
  },
  mutations: {

  },
  actions:{
    
  }
})


