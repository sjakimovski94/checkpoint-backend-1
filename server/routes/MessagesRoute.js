let express =  require("express");
const router = express.Router();
let {list,show,create,update,remove} = require( "../controllers/MessagesController");

router.get("/messages", list);
router.get("/messages/:id", show);
router.post("/messages", create);
router.put("/messages/:id", update);
router.delete("/messages/:id", remove);

module.exports =  router;