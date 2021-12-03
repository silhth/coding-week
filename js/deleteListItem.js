import { c, q, a, eraseDivContent } from "./basicFunction.js"
import { filterPriority } from "./script.js"
import { modaleOff } from "./logInOut.js"

const divModale = q(".UserPsw")

// funzione per eliminare un item dalla lista

const eraseItem = (item, arr, btn,container) => {
    const id = parseInt(item.id);
        const doDoListRemove = arr.filter((item) => item.id !== id);
        arr = doDoListRemove;
        eraseDivContent(container)
        filterPriority(doDoListRemove);
        btn.textContent = "SHOW ALL" ? btn.textContent = "COMPLETED TASKS" : btn.textContent = "COMPLETED TASKS"
}

// riscrive la modale in Htlm per eliminare items dalla lista

const modaleHtmlDelete = (item, arr, container, btn) => {
    eraseDivContent(divModale)
    const h2Sure = a(divModale, c("h2"))
    h2Sure.textContent = "are you sere?"
    const btnNo = a(divModale, c("button"))
    btnNo.textContent = "NO"
    const btnYes = a(divModale, c("button"))
    btnYes.textContent = "YES"

    btnYes.addEventListener('click', () => {
        eraseItem (item, arr, btn, container);
        modaleOff();
    })

    btnNo.addEventListener("click", () => {
        modaleOff();
    })
}



export { modaleHtmlDelete }