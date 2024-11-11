module.exports = (login) => {
    const LoginController = require("../controllers/logController.js");
  
    login.post("/create", LoginController.create);
  
    login.get("/get-all", LoginController.findAll);
  
    login.get("/login/:loginId", LoginController.findOne);
  
    login.put("/login/:loginId", LoginController.update);
  
    login.delete("/login/:loginId", LoginController.delete);
  };
