
var emojipane;
var consolepane;
var consolemsglist = [];

const start = Date.now();

function updateconsole() {
    var tempConsoleList = consolemsglist;
    const timestr = getTimeStr();
    const consolemsg = tempConsoleList.join("<br/>").concat("<br/>").concat(timestr);

    $('#consolemsg').html(consolemsg);
}

function log(msg) {
    const elapsed = (Date.now() - start)/1000;
    const nowdatestr = `${elapsed.toLocaleString('en', {minimumFractionDigits:3,useGrouping:false})}s`;

    consolemsglist.push(`${nowdatestr}: ${msg}`)
    updateconsole();
}

function getTimeStr() {
    const millis = Date.now() - start;
    const secs = millis/1000;
    
    secsstr = secs.toLocaleString('en', {minimumFractionDigits:3,useGrouping:false});
    timestr = `Time elapsed: ${secsstr}s`
    return(timestr);
}

function timeout() {
    updateconsole();
    setTimeout(timeout,10);
}

$(document).ready(function() {
    emojipane = $('#emojipane');
    consolepane = $('#consolepane');

    updateconsole();
    $('.emoji').click(function (event) {
        event.stopPropagation();
        if (!event.target.control.checked) {
            log(`${event.target.innerHTML} checked.`);
        } else {
            log(`${event.target.innerHTML} unchecked.`);
        }
        
    });

    setTimeout(timeout, 100);
    // emojipane.append($('<div></div>')).addClass()

    // addTextAreaCallback( document.getElementById("src"), src_onkeypress, 30 );
    // $("#btnSample").click(function() {
    //     fillSampleText();
    // });
    // $(".form-check :checkbox").change(function() {
    //     updateContent();
    // });
    // new ClipboardJS("#btnCopy");
});