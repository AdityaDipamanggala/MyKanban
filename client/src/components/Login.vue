<template>
    <div class="login">
        <h3 class="login-title">Welcome to My Kanban</h3>
        <form class="login-form" @submit.prevent="login">
            <div class="login-input">
                <label for="">Email :</label>
                <input v-model="form.email" type="email" name="" id="">
            </div>
            <div class="login-input"> 
                <label for="">Password :</label>
                <input v-model="form.password" type="password" name="" id="">
            </div>
            <div class="login-submit">
                <button type="submit">login</button>
            </div>   
           <a href="" @click.prevent="googleSign" class="social">Google <i class="fab fa-google fa-2x"></i></a>
        </form>       
    </div>
</template>
<script>
export default {
    name : "Login",
    data : () => {
        return {
            form : {
                email : "",
                password : ""
            },
            err : ""
        }
    },
    methods: {
        login(){
            this.$emit("login",this.form)
        },
        googleSign(){
            console.log('google');
            this.$gAuth.signIn()
            .then(res => {
                let id_token = res.getAuthResponse().id_token
                this.onSignIn(id_token)
            })
            .catch(err =>{
            console.log('gagal');
            console.log(err)
          })
    },
        onSignIn(id){
            this.$emit('onSignIn',id)
            console.log('google sign');
        }
    }
}
</script>