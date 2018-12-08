let MessageModel = require("../models/MessagesModel");

module.exports.list =  function list(request, response) {
    MessageModel.find({}).exec().then(messages => {
        return response.json(messages);
    })
}
module.exports.show =  function show(request, response) {
    MessageModel.findById(request.params.id).exec()
        .then(m => {
            return response.json(m)
        });
}
module.exports.create =  function create(request, response) {
    let message = new MessageModel( request.body );
    message.save();
    return response.json(message);
}
module.exports.update =  function update(request, response) {
    MessageModel.findById(request.params.id).exec().then(m => {
        m.updated = true;
        m.save();
        return response.json(m)
    });
}
module.exports.remove =  function remove(request, response) {
    MessageModel.findById(request.params.id).exec().then(m => {
        m.active = false;
        m.save();
        return response.json(m)
    });
}