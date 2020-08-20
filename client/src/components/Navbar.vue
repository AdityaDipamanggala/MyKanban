<template>
     <div class="header">
        <div class="logo">
            My Kanban
        </div>
        <div class="profile">
            <i class="glyphicon glyphicon-user"></i>                
            My Profile
        </div>
        <div class="logout">
            <a href=""  @click.prevent="logout"><i class="glyphicon glyphicon-off"></i> </a>
            Logout
        </div>
    </div>
</template>
<script>
export default {
    name : "Navbar",
    methods : {
        logout(){
            this.$emit("logout")
        }
    }
}
</script>