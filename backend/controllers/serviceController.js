const Service = require("../models/Service");

// Create a new service
exports.createService = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const service = new Service({
      name,
      description,
      price,
      ownerId: req.user.id,
    });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: "Failed to create service" });
  }
};

// Get all services by an owner
exports.getServices = async (req, res) => {
  try {
    const user = req.user.id;
    // const services = await Service.find({ ownerId: req.user.id });
    const services = await Service.find({});
    res.status(200).json(services);
  } catch (e) {
    console.log(e);
    res.status(401).send({ message: `${e}` });
  }
};
//Get service by customer
exports.getServicesByCustomer = async (req, res) => {
  try {
    // const user = req.user.id;
    const services = await Service.find({});
    console.log(services);

    res.status(200).json(services);
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "failed" });
  }
};

// Update a service
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(service);
  } catch (error) {
    return res.status(400).json({ error: "Failed to update service" });
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (e) {
    res.status(400).json({ error: "Failed to update service" });
  }
};

// Get service by Id
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve service" });
  }
};

//Get service by customer
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await User.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve customer" });
  }
};
