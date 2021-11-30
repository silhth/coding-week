import { c, q, a, eraseDivContent} from "./basicFunction.js"
import { filterPriority, filterCompleted} from "./script.js"


const addTasks = (container, array, btns) => {
    eraseDivContent(container);
    
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
    btnSave.textContent= "save"
    const btnBack = a(divBtns, c("button"))
    btnBack.textContent= "home";
    btnBack.setAttribute("class", "home")

    // assegno la funzione ai bottoni

    btnSave.addEventListener('click', () =>{
        let newTask = {
            name: inputName.value,
            lastname: inputLastname.value,
            age: inputAge.value,
            title: inputText.value,
            priority: selectLabel.value
        }
        console.log(array)
        if (newTask.title && newTask.lastname && newTask.name) {array.unshift(newTask)}
        else {alert("Please fill all the mandatory* fields")};

    })



    btnBack.addEventListener('click', () =>{ 
        eraseDivContent(container);
        window.location.hash = "";  
        filterPriority();
        filterCompleted();

        btns.style.display = "flex";
    });

};

export { addTasks }