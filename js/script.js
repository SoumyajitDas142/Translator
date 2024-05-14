const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
selectTag = document.querySelectorAll("select"),
exchangeIcon = document.querySelector(".exchange"),
translateBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    // Selecting English by default as FROM language and Hindi as TO language
    for (const country_code in countries) {
        let selected;
        if(id == 0 && country_code == "en-GB"){
            selected = "selected";
        } else if(id == 1 && country_code == "hi-IN") {
            selected = "selected";
        }
        console.log(countries[country_code]);
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option) //Adding options tag inside select tag

    }
});

exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
});

translateBtn.addEventListener("click", () =>{
    let text = fromText.value,
    translateFrom = selectTag[0].value, //Getting fromSelect tag value
    translateTo = selectTag[1].value; //Getting toSelect tag value
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    //Fetching API response and returning it with parsing into js obj
    // And in another then method receiving that obj 
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "Translation");
    });
});

icons.forEach(icon =>{
    icon.addEventListener("click", ({target}) =>{
        if(!fromText.value || !toText.value) return;
        if(target.classList.contains("fa-copy")){
            if(target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if(target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });

});