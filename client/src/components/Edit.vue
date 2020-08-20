<template>
    <div>
        <form action="" class="add-card" @submit.prevent="submitEdit">
                <label for=""> Title: </label>
                <input v-model="task.title" type="text" name="" id="" >
                <label for=""> Description: </label>
                <textarea v-model="task.description" name="" id="" cols="3" rows="10"></textarea>
                <label for="">Date:</label>
                <input type="date">
                <label for="">Category:</label>
                <input v-model="task.category" type="text" name="" id="">               
                <button class="add-submit" type="submit" >Edit Task</button> 
        </form>
        <div class="add-card">
            <button class="add-submit" type="button" @click="deleteTask">Delete Task</button> 
            <button class="add-submit" type="button" @click="exitEdit">Cancel</button>      
        </div> 
    </div>
</template>
<script>
export default {
    props: ['task'],
    name : "Edit",
    methods : {
        exitEdit(){
            this.$emit('exitEdit')
        },
        submitEdit(){
            this.$emit('submitEdit',this.task)
        },
        deleteTask(){
            this.$emit('deleteTask',this.task)
        }
    }
}
</script>