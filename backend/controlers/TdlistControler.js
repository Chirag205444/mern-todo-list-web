const todoModel=require("../models/Todomodel");

const getList=async(req,res)=>{
    try{
        const lists=await todoModel.find({createdBy:req.user.id})
       
        const formattedLists=lists.map(todo=>{
            const date=new Date(todo.createdAt);
            const time=date.toLocaleTimeString("en-US",{
                hour:"2-digit",
                minute:"2-digit",
                hour12:false
            });
            const day=date.toLocaleDateString("en-US",{
                weekday:"short"
            });
            return{
                ...todo._doc,
                time,
                day
            };
        })

        return res.status(200).json({ lists: formattedLists });
    }catch(err){
        res.status(500).json({message:`error in getall ${err.message}`});
    }
}

const addList=async(req,res)=>{
    try{
        let {title,description,completed,type}=req.body;
        if(!title){
           return res.status(400).json({message:"title is required"});
        }

        const expiresAt = new Date();

        switch (type) {
        case "daily":
            expiresAt.setDate(expiresAt.getDate() + 1);
            break;

        case "weekly":
            expiresAt.setDate(expiresAt.getDate() + 7);
            break;

        case "monthly":
            expiresAt.setMonth(expiresAt.getMonth() + 1);
            break;

        case "yearly":
            expiresAt.setFullYear(expiresAt.getFullYear() + 1);
            break;

        default:
            return res.status(400).json({ message: "Invalid task type" });
        }


        const newList=await todoModel.create({
            title,
            description,
            completed,
            type,
            createdBy:req.user.id,
            expiresAt

        })
        return res.status(201).json({list:newList});
    }catch(err){
         res.status(500).json({message:`error in adding ${err.message}`});
    }
}

const updateList=async(req,res)=>{
    try{
        let {title,description,completed}=req.body;
        let id=req.params.id;

        const list=await todoModel.findById({_id:id});
        if (!list) {
            return res.status(404).json({ message: "Todo not found" });
       }

        if(list.createdBy!=req.user.id){
            return res.status(401).json({message:"seems you are not authorised"});
        }
        if(!title){
           return res.status(400).json({message:"title is required"});
        }

        const newList=await todoModel.findByIdAndUpdate(id,{
            title,
            description,
            completed,
        },{new:true})
        return res.status(200).json({list:newList});
    }catch(err){
         res.status(500).json({message:`error in updating ${err.message}`});
    }
}

const deleteList=async(req,res)=>{
    try{
        const id=req.params.id;
         const list=await todoModel.findById(id);

         
        if (!list) {
             return res.status(404).json({ message: "Todo not found" });
            }

        if (list.createdBy != req.user.id) {
                return res.status(401).json({ message: "You are not authorized to delete this todo" });
            }
            
       await todoModel.deleteOne({_id:id});
       return res.status(200).json({message:"deleted successfully"});
    }catch(err){
        res.status(500).json({message:`error in deleting ${err.message}`});
    }
}



module.exports={getList,addList,updateList,deleteList};