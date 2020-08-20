<template>
    <body>
        <div>
            <Login  v-if="!isLoggedIn && page === ''" @onSignIn="onSignIn" @login="login"></Login>
            <Navbar @logout="logout" v-if="isLoggedIn"></Navbar>
            <Search @search="search" v-if="isLoggedIn && page === ''"></Search>
            <div v-if="isLoggedIn && page === ''" class="main" >
                <Category  @getTask='getTask' @showEdit='showEdit' @submitEdit="submitEdit" @submitAdd="submitAdd" v-bind:item="categories[0]" v-bind:data="dataExplore"></Category>
                <Category  @getTask='getTask' @showEdit='showEdit' @submitEdit="submitEdit" @submitAdd="submitAdd" v-bind:item="categories[1]" v-bind:data="dataTodo"></Category>
                <Category  @getTask='getTask' @showEdit='showEdit' @submitEdit="submitEdit" @submitAdd="submitAdd" v-bind:item="categories[2]" v-bind:data="dataDoing"></Category>
                <Category  @getTask='getTask' @showEdit='showEdit' @submitEdit="submitEdit" @submitAdd="submitAdd" v-bind:item="categories[3]" v-bind:data="dataDone"></Category>
            </div>
            <Edit :task='task' @deleteTask='deleteTask' @submitEdit="submitEdit" @exitEdit='exitEdit' v-if="isLoggedIn && page === 'edit'"></Edit>
        </div>
    </body>
</template>

<script>
import Axios from "axios"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Search from "./components/Search"
import Category from "./components/Category"
import Edit from './components/Edit'

const baseUrl = "http://localhost:3000"
export default {
    name: "App",
    components: {
        Login,
        Navbar,
        Search,
        Category,
        Edit
    },
    data: () => {
        return {
            isLoggedIn : false,
            categories : ["explore", "todo", "doing", "done"],
            dataExplore : [],
            dataTodo : [],
            dataDoing : [],
            dataDone : [],
            page : '',
            task: {
                id : '',
                title : '',
                description : '',
                category : ''
            }
        }
    },
    watch: {

    },
    methods: {
        login(data) {
            console.log(`login`);
            Axios({
                method : "POST",
                url : baseUrl + "/login",
                data : data
            })
            .then(({data}) => {
                localStorage.access_token = data.access_token
                this.isLoggedIn = true
                this.search({ 
                    project : "",
                    before : "",
                    after : ""})
                })
            .catch(this.err)
        },

        onSignIn(id_token){
            Axios({
                method: 'POST',
                url : baseUrl + '/googlesign', 
                data : {
                    id_token
                }
            })
            .then(({data}) => {
                console.log(data);
                localStorage.access_token = data.data.access_token
                this.isLoggedIn = true
                this.search({ 
                    project : "",
                    before : "",
                    after : ""})
                })
            .catch(this.err)
        },
        getTask(id) {
            Axios({
                method: 'GET',
                url: baseUrl + `/task/${id}`,
                headers: { access_token: localStorage.access_token },
            })
                .then(({ data }) => {
                    this.showEdit()
                        console.log(data.message,'------- data searchById');
                        this.task.id = data.message.id;
                        this.task.title = data.message.title;
                        this.task.description = data.message.description;
                        this.task.category = data.message.category;                    
                })
                .catch(this.err);
        },

        deleteTask(task){
            Axios({
                method : "DELETE",
                url : baseUrl + `/task/${task.id}`,
                headers : {access_token: localStorage.getItem("access_token")}
            })
            .then(data => {
                console.log('delete berhasil');
                this.exitEdit()
                this.search({ 
                    project : "",
                    before : "",
                    after : ""
                })
            })
            .catch(err => console.log(err))

        },
       
        showEdit() {
            // this.getTask(id)
            this.page = 'edit';
        },

        exitEdit() {
            this.page = '';
        },

        search(data) {
            this.dataExplore = []
            this.dataTodo = []
            this.dataDoing = []
            this.dataDone = []
            console.log("tes search");
            Axios({
                method : "GET",
                url : baseUrl + `/task/?search=${data.project}&before=${data.before}&after=${data.after}`,
                headers : {access_token: localStorage.getItem("access_token")}
            })
            .then(data => {
                console.log(data.data.message[0]);
                for(let i = 0 ; i < data.data.message.length ; i++){
                    data.data.message[i].due_date = data.data.message[i].due_date.split('T')[0]
                    if(data.data.message[i].category === "explore") this.dataExplore.push(data.data.message[i])
                    else if(data.data.message[i].category === "doing") this.dataDoing.push(data.data.message[i])
                    else if(data.data.message[i].category === "todo") this.dataTodo.push(data.data.message[i])
                    else if(data.data.message[i].category === "done") this.dataDone.push(data.data.message[i])
                }
                console.log(this.dataDone);
            })
            .catch(this.err)
        }
        ,
        logout() {
            localStorage.clear()
            this.isLoggedIn = false
        },
        tes() {
            console.log("Check koneksi emit");
        },
        submitAdd(data){
            console.log('masuk submit');
            console.log(data);
            Axios({
                method : "POST",
                url : baseUrl + "/task",
                data : data,
                headers :  {access_token: localStorage.getItem("access_token")}
            })
            .then(({data}) => {
                console.log(data);
                console.log("task berhasil ditambahkan");
            })
            .catch(err => {
                console.log(err)
                console.log(data);
                })
        },
        submitEdit(data){
            console.log(data);
            console.log('masuk submit Edit');
            Axios({
                method : "PUT",
                url : baseUrl + `/task/${data.id}`,
                data : data,
                headers :  {access_token: localStorage.getItem("access_token")}
            })
            .then(({data}) => {
                console.log(data);
                console.log("task berhasil diedit");
                this.search({ 
                    project : "",
                    before : "",
                    after : ""
                })
                this.exitEdit()
            })
            .catch(err => {
                console.log('edit gagal')
                })
        }
    },
    created(){
        if(localStorage.access_token){
            this.isLoggedIn = true        
        }
        if(this.dataExplore.length !== 0, this.dataTodo.length !== 0, this.dataDoing.length !== 0, this.dataDone.length !== 0){
            this.dataExplore = []
            this.dataTodo = []
            this.dataDoing = []
            this.dataDone = []
        }
        this.search({ 
            project : "",
            before : "",
            after : ""})
        }
}
</script>
<style>
    
</style>