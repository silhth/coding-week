import { c, q, a, eraseDivContent} from "./basicFunction.js"
import { addTasks } from "./addTask.js";
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

   
    filterPriority();
    filterCompleted();

};



// filtro l'array per i diversi intervalli di "priority" 
const filterPriority = () => {
    const higherPriority = toDoList.filter(items => {
        return items.priority >= 4
    })
    render(higherPriority, "higher-priority")

    const highPriority = toDoList.filter(items => {
        return items.priority >= 2 && items.priority <= 3
    });
    render(highPriority, "high-priority")

    const lowPriority = toDoList.filter(items => {
        return items.priority >= 0 && items.priority <= 1
    });
    render(lowPriority, "low-priority")
}


//  funzione per il render in pagina 

const render = (arr, container) => {
    const toDoUl = a(toDoListDiv, c("ul"));
    toDoUl.setAttribute("class", container );
    const title = a (toDoUl, c("h2"))
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
    });

}

// aggiunge la funzionalità show/hide task completate.
const filterCompleted = () => {
    const unchecked = document.querySelectorAll(".unchecked")

    completedBtn.addEventListener("click", () => {
        unchecked.forEach((item) => {
            item.classList.toggle("hide")
        })
        console.log(completedBtn.textContent)
        completedBtn.textContent === "COMPLETED TASKS" ? completedBtn.textContent = "SHOW ALL" 
        : completedBtn.textContent = "COMPLETED TASKS";
    })
}

export { filterPriority, filterCompleted}


// INIZIALIZZAZIONE VARIABILI 

let toDoList = []
const completedBtn = q(".completed");
const toDoListDiv = q(".toDoList");
const btns = q(".btns")

// funzione per la crazione dell'app
getToDoList();

const addTask = document.querySelector(".add")

addTask.addEventListener('click', ()=> {
    window.location.hash = "#add";
    btns.style.display = "none";
    addTasks(toDoListDiv, toDoList, btns);
})



