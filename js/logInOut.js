import {c, q, a, eraseDivContent} from "./basicFunction.js"

const modaleCredential = q(".modaleCredential")
const project = q(".project")
const modaleUserPsw = q(".modaleUserPsw")
const signInBtn = q(".sign-in")
const username = q("#username")
const psw = q("#psw")
const UserPsw = q(".UserPsw")
const rememberMe =q("#remember-me")



const singInModale = () =>{ setTimeout(() => {
    project.style.filter = "blur(8px)";
    modaleCredential.style.top = "0";
    modaleUserPsw.style.top = "20%"

}, 500)}

const signInUser = () => {
    const log = a(project, c('div'))
    log.setAttribute("class", "log");
    const logImg = a(log, c('img'));
    logImg.setAttribute("src", "https://img.icons8.com/windows/32/000000/popular-man.png");
    logImg.setAttribute( "alt", "log-in image");

    const logP = a(log, c("p"));
    logP.setAttribute('class', 'login')
    console.log(localStorage.getItem('myUsername'))
    if (localStorage.length>0) 
    {logP.textContent =  `Hi   ${localStorage.getItem('myUsername')}`}
    else {logP.textContent = `Hi   ${username.value}`}

    const logBtn = a(log, c("button"));
    logBtn.setAttribute('class', 'logout')
    const logImgBtn = a(logBtn, c('img'));
    logImgBtn.setAttribute("src", "https://img.icons8.com/external-prettycons-lineal-prettycons/50/000000/external-exit-essentials-prettycons-lineal-prettycons.png");
    logImgBtn.setAttribute( "alt", "log-out image");


    
    
    logBtn.addEventListener("click", () => {
        localStorage.clear();
        eraseDivContent(log)
        singInModale();
    })
}




const signIn = () => {
    console.log("bbb")
    signInBtn.addEventListener("click", () => {

    if (rememberMe.checked) {
        localStorage.setItem('myUsername', username.value)
        localStorage.setItem ('myPsw', psw.value);
    }
    
    if (username.value && psw.value) {
        // clearTimeout(singIn);
        project.style.filter = "blur(0px)";
        modaleCredential.style.top = "-100%";
        modaleUserPsw.style.top = "-100%";
        signInUser();
    }
    else if (username.value) {
        UserPsw.classList.toggle("animate__shakeX")
        setTimeout(() => UserPsw.classList.remove("animate__shakeX"), 1000)
        psw.style.border = "2px solid rgba(200, 0, 0, 0.7)"
    }
    else {
        UserPsw.classList.toggle("animate__shakeX")
        setTimeout(() => UserPsw.classList.remove("animate__shakeX"), 1000)
        username.style.border = "2px solid rgba(200, 0, 0, 0.7)"
    }
    
})

}

export { singInModale, signInUser, signIn }