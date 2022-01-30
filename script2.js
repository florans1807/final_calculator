function getHistory() {
    return document.getElementById("history-text").innerText;
}
function printHistory(num) {
    document.getElementById("history-text").innerText=num;
}
function getOutput(){
    return document.getElementById("output-text").innerText;
}
function printOutput(num){
   document.getElementById("output-text").innerText=num;
}
let operator = document.getElementsByClassName("operator");
for(let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function() {
        if (this.id==="clear") {
            printHistory("");
            printOutput("");
        } else if (this.id==="backspace") {
            let output = getOutput();
            output = output.substr(0, output.length - 1);
            printOutput(output);
        } else {
            let output = getOutput();
            let history = getHistory();
            if (output === "" && history !== "") {
               /* if (isNaN(history[history.length - 1])) {
                    history= history.substr(0,history.length-1);
                }*/
                history= history.substr(0,history.length-1);
            }
            if (output !== "" || history !== "") {
                history = history + output;
                if (this.id === "=") {
                    let result = eval(history);
                    printOutput(result);
                    printHistory("");
                } else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    })
}
let number = document.getElementsByClassName("number");
for(let i = 0; i < number.length; i++){
    number[i].addEventListener('click',function() {
        let output = getOutput();
        output = output + this.id;
        printOutput(output);
    });
}
let microphone = document.getElementById("microphone");
microphone.onclick = function () {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition
        || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'ru-Ru';
    recognition.start();
    operations = {"$times": "*"}
    recognition.onresult = function (event) {
        let input = event.results[0][0].transcript;
        if (input.includes("0x445")) {
            input = input.replace("0x445", "*");
        }
        /*for (property in operations) {
            input = input.replace(property, operations[property]);
        }*/
        document.getElementById("output-text").innerText=input;
        setTimeout(function () {
            evaluate(input);
        }, 4000);
    }
    function evaluate(input) {
        try {
            let result = eval(input);
            document.getElementById("output-text").innerText=result;
        } catch(e) {
            console.log(e);
            document.getElementById("output-text").innerText="";
        }
    }
}