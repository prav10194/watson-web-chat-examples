function storeInformation(event) {
    try {
        var context = event.data.context.skills["main skill"].user_defined;
        console.log("context.location", context.location);
        if (context.location) {
            context.location = false;
            context.address = event.data.input.text;
        }
    } catch (err) {
        console.log(err);
    } finally {
    }
}