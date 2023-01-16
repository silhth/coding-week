import {c, q, a, eraseDivContent} from "./basicFunction.js"
import { filterPriority, toDoList } from "./script.js"
import { modale } from "./logInOut.js"
import { modaleOff } from "./logInOut.js"

const divModale = q(".UserPsw")

const addTasks = (container, btns, searchBar) => {
    eraseDivContent(container);
    console.log(toDoList)
    const homeBtn = (event) => {
        event.preventDefault()
        modaleOff();
        eraseDivContent(container);
        window.location.hash = "";  
        filterPriority(toDoList);
        btns.style.display = "flex";
        searchBar.style.display = "block";
    
    }

    // creo gli elementi nel div 

    const form = a(container, c("form"))

    const divName = a(form, c("div"))
    const labelName = a(divName, c("label")).setAttribute("id", "newname");
    newname.textContent = "Name *";
    newname.setAttribute('for', "newname");
    const inputName = Object.assign(a(divName, c("input")), {
        id: 'name',
        type: 'text',
        name: 'name',
        required: true});

    const divLastname = a(form, c("div"))
    const labelLastname = a(divLastname, c("label")).setAttribute("id", "lastName");
    lastName.textContent = "Lastname *"
    lastName.setAttribute('for', "lastName")
    const inputLastname = Object.assign(a(divLastname, c("input")), {
        id: 'lastname',
        type: 'text',
        name: 'lastname',
        required: true});
    
    const divAge = a(form, c("div"))
    const labelAge = a(divAge, c("label")).setAttribute("id", "age");
    age.textContent = "Age"
    age.setAttribute('for', "age")
    const inputAge = Object.assign(a(divAge, c("input")), {
        id: 'age',
        type: 'number',
        name: 'age'});
    
    const divText = a(form, c("div"))
    divText.setAttribute("class", "add-text")
    const labelText = a(divText, c("label")).setAttribute("id", "text");
    text.textContent = "Appointment description *"
    text.setAttribute('for', "text")
    const inputText = Object.assign(a(divText, c("textarea")), {
        id: 'text',
        name: 'text'});


    const divPriority = a(form, c("div"))
    divPriority.setAttribute('class', 'priority')
    const labelPriority = a(divPriority, c("label")).setAttribute("id", "priority");
    priority.textContent = "Priority"
    priority.setAttribute("for", "priority")

    const selectLabel = a(divPriority, c("select"))
    selectLabel.setAttribute("name", "select-Priority")
    
    const optionHigherP = a(selectLabel, c("option"))
    optionHigherP.setAttribute("value", "5")
    optionHigherP.textContent = "higher-priority"
    const optionHighP = a(selectLabel, c("option"))
    optionHighP.setAttribute("value", "3")
    optionHighP.textContent = "high-priority"
    const optionLowP = a(selectLabel, c("option"))
    optionLowP.setAttribute("value", "1")
    optionLowP.textContent = "low-priority"
   
    const divBtns = a(form, c("div"))
    const btnSave = a(divBtns, c("button"))
    btnSave.setAttribute("type", "button")
    btnSave.textContent= "save";

    const btnBackHome = a(divBtns, c("button"))
    btnBackHome.textContent= "home";
    btnBackHome.setAttribute("class", "home")
    btnBackHome.addEventListener("click", homeBtn)

    // Creo la modale per l'agginta item

    const modaleAddItem = () => {
        eraseDivContent(divModale);               
        const h2Add = a(divModale, c("h2"))
        h2Add.setAttribute('style', 'white-space: pre;');
        h2Add.textContent = 'You added the task "' + inputText.value +'" \r\n\Do you want to add a new task?'
    
        const btnYes = a(divModale, c("button"))
        btnYes.textContent = "YES"

        const btnBack = a(divModale, c("button"))
        btnBack.textContent= "home";
        btnBack.setAttribute("class", "home")
        

        btnYes.addEventListener('click', () => {
            modaleOff();
            inputText.value = ""
            inputName.value = ""
            inputLastname.value = ""
            inputAge.value = ""
            
        })

        btnBack.addEventListener('click', homeBtn)
    }


    // assegno la funzione ai bottoni

    btnSave.addEventListener('click', () =>{
        const ids = toDoList.map((x)=>x.id)
        const max = Math.max(...ids)
        let newTask = {
            id: max + 1,
            name: inputName.value,
            lastname: inputLastname.value,
            age: inputAge.value,
            title: inputText.value,
            priority: selectLabel.value,
            completed: false
        }
        if (newTask.title && newTask.lastname && newTask.name) {  
            modale(modaleAddItem());
            toDoList.unshift(newTask);
        }
        else {alert("Please fill all the mandatory* fields")};

    })
};

const addTask = document.querySelector(".add")

const addTaskBtn = (btns, searchBar, container) =>{
    
    addTask.addEventListener('click', () => {
        window.location.hash = "#add";
        btns.style.display = "none";
        searchBar.style.display = "none";
        addTasks(container, btns, searchBar);
})
}


export { addTasks, addTaskBtn }