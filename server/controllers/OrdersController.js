let OrderModel = require("../models/OrdersModel");

module.exports.list =  function list(request, response) {
    OrderModel.find({}).exec().then(orders => {
        return response.json(orders);
    })
}
module.exports.show =  function show(request, response) {
    OrderModel.findById(request.params.id).exec()
        .then(o => {
            return response.json(o)
        });
}
module.exports.create =  function create(request, response) {
    let order = new OrderModel( request.body );
    order.save();
    return response.json(order);
}
module.exports.update =  function update(request, response) {
    OrderModel.findById(request.params.id).exec().then(o => {
        o.updated = true;
        o.save();
        return response.json(o)
    });
}
module.exports.remove =  function remove(request, response) {
    OrderModel.findById(request.params.id).exec().then(o => {
        o.active = false;
        o.save();
        return response.json(o)
    });
}