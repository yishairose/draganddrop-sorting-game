const draggableList = document.querySelector('#draggable-list');
const check = document.querySelector('#check');

const richestPeople = ['Elon Musk', 'Bernard Arnault & family', 'Jeff Bezos', 'Larry Ellison', 'Warren Buffett', 'Bill Gates', 'Larry Page', 'Mark Zuckerberg', 'Sergey Brin', 'Steve Ballmer'];
//Store list items
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into dom;
function createList() {
    [...richestPeople].map(a => (
        { value: a, sort: Math.random() }
    )).sort((a, b) => { return a.sort - b.sort }).map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);
            listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
    <p class="person-name">${person}</p>
    <i class="fa-solid fa-grip-vertical"></i>
    </div>
    `;
            listItems.push(listItem);
            draggableList.appendChild(listItem);
        });
    addEventListeners();
}
function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');

}
function dragDrop() {
    const dragDropIndex = +this.getAttribute('data-index');
    console.log(dragDropIndex)
    swapItems(dragStartIndex, dragDropIndex);
    this.classList.remove('over');
}
function dragEnter() {
    this.classList.add('over');

}
function dragLeave() {
    this.classList.remove('over')
}
function dragOver(e) {
    e.preventDefault();
}
function swapItems(fromIndex, toIndex) {
    itemOne = listItems[fromIndex].querySelector('.draggable')
    itemTwo = listItems[toIndex].querySelector('.draggable')

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);

}
function checkOrder() {

    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();
        if (personName !== richestPeople[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    });
    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });

}

check.addEventListener('click', checkOrder);


