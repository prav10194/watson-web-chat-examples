$("html").on("click", "#showMap", function () {

    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    fetch("http://localhost:8080/nearbydoctors?address=" + window.currentAddress, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            var resultObject = JSON.parse(result).results[0];
            $("#map").css("height", "10rem");
            $('#centerName').html(resultObject.name)
            $('#centerStatus').html(resultObject.opening_hours.open_now === true ? "Open" : "Closed")
            $('#centerStatus').css("color", resultObject.opening_hours.open_now === true ? "green" : "red")

            initMap(resultObject);
            console.log(resultObject);
        })
        .catch((error) => console.log("error", error));
});

function initMap(resultObject) {
    if (document.getElementById("map") != null) {
        const myLatLng = resultObject.geometry.location;
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 16,
            center: myLatLng,
        });
        new google.maps.Marker({
            position: myLatLng,
            map,
            title: "Hello World!",
        });
    }
}

var customMapElement = () => {

    const element = document.createElement("div");
    element.setAttribute(
      "style",
      "width:100%; height:100%; background-color: white; padding: 1rem; text-align: center;"
    );

    element.innerHTML = 
    "<div style='display: flex; flex-direction: column;'>" +
        "<div style='margin-right: auto;'>" +
            "Here is a doctor nearby you" +
        "</div>" +
        "<div id='map' style='margin-top: 1.4rem;'></div>" +
        "<div id='centerName' style='margin-top: 1rem; margin-right: auto; font-weight: 800;'>" +
        "</div>" +
        "<div id='centerStatus' style='margin-top: 0.2rem; margin-right: auto; font-weight: 800; color: green;'>" +
        "</div>" +
        "<div id='showMap' style='margin-top: 0.2rem;margin-right: auto;color: #0f62fe;cursor: pointer;'>View location on map</div>" + 
    "</div>";
    // Append your element to the provided element.
    return element;
}