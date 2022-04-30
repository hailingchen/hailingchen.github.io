const draggableElements = document.querySelectorAll('.draggable');
const droppableElements = document.querySelectorAll('.droppable');
const Front = document.getElementById('machineFront');
const Right = document.getElementById('machineRight');
const switchOff = document.getElementById('switchOffRight');
const cableRightGray = document.getElementById('cableRightGray');
const cover = document.getElementById('cover');
const machineBobbinCaseGray = document.getElementById('machinebobbinCaseFilledGray');
const bobbinCase = document.getElementById('bobbinCase');
const bobbinCaseFilled = document.getElementById('bobbinCaseFilled');
const coverOpen = document.getElementById('coverOpen');
const machineSpoolGray = document.getElementById('machineSpoolGray');
const longslot = document.getElementById('longSlot');
const threadregulator = document.getElementById('threadRegulator');
const threadlever = document.getElementById('threadLever');
const threadguide = document.getElementById('threadGuide');

function turnRight(){
    if (!Front.classList.contains('turned')){
        Front.classList.add('turned');
        Right.classList.add('turned');
        }
    droppableElements.forEach(elem => {
        var elemId = elem.id;
        if (elemId.includes('Right')){
            elem.style.visibility='visible';}
        });
    if (switchOffRight.classList.contains('start')){
        switchOffRight.style.visibility='visible';
    }
    cover.style.visibility='hidden';
    machineBobbinCaseGray.style.visibility="hidden";
    coverOpen.style.visibility='hidden';
    machineSpoolGray.style.visibility='hidden';
    longslot.style.visibility='hidden';
    threadregulator.style.visibility='hidden';
    threadlever.style.visibility='hidden';
    threadguide.style.visibility='hidden';
}

function turnLeft(){
    if(Front.classList.contains('turned')){
        Front.classList.remove('turned');
        Right.classList.remove('turned');
    }
    droppableElements.forEach(elem => {
        var elemId = elem.id;
        if (elemId.includes('Right')){
            elem.style.visibility='hidden';}
        if (cableRightGray.classList.contains('dropped') && !machineFront.classList.contains('open')){
            document.getElementById('machineFront').src="../modified photos/machineCableFront.png";}
        });
    switchOffRight.style.visibility='hidden';
    if (switchOffRight.classList.contains('done') && !machineFront.classList.contains('open')){
        cover.style.visibility='visible';
    }
    if (cover.classList.contains('done') && !machineFront.classList.contains('filled')){
    machineBobbinCaseGray.style.visibility="visible";}
    if (machineBobbinCaseGray.classList.contains('dropped') && !machineFront.classList.contains('filled')){
        coverOpen.style.visibility='visible';
    }
    if (machineFront.classList.contains('filled') && !machineSpoolGray.classList.contains('done')){
        machineSpoolGray.style.visibility='visible';
    }
    if (machineSpoolGray.classList.contains('dropped') && !longslot.classList.contains('done')){
        longslot.style.visibility='visible';
    }
    if (longslot.classList.contains('done') && !threadregulator.classList.contains('done')){
        threadregulator.style.visibility='visible';
    }
    if (threadregulator.classList.contains('done') && !threadlever.classList.contains('done')){
        threadlever.style.visibility='visible';
    }
    if (threadlever.classList.contains('done') && !threadguide.classList.contains('done')){
        threadguide.style.visibility='visible';
    }
}

function turnOn(){
    document.getElementById('machineRight').src="../modified photos/machineRightOn.png";
    switchOffRight.style.visibility='hidden';
    cableRightGray.style.visibility='hidden';
    switchOffRight.classList.remove('start');
    switchOffRight.classList.add('done');
    cableRightGray.removeAttribute('id');
}

function openCover(){
    document.getElementById('machineFront').src="../modified photos/machineFrontCover.png";
    cover.style.visibility='hidden';
    cover.classList.add('done');
    machineFront.classList.add('open');
    machineBobbinCaseGray.style.visibility='visible';
}

function closeCover(){
    document.getElementById('machineFront').src="../modified photos/machineCableFront.png";
    machineFront.classList.add('filled');
    coverOpen.style.visibility='hidden';
    machineBobbinCaseGray.style.visibility='hidden';
    machineSpoolGray.style.visibility='visible';
}

function longSlot(){
    document.getElementById('machineFront').src='../modified photos/machineCableSpoolA.png';
    longslot.style.visibility='hidden';
    machineSpoolGray.style.visibility='hidden';
    machineSpoolGray.classList.add('done');
    longslot.classList.add('done');
    threadregulator.style.visibility='visible';
    document.getElementById('machineRight').src="../modified photos/machineRightOnSpoolA.png";
}

function threadRegulator(){
    document.getElementById('machineFront').src='../modified photos/machineCableSpoolB.png';
    threadregulator.style.visibility='hidden';
    threadlever.style.visibility='visible';
    threadregulator.classList.add('done');
}

function threadLever(){
    document.getElementById('machineFront').src='../modified photos/machineCableSpoolC.png';
    threadlever.style.visibility='hidden';
    threadlever.classList.add('done');
    threadguide.style.visibility='visible';
}

function threadGuide(){
    document.getElementById('machineFront').src='../modified photos/machineCableSpoolD.png';
    threadguide.style.visibility='hidden';
    threadguide.classList.add('done');
}


draggableElements.forEach(elem => {
    elem.addEventListener('dragstart', startDrag); 
});

droppableElements.forEach(elem => {
    elem.addEventListener('dragenter', dragEnter);
    elem.addEventListener('dragover', dragOver);
    elem.addEventListener('dragleave', dragLeave);
    elem.addEventListener('drop', Drop);
});


//Drag and Drop Function

function startDrag(event) {
    event.dataTransfer.setData('text',event.target.id);
}

function dragEnter(event){
    if(!event.target.classList.contains('dropped')){
        event.target.classList.add('droppable-hover');
    }
}

function dragLeave(event){
    if(!event.target.classList.contains('dropped')){
    event.target.classList.remove('droppable-hover');
    }
}

function dragOver(event) {
    if(!event.target.classList.contains('dropped')){
    event.preventDefault();
    }
}

function Drop(event){
    event.preventDefault();
    event.target.classList.remove('droppable-hover');
    const draggableElementData = event.dataTransfer.getData('text');
    const droppableElementData = event.target.getAttribute('data-draggable-id');

    if (droppableElementData === 'bobbinCase'){
        bobbinCase.style.visibility='hidden';
        Bobbin.style.visibility='hidden';
        bobbinCaseFilled.style.visibility='visible';
    }

    if(droppableElementData.includes(draggableElementData)){
        event.target.classList.add('dropped');
        const draggableElement = document.getElementById(draggableElementData);
        draggableElement.classList.add('dragged');
        draggableElement.setAttribute('draggable','false');
        var name = '#' + droppableElementData + 'Gray';
        var item = '../modified photos/' + droppableElementData + '.png';
        $(name).attr("src",item);}
        console.log(draggableElementData, droppableElementData)
        if (machineBobbinCaseGray.classList.contains('dropped') && !machineFront.classList.contains('filled')){
            document.getElementById('machineSpoolGray').style.visibility='visible';
        }
        if (machineSpoolGray.classList.contains('dropped')){
            document.getElementById('longSlot').style.visibility='visible';
            document.getElementById('machineRight').src='../modified photos/machineRightOnSpool.png';
        }

    if (droppableElementData.includes('Right') && event.target.classList.contains('dropped')){
        switchOffRight.style.visibility='visible';
        switchOffRight.classList.add('start');
    }
}

