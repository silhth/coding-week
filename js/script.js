import { c, q, a, eraseDivContent } from "./basicFunction.js"
import { addTasks } from "./addTask.js";
import { singInModale, signInUser, signIn } from "./logInOut.js"
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
    filterPriority(toDoList);
    filterCompleted();   
    
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
        deleteImg.setAttribute("src","https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/50/000000/external-trash-bin-cleaning-kiranshastry-lineal-kiranshastry.png" )
        
        
        deleteImg.addEventListener('click', ()=> {
            eraseDivContent(divModale)
            const h2Sure = a(divModale, c("h2"))
            h2Sure.textContent= "are you sere?"
            const btnNo =a(divModale, c("button"))
            btnNo.textContent = "NO"
            const btnYes =a(divModale, c("button"))
            btnYes.textContent = "YES"
            singInModale()
            console.log(btnYes)
            console.log(divModale.innerHTML)
            btnYes.addEventListener('click', () => {

                console.log("ciao")
                const id = parseInt(item.id);
                const doDoListRemove = toDoList.filter((item) => item.id !== id);
                toDoList = doDoListRemove;
                eraseDivContent(toDoListDiv)
                filterPriority(doDoListRemove);
                completedBtn.textContent = "SHOW ALL" ? completedBtn.textContent = "COMPLETED TASKS" : completedBtn.textContent = "COMPLETED TASKS"
                project.style.filter = "blur(0px)";
                modaleCredential.style.top = "-100%";
                modaleUserPsw.style.top = "-100%"
            })
            btnNo.addEventListener("click", ()=> {
                project.style.filter = "blur(0px)";
                modaleCredential.style.top = "-100%";
                modaleUserPsw.style.top = "-100%"
            })
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
        
        unchecked[0].className === "unchecked hide" ? completedBtn.textContent = "SHOW ALL"
        : completedBtn.textContent = "COMPLETED TASKS"
    })

}

export { filterPriority, filterCompleted }


// INIZIALIZZAZIONE VARIABILI 
const divModale = q(".UserPsw")
let toDoList = []
const completedBtn = q(".completed");
const toDoListDiv = q(".toDoList");
const btns = q(".btns")
const modaleCredential = q(".modaleCredential")
const project = q(".project")
const modaleUserPsw = q(".modaleUserPsw")
// funzione per la crazione dell'app 
document.addEventListener("DOMContentLoaded", () => {

getToDoList();


// aggiunta nuovo appuntamento codice ====> addTask.js

const addTask = document.querySelector(".add")

addTask.addEventListener('click', () => {
    window.location.hash = "#add";
    btns.style.display = "none";
    addTasks(toDoListDiv, toDoList, btns);
})


// Modale d'accesso codice ==> logInOut.js

if(localStorage.length>0){ 
    signInUser(); }
else {
    singInModale();
}

signIn();

});


