// FUNCTIONS //
function goGitHub(el) {
    const link = el.getAttribute('title');
    window.open(link, '_blank');
}

function fillBar(elem_id, amount) {
    const bar = document.getElementById(elem_id);
    const container = bar.parentNode;
    const text = bar.firstChild;
    
    var percentage;
    var id = setInterval(frame, 20);
    const green = '#96ff81';
    const yellow = '#ffca81';
    const red = '#ff8981';
    const greenGlow = `rgba(150, 255, 129, 0.8)`;
    const yellowGlow = `rgba(255, 136, 0, 0.6)`;
    const redGlow = `rgba(236, 85, 74, 0.5)`;
    const boxDimension = '0px 0px 5px 1px';

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

function parseStrDimension(str) {
    var val = str.slice( 0, str.search('%') );
    val = Number(val);
    return val;
}

function changeProgress(v) {
    const elems = document.getElementsByClassName('statContainer');
    for (let index = 0; index < elems.length; index++) {
        const element = elems[index];
        const elName = element.children[1].children[0].id;
        const elem = document.getElementById(elName);
        var val = parseStrDimension(elem.innerText) + v;
        fillBar(elName, val);
    }
}

function resetProgress() {
    fillBar("myBarHorFull", 100);
    fillBar("myBarVertQuarter", 85);
    fillBar("myBarVertHalf", 50);
    fillBar("myBarVertLow", 15);
}

// LOGIC //
//
// Set bars
resetProgress();