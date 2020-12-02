$("html").on("click", ".WACLauncher__ButtonContainer", () => {
    // interval to wait for the chat elements to load
    var displayInterval = setInterval(() => {
        if (document.getElementsByClassName("WAC__inputContainer-TextAreaContainer").length != 0) {
            if (document.getElementsByClassName("attachButton").length == 0) {
                console.log("Appending button")
                $("html")
                    .find(".WAC__inputContainer-TextAreaContainer")
                    .append('<img class="attachButton" src="/assets/attachment.svg" />');

                applyCSS()
            }
            clearInterval(displayInterval);
        }
    }, 1);
});


var applyCSS = (element) => {
    // styling the button
    $(".attachButton").css("padding", "0.4rem 0.6rem 0.4rem 0.4rem");
    $(".attachButton").css("opacity", "0.6");
    $(".attachButton").hover(() => {
        if ($(".attachButton").css("opacity") == "1") {
            $(".attachButton").css("opacity", "0.6");
        } else {
            $(".attachButton").css("opacity", "1");
        }
    });
}
