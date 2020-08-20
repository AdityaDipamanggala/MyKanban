const {Task, User, Organization} = require(`../models`)
const {Op} = require(`sequelize`)

class TaskController {
    static search(req,res,next){
        Task.findAll({
            include : [
                {
                    model : User
                },
                {
                    model : Organization
                }
            ],
            where : {
                title: {
                    [Op.iLike] : `%${req.query.search}%` 
                },
                // UserId: {
                //     [Op.iLike] : Number(req.query.memberId)
                // },
                // due_date: {
                //     [Op.gte] : Number(req.query.after),
                //     [Op.lte] : Number(req.query.before)
                // },
                // category: req.params.category,
                // OrganizationId: req.params.OrgId,
                UserId : req.userData.id
            }
        })
        .then(data => {res.status(200).json({message: data})})
        .catch (err => res.json(err))
    }

    static searchById(req,res,next){
        Task.findByPk(req.params.id)
        .then(data => {res.status(200).json({message: data})})
        .catch (err => res.json(err))

    }

    static add(req,res,next){
        const newTask = {
            title : req.body.title,
            description : req.body.description,
            category : req.body.category,
            due_date : req.body.due_date,
            UserId : req.userData.id ,
            OrganizationId : 10,
            updatedAt : new Date(),
            createdAt : new Date()
        }
        console.log(newTask);
        Task.create(newTask)
        .then(data => res.json({message : `New task has been created`, data}))
        .catch(err => res.json(err))
    }

    static update(req,res,next){
        console.log('>>> data' ,req.body);
        const updateTask = {
            title : req.body.title,
            description : req.body.description,
            category : req.body.category,
            due_date : req.body.due_date,
            UserId : req.userData.id || req.body.UserId,
            OrganizationId : req.params.OrgId,
            updatedAt : new Date(),
        }
        Task.update(updateTask,{where : {id : req.params.id}})
        .then(data => {
            res.json({message : `New task has been updated`, data})
            console.log('update data', data);
        })
        .catch(err => res.json(err))
    }

    static delete(req,res,next){
        Task.destroy({where : {id : req.params.id}})
        .then(data => {res.json(`Task deleted`)})
    }


}

module.exports= TaskController