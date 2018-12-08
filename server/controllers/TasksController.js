let TaskModel = require("../models/TasksModel");

module.exports.list =  function list(request, response) {
    TaskModel.find({}).exec().then(tasks => {
        return response.json(tasks);
    })
}
module.exports.show =  function show(request, response) {
    TaskModel.findById(request.params.id).exec()
        .then(t => {
            return response.json(t)
        });
}
module.exports.create =  function create(request, response) {
    let task = new TaskModel( request.body );
    task.save();
    return response.json(task);
}
module.exports.update =  function update(request, response) {
    TaskModel.findById(request.params.id).exec().then(t => {
        t.updated = true;
        t.save();
        return response.json(t)
    });
}
module.exports.remove =  function remove(request, response) {
    TaskModel.findById(request.params.id).exec().then(t => {
        t.active = false;
        t.save();
        return response.json(t)
    });
}