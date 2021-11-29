// FUNZIONI
// chiamata fetch e aggiunta del valore "priority"

const getToDoList = async () => {
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
    render(higherPriority, listHigherPriority)

    const highPriority = toDoList.filter(items => {
        return items.priority >= 2 && items.priority <= 3
    });
    render(highPriority, listHighPriority)

    const lowPriority = toDoList.filter(items => {
        return items.priority >= 0 && items.priority <= 1
    });
    render(lowPriority, listLowPriority)
}


//  funzione per il render in pagina 

const render = (arr, container) => {
    arr.map((item) => {
        const toDo = document.createElement("li")
        const checked = document.createElement("input")
        checked.setAttribute("type", "checkbox")
        if (item.completed === true) {
            checked.setAttribute("checked", true);
            toDo.setAttribute("class", "checked")
        }
        else { toDo.setAttribute("class", "unchecked") }
        toDo.textContent = item.title;
        toDo.appendChild(checked)
        container.appendChild(toDo);
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

// INIZIALIZZAZIONE VARIABILI 

let toDoList = []
const listHigherPriority = document.querySelector(".higher-priority")
const listHighPriority = document.querySelector(".high-priority")
const listLowPriority = document.querySelector(".low-priority")
const completedBtn = document.querySelector(".completed")

// funzione per la crazione dell'app

getToDoList()

