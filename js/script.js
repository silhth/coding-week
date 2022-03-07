import { c, q, a, eraseDivContent } from "./basicFunction.js"
import { addTaskBtn } from "./addTask.js";
import { modale, signInUser, signInHtml } from "./logInOut.js"
import { modaleHtmlDelete} from "./deleteListItem.js"
import { searchItem } from "./search.js"

// FUNZIONI
// chiamata fetch e aggiunta del valore "priority"

const getToDoList = async () => {
    eraseDivContent(toDoListDiv);
    const toDoListData = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await toDoListData.json();
    toDoListCompleted = data.map((toDos) => {
        const nums = parseInt(Math.random() * (6 - 0))
        toDos.priority = nums;
        return toDos;
    });
    toDoList = toDoListCompleted
    // mostro i dati nelle diverse categorie
    filterPriority(toDoList);
    // aggiunge la funzionalità al bottone "completed tasks"
    filterCompleted();
    showAllTask();
    // aggiunge la funzionalità al cerca
    searchItem(toDoListDiv)
    // aggiunta nuovo appuntamento codice ====> addTask.js
    addTaskBtn(btns, searchitems, toDoListDiv)

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
        checked.addEventListener('change', () => 
             item.completed === true ? item.completed = false : item.completed = true)
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
        deleteImg.setAttribute("alt", "delete")
       
        deleteImg.addEventListener('click', () => {
            console.log(arr)
            modale(modaleHtmlDelete(item, toDoListDiv))
       })

    });

}

//funzione per eliminare items dalla lista

const eraseItem = (item, container) => {   
    const id = parseInt(item.id);
    const doDoListRemove = toDoList.filter((item) => item.id !== id);
    toDoList = doDoListRemove;  
    eraseDivContent(container)
    filterPriority(toDoList);
}



// aggiunge la funzionalità show/hide task completate.
const filterCompleted = () => {
    
    completedBtn.addEventListener("click", () => { 
        eraseDivContent(toDoListDiv)
        const arrCompleted = toDoList.filter((item) => item.completed ===true);
        toDoList=arrCompleted
        filterPriority(toDoList)
        showAll.style.display = "block";
        completedBtn.style.display = "none";
        add.style.display = "none";
    })}


const showAllTask = () => {
    
    showAll.addEventListener("click", () => {       
                eraseDivContent(toDoListDiv)
                toDoList=toDoListCompleted
                filterPriority(toDoList)    
                showAll.style.display = "none";
                completedBtn.style.display = "block";
                add.style.display = "block";
            })}

//item checked



// INIZIALIZZAZIONE VARIABILI 
let toDoListCompleted =[]
let toDoList = []
const completedBtn = q(".completed");
const toDoListDiv = q(".toDoList");
const btns = q(".btns")
const searchitems = q(".searchitems")
const showAll= q(".showAll")
const add = q(".add")
const higherP = q(".higher-priority")


// funzione per la crazione dell'app 
document.addEventListener("DOMContentLoaded", getToDoList)


export { filterPriority, filterCompleted, eraseItem, toDoList }
