const express = require("express");
const {
  createService,
  getServices,
  updateService,
  deleteService,
  getServiceById,
  getServicesByCustomer,
} = require("../controllers/serviceController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
//router for create service by owner
router.post("/add", authMiddleware, createService);
//router for get all service by owner
router.get("/", authMiddleware, getServices);
//router for get indiuival service by owner
router.get("/:id", authMiddleware, getServiceById);
//router for update service by owner
router.put("/:id", authMiddleware, updateService);
//router for delete service by owner
router.delete("/:id", authMiddleware, deleteService);
//router for get all service by customer
router.get("/customer/",authMiddleware, getServicesByCustomer);

module.exports = router;
