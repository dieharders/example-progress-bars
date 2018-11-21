// FUNCTIONS //
function goGitHub(el) {
    const link = el.getAttribute('title');
    window.open(link, '_blank');
}
/////////////////////////////////////////////////////////////
// Colors
const green = '#96ff81';
const yellow = '#ffca81';
const red = '#ff8981';
const greenGlow = `rgba(150, 255, 129, 0.8)`;
const yellowGlow = `rgba(255, 136, 0, 0.6)`;
const redGlow = `rgba(236, 85, 74, 0.5)`;
// Fill straight bar
function fillBar(elem_id, amount) {
    var boxDimension = '0px 0px 5px 1px';
    const bar = document.getElementById(elem_id);
    const container = bar.parentNode;
    const text = bar.firstChild;
    
    var percentage;
    var id = setInterval(frame, 20);

    if (container.clientWidth > container.clientHeight) {
        var dir = 0;
        percentage = parseStrDimension(bar.style.width);
    } else {
        var dir = 1;
        percentage = parseStrDimension(bar.style.height);
    }

    const sign = Math.sign(amount - percentage);
    
    function calcDimension() {
        if (dir === 0) {
            bar.style.width = percentage + '%';
        } else {
            bar.style.height = percentage + '%';
        }
    }

    function frame() {
        if ( (percentage >= amount && sign == 1) || (percentage <= amount && sign == -1) ) {
            clearInterval(id);
        } else if (percentage != amount) {
            if (sign === 1) {percentage++;}
            else if (sign === -1) {percentage--;}

            if (percentage >= 100) {percentage = 100; amount = 100}
            else if (percentage <= 0) {percentage = 0; amount = 0}

            calcDimension(); // Change bar size
            text.innerHTML = percentage * 1 + '%'; // Change text value

            // Change color based on progress
            if (percentage < 25) {
                bar.style.backgroundColor = red;
                bar.style.boxShadow = boxDimension + ' ' + redGlow;
            } else if (percentage > 25 && percentage < 75) {
                bar.style.backgroundColor = yellow;
                bar.style.boxShadow = boxDimension + ' ' + yellowGlow;
            } else if (percentage > 75) {
                bar.style.backgroundColor = green;
                bar.style.boxShadow = boxDimension + ' ' + greenGlow;
            }
        }
    }
}

// Fill curved progress bar
function fillCurveBar(name, amount) {
    var boxDimension = '3px 3px 5px 0px';
    var bar = document.getElementById(name);
    var val = bar.parentElement.nextElementSibling;
    var percent = parseInt( val.innerHTML, 10);
    var total = percent+amount;
    var duration = 0;
    const sign = Math.sign(amount);
    
    
    function frame() {
        //console.log(duration + ':' + percent);
        
        // update counter
        duration++;
        if (sign === 1) {percent++}
        else if (sign === -1) {percent--}

        // check finish condition
        if (percent >= 100) {percent = 100; duration = 100; clearInterval(id);}
        else if (percent <= 0) {percent = 0; duration = 0; clearInterval(id);}
        if (percent == total || duration < 0 || duration > 100) {
            clearInterval(id);
        }
        
        // Rotate bar
        bar.style.transform = "rotate(" + (45+(percent*1.8)) + "deg)";
        val.innerHTML = (percent|0);

        // Change color based on progress
        if (percent < 25) {
            bar.style.borderBottomColor = red;
            bar.style.borderRightColor = red;
            bar.style.boxShadow = boxDimension + ' ' + redGlow;
        } else if (percent > 25 && percent < 75) {
            bar.style.borderBottomColor = yellow;
            bar.style.borderRightColor = yellow;
            bar.style.boxShadow = boxDimension + ' ' + yellowGlow;
        } else if (percent > 75) {
            bar.style.borderBottomColor = green;
            bar.style.borderRightColor = green;
            bar.style.boxShadow = boxDimension + ' ' + greenGlow;
        }
    }
    var id = setInterval(frame, 1);
}

function parseStrDimension(str) {
    var val = str.slice( 0, str.search('%') );
    val = Number(val);
    return val;
}

function changeProgress(v) {
    const elems = document.getElementsByClassName('statContainer');
    for (let index = 0; index < elems.length; index++) {
        const element = elems[index];
        const check = element.classList.toString().indexOf('curve-bar-container');
    
        if (check == -1) {
            const s_bar = element.children[1].children[0]; // straight bar
            const elName = s_bar.id;
            var val = parseStrDimension(s_bar.innerText) + v;
            fillBar(elName, val);
        } else {
            const c_bar = element.children[1].children[0]; // curved bar
            const elName = c_bar.id;
            var val = parseStrDimension(c_bar.innerText) + v;
            fillCurveBar(elName, val);
        }
    }
}

function resetProgress() {
    fillBar("myBarHorFull", 100);
    fillBar("myBarVertQuarter", 85);
    fillBar("myBarVertHalf", 50);
    fillBar("myBarVertLow", 15);
    fillCurveBar("curvedBar", 100);
}

// LOGIC //
//
// Set bars
resetProgress();