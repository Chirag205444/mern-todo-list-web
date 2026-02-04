const express=require('express');
const router=express.Router()
const { getList,addList,updateList,deleteList } =require ('../controlers/TdlistControler');

router.get("/",getList);
router.post("/",addList);
router.put("/:id",updateList);
router.delete("/:id",deleteList);

module.exports=router;