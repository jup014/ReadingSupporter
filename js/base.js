function addTextAreaCallback(textArea, callback, delay) {
    var timer = null;
    textArea.onkeyup = function() {
        if (timer) {
            window.clearTimeout(timer);
        }
        timer = window.setTimeout( function() {
            timer = null;
            callback();
        }, delay );
    };
    textArea = null;
}

$(document).ready(function() {
    addTextAreaCallback( document.getElementById("src"), src_onkeypress, 30 );
    $("#btnSample").click(function() {
        fillSampleText();
    });
    $(".form-check :checkbox").change(function() {
        updateContent();
    });
    new ClipboardJS("#btnCopy");
});


function fillSampleText() {
    // document.getElementById("src").value = "Hello JavaScript!";

    fetch("txt/constitution.txt")
        .then(response => response.text())
        .then((response) => {
            document.getElementById("src").value = response;
            updateContent();
        })
        .catch(err => console.log(err))
}

function src_onchange() {
    // console.log("src_onchange();")
    updateContent();
}

function src_onkeypress() {
    // console.log("src_onkeypress();")
    updateContent();
}

function updateContent() {
    var text = document.getElementById("src").value;
    // console.log(text);

    var lines = text.split("\n");
    var paragraphs = [];

    buildParagraphs(lines, paragraphs);

    // console.log(paragraphs);

    
    // Outputs resultant paragraphs
    document.getElementById("tgt").innerHTML = "";
    paragraphs.forEach(function(str) {
        var p = document.createElement("p");
        p.appendChild(document.createTextNode(str));
        document.getElementById("tgt").appendChild(p);
    });

    
}

function buildParagraphs(lines, paragraphs) {
    var curline;
    var curParagraph = "";

    // Paragraph Building
    for (var i = 0; i < lines.length; i++) {
        curline = lines[i];
        
        if (isStartOfSentence(curline) && hasParagraphEnded(curParagraph)) {
            if (curParagraph == "") {
                curParagraph = curline;
            } else {
                paragraphs.push(curParagraph.trim());
                curParagraph = curline;
            }
        } else {
            if (curParagraph.slice(-1) == " ") {
                curParagraph = curParagraph + curline;
            } else {
                curParagraph = curParagraph + " " + curline;
            }
        }
    }
    paragraphs.push(curParagraph.trim());
}

function isStartOfSentence(line) {
    if (line == "") {
        return true;
    } else {
        return line.charAt(0) == line.charAt(0).toUpperCase();
    }
}

function hasParagraphEnded(paragraph) {
    // Rule based decision.

    // Rule 1. If the paragraph ends with period(.)
    if (paragraph.trim().slice(-1) == ".") {
        return true;
    }

    // Rule 2. If the paragraph starts with certain words
    var specialWords = ["Section", "Article", "Chapter"];

    for (var i = 0; i < specialWords.length; i++) {
        if (paragraph.trim().startsWith(specialWords[i])) {
            return true;
        }
    }

    // else:

    return false;
}