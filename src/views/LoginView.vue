<template>
  <main>
    <form @submit="submit" class="left">
      <div class="logo w-full flex gap-4 px-10 pt-10 items-center">
        <img src="../../public/image/Logo.png" alt="logo" class="w-[8rem]">
        <p class="text-3xl font-bold font-mono">Login Form</p>
      </div>
      <div class="w-full sm:mt-10 px-10 flex flex-col gap-6">
        <div class="w-full flex flex-col gap-3">
          <span class="text:md sm:text-xl font-mono font-light text-gray-600">Username or Email<sup :class="`${data.UEID.isError ? 'text-red-500' :'text-gray-500'}`">*</sup></span>
          <div class=" pl-2 w-full">
            
            <input type="text" v-model="data.UEID.data" 
            @input="checkErrorEUID"
            :class="`w-full border-2  font-mono text:md sm:text-xl p-2 rounded-md mb-2 `+ `${data.UEID.isError ? 'border-red-500' :'border-gray-500'}` "   
            placeholder="Enter Email or Username">
            <span v-if="data.UEID.isError" class="text-sm text-red-400 font-light font-mono pl-2">Please input valid username or email</span>
            


          </div>
        </div>
        
        <div class="w-full flex flex-col gap-3">
          <span class="text:md sm:text-xl font-mono font-light text-gray-600">Password<sup :class="`${data.password.isError ? 'text-red-500' :'text-gray-500'}`">*</sup></span>
          <div class=" pl-2 w-full">
            
            <input type="password" v-model="data.password.data"   @input="checkErrorPassword"
            :class="`w-full border-2  font-mono text:md sm:text-xl p-2 rounded-md mb-2  `+ `${data.password.isError ? 'border-red-500' :'border-gray-500'}` "  
            placeholder="Enter Password">
            <span v-if="data.password.isError" class="text-sm text-red-400 font-light font-mono pl-2">Please input valid password</span>
          </div>
        </div>
        
        <div class=" pl-2 w-full mt-4">
          <button class="w-full bg-blue-600 p-4 text-gray-100 font-mono text-md sm:text-xl rounded-md" >Login</button>
        </div>
        
      </div>

    </form>

    
    <div class="right">
      <h1 class="hightlight text-4xl  font-mono text-gray-200 mt-20 ml-20">
        Portfolio Admin Dashboard
      </h1>
    </div>
  </main>
</template>

<script setup>
import {ref,inject} from 'vue'
import store from '../store';
const route=inject('router')
const API_URL = process.env.API_URL;
const data=ref({
  UEID:{
    data:"",
    isError:false
  },
  password:{
    data:"",
    isError:false
  }
})

const submit=(e)=>{
  e.preventDefault();
  
  checkErrorEUID()
  checkErrorPassword()
  if(data.value.UEID.isError || data.value.password.isError) return
  fetch(`${API_URL}/auth/login`,{
    method:"POST",
    body:JSON.stringify({
      EUID:data.value.UEID.data,
      password:data.value.password.data,
    }),
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res=>res.json())
  .then(data=>{
    localStorage.setItem('token',data.data.access_token);
    localStorage.setItem('user',JSON.stringify(data.data.user));
    route.push("/dashboard")
    
  })
  
}
const checkErrorEUID=()=>{
  if(!data.value.UEID.data || data.value.UEID.data.length<4 || /^\s*$/.test(data.value.UEID.data)) {
    data.value.UEID.isError=true
  }else{
    data.value.UEID.isError=false
  }

  
}
const checkErrorPassword=()=>{
  if(!data.value.password.data || data.value.password.data=="" || data.value.password.data.length<6) {
    data.value.password.isError=true
  }else{
    data.value.password.isError=false
  }

  
  
}

</script>

<style scoped lang="scss">
main{
  min-width: 100vw;
  display: flex;
  min-height: 100vh;
  input{
    &:focus{
      border:  unset !important;
    }
  }
  .left{
    width: 700px;
    background-color: white;
    @media screen and (width < 768px ) {
      width: 100% !important;
      .logo{
        justify-content: center !important;
        align-items: center !important;
        padding:0 !important;
        padding-top: 2rem !important;
        flex-direction: column !important;
        
      }
    }
  }
  .right{
    width: 100%;
    @media screen and (width < 768px ) {
      display: none;
    }
    
    --s: 200px; /* control the size */
    --c1: #1d1d1d;
    --c2: #4e4f51;
    --c3: #3c3c3c;
    
    background:
    repeating-conic-gradient(from 30deg,#0000 0 120deg,var(--c3) 0 180deg) 
    calc(.5*var(--s)) calc(.5*var(--s)*0.577),
    repeating-conic-gradient(from 30deg,var(--c1) 0 60deg,var(--c2) 0 120deg,var(--c3) 0 180deg);
    background-size: var(--s) calc(var(--s)*0.577);
    
    h1{
      width: fit-content;
      &.hightlight{
        position: relative;
        &::after{
          content: "";
          position: absolute;
          width: 100%;
          height: 2px; 
          background-color: white;
          bottom: 0;
          left: 0;
        }
        &::before{
          content: "";
          position: absolute;
          width: 20%;
          height: 2px; 
          background-color: rgb(44, 192, 230);
          bottom: 0;
          right: 0;
          z-index: 99;
        }
      }
    }
    
    
  }
}
</style>