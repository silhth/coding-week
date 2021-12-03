import { c, q, a, eraseDivContent } from "./basicFunction.js"
import { addTasks, addTaskBtn } from "./addTask.js";
import { modale, signInUser, signInHtml } from "./logInOut.js"
import { modaleHtmlDelete } from "./deleteListItem.js"
import { searchItem } from "./search.js"

// FUNZIONI
// chiamata fetch e aggiunta del valore "priority"

const getToDoList = async () => {
    eraseDivContent(toDoListDiv);
    const toDoListData = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await toDoListData.json();
    toDoList = data.map((toDos) => {
        const nums = parseInt(Math.random() * (6 - 0))
        toDos.priority = nums;
        return toDos;
    });

    // mostro i dati nelle diverse categorie
    filterPriority(toDoList);
    // aggiunge la funzionalità al bottone "completed tasks"
    filterCompleted();
    // aggiunge la funzionalità al cerca
    searchItem(toDoList, toDoListDiv)
    // aggiunta nuovo appuntamento codice ====> addTask.js
    addTaskBtn(btns, searchitems, toDoListDiv, toDoList)

    // Modale d'accesso codice ==> logInOut.js

    if (localStorage.length > 0) {
        signInUser();
    }
    else {
        modale(signInHtml());
    }

};



// filtro l'array per i diversi intervalli di "priority" 
const filterPriority = (arrToDo) => {
    const higherPriority = arrToDo.filter(items => {
        return items.priority >= 4
    })
    render(higherPriority, "higher-priority")

    const highPriority = arrToDo.filter(items => {
        return items.priority >= 2 && items.priority <= 3
    });
    render(highPriority, "high-priority")

    const lowPriority = arrToDo.filter(items => {
        return items.priority >= 0 && items.priority <= 1
    });
    render(lowPriority, "low-priority")
}


//  funzione per il render in pagina 

const render = (arr, container) => {
    const toDoUl = a(toDoListDiv, c("ul"));
    toDoUl.setAttribute("class", container);
    const title = a(toDoUl, c("h2"))
    title.textContent = container
    const hr = a(title, c("hr"))


    arr.map((item) => {

        const toDo = a(toDoUl, c("li"));
        const checked = c("input");
        checked.setAttribute("type", "checkbox")
        if (item.completed === true) {
            checked.setAttribute("checked", true);
            toDo.setAttribute("class", "checked")
        }
        else { toDo.setAttribute("class", "unchecked") }
        toDo.textContent = item.title;
        a(toDo, checked);

        const deleteImg = a(toDo, c("img"))
        deleteImg.setAttribute("src", "img/bin.png")
        // deleteImg.setAttribute("src", "https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/50/000000/external-trash-bin-cleaning-kiranshastry-lineal-kiranshastry.png")
        deleteImg.setAttribute("alt", "delete")

        deleteImg.addEventListener('click', () => {
            modale(modaleHtmlDelete(item, toDoList, toDoListDiv, completedBtn))
        })

    });

}


// aggiunge la funzionalità show/hide task completate.
const filterCompleted = () => {


    completedBtn.addEventListener("click", () => {
        const unchecked = document.querySelectorAll(".unchecked")
        unchecked.forEach((item) => {
            item.classList.toggle("hide")
        })

        if (unchecked[0].className === "unchecked hide") {
            addTask.style.display = "none";
            searchitems.style.display = "none"
            completedBtn.textContent = "SHOW ALL"
        }
        else {
            addTask.style.display = "block";
            searchitems.style.display = "block"
            completedBtn.textContent = "COMPLETED TASKS"
        }
    })

}

export { filterPriority, filterCompleted }






// INIZIALIZZAZIONE VARIABILI 

let toDoList = []
const completedBtn = q(".completed");
const toDoListDiv = q(".toDoList");
const btns = q(".btns")
const searchitems = q(".searchitems")
const addTask = document.querySelector(".add")

// funzione per la crazione dell'app 
document.addEventListener("DOMContentLoaded", getToDoList)




