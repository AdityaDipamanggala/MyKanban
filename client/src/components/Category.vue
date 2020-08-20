<template>
    
    <div class="item done">
        <!-- <h1>{{item}} tes</h1> -->
            <div class="header-item" >
                <h4 class="item-text">{{item}}</h4>
                <p class="amount"> {{data.length}} activities</p>
            </div>
            
                <!-- <div class="add"> -->
                <button class="add" href="" @click="count ++">
                    <div class="add-logo">
                        <i class="glyphicon glyphicon-plus-sign"></i>                
                    </div>
                    <div class="add-text">
                        add new task
                    </div>
                </button>

                <!-- </div> -->
            <form v-if="this.count % 2 !== 0" action="" class="add-card" @submit.prevent="submitAdd">
                <label for=""> Title: </label>
                <input type="text" name="" id="" v-model="value.title">
                <label for=""> Description: </label>
                <textarea name="" id="" cols="3" rows="10" v-model="value.description"></textarea>
                <label for="">Date:</label>
                <input type="date" v-model="value.due_date">
                <label for="">Category:</label>
                <input type="text" name="" id="" v-model="value.category" readonly>               
                <button class="add-submit" type="submit">Add New Task</button>
            </form>
            <draggable class="item-column" :list="data" :move="drag" group='task' :category="item" @end="updateCategory">
                <div v-for="info in data" :key="info" class="card done">
                    <h5 class="date"> Due date : {{info.due_date}} </h5>
                    <h4 class="task"> {{info.title}}</h4>
                    <p class="description"> {{info.description}}</p>
                    <p class="member">{{info.User.name}}  </p>   
                    <button @click="getTask(info.id)">Edit</button>             
                </div>
            </draggable>
        
    </div>

</template>
<script>
import draggable from 'vuedraggable' 
export default {
   props : ['item','data'],
   name : "Category",
   components: {draggable},
    data : function (){
        return {
            value:{
                title : "",
                description: "",
                due_date : '',
                category : this.item
            },
            count : 0,
            draggedData:{
                id: null,
                category: null
            }
        }
    },
    methods : {
        submitAdd(){
            this.$emit("submitAdd",this.value)
        },
        getTask(id){
            this.$emit('getTask',id)
        },
        drag(e){
            this.draggedData.id = e.draggedContext.element.id
            this.draggedData.category = e.relatedContext.component.$attrs.category
        },
        updateCategory(){
            this.$emit("submitEdit",this.draggedData)
            // console.log('>>>> data drag',this.data)
        }
    }
}
</script>
<style scoped>
.item-column{
    height: 400px;
}
</style>