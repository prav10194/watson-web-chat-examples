function customResponseHandler(event) {
    if (typeof event.data.message.user_defined != "undefined") {
        return new Promise(function (resolve, reject) {
            if (event.data.message.user_defined.action == "showGoogleResults") {
                const { message } = event.data;
                var element = customMapElement(); //defined in loadMap.js
                event.data.element.appendChild(element);
                resolve();
            }
        });
    }
}

function TEMPORARY_convertToUserDefinedResponse(event) {
    if (typeof event.data.output.user_defined != "undefined") {
        if (event.data.output.user_defined.action == "showGoogleResults") {
            // Map over all items in the output array.
            event.data.output.generic = event.data.output.generic.map(function (
                item
            ) {
                // If we find one that matches our convention to transform to user_defined response type, make the transformation.
                item.response_type = "user_defined";
                item.user_defined = event.data.output.user_defined;
                delete item.text;
                return item;
            });
            console.log(event.data.output.generic);
        }
    }
}
