Parse.Cloud.beforeSave("Message", async (request) => {
    const { object } = request;
    // 1- extract from and to
    // 2- exist corresponding dialog for "to" (if not exit create)
    // 3- exist corresponding dialog for "from" (if not exit create)
    // 4- clone message for "to" partner

});