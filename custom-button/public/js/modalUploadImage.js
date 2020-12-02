$("html").on("click", ".attachButton", () => {
    $('.WatsonAssistantChatHost').css("opacity","0.05");

    $.get("../html/modal.html", function(data){
        $("html").find("body").append(data);
    });
});

$("html").on("click", ".cancelButton", () => {
    $('.WatsonAssistantChatHost').css("opacity","1");
    $("html").find(".modalContainer").css("display","none");
});

$("html").on("click", ".uploadButton", () => {
    
    const formData = new FormData()
    formData.append('injuryPicture', $("#injuryPicture")[0].files[0])

    fetch('http://localhost:8080/uploadInjuryPicture', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        window.analyzeImageResults = data;
        console.log(JSON.stringify(data, null, 2));
      })
      .catch(error => {
        console.error(error)
      })

    $('.WatsonAssistantChatHost').css("opacity","1");
    $("html").find(".modalContainer").css("display","none");
});