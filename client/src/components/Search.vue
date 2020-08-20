<template>
      <form class="search"  @submit.prevent="search">
        <div class="input">
            <label class="label-project" for="">Project</label><br>
            <input class="project" type="text" name="" v-model="form.project" id="">
        </div> 
        <!-- <div class="input">
            <label class="label-after" for="">After</label><br>
            <input class="after" type="date" name="" id="" v-model="form.after">
        </div> 
        <div class="input">
            <label class="label-before" for="">Before</label><br>
            <input class="before" type="date" name="" id="" v-model="form.before">
        </div> -->
        <!-- <div class="input">
            <label class="label-member" for="">Member</label><br>
            <select name="" id="" @click="getUser">
                <option v-for="person in user" :key="person" >{{data.name}}</option>
            </select>
        </div>  -->
        <div class="input">
            <button class="submit" type="submit"  @click.prevent="search">submit</button>
        </div>
    </form>
</template>

<script>
export default {
    name : "Search",
    data : () => {
        return {
            form : {
                project : "",
                before : "",
                after : ""
                // userId :""
            },
            data : [],
            err : ""
        }
    },
    methods : {
        search(){
            this.$emit("search",this.form)
        }
    }
}
</script>