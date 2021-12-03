import {c, q, a, eraseDivContent} from "./basicFunction.js"

const modaleCredential = q(".modaleCredential")
const project = q(".project")
const modaleUserPsw = q(".modaleUserPsw")
const UserPsw = q(".UserPsw");

// show modale
const modale = (funHtmlContent) =>{ setTimeout(() => {
    project.style.filter = "blur(8px)";
    modaleCredential.style.top = "0";
    modaleUserPsw.style.top = "20%"
    funHtmlContent;

}, 500)}

// hide modale
const modaleOff = () => {
    project.style.filter = "blur(0px)";
    modaleCredential.style.top = "-100%";
    modaleUserPsw.style.top = "-100%";
}

// scrive il contenuto della modale in HTML

const signInHtml = () =>{
    eraseDivContent(UserPsw)
    
    const h2SignIn = a(UserPsw, c("h2"))
    h2SignIn.textContent = "Sign In" 
    const hrSignIn = a(UserPsw, c("hr"))

    const labelUserName = a(UserPsw, c("label")).setAttribute("id", "labelUsername")
    labelUsername.setAttribute('for', 'username')
    labelUsername.textContent = "Username"
    const username = Object.assign(a(UserPsw, c("input")), {
        type: 'text',
        id: 'username',
        name: 'username',
        required: true
    })

    const labelpsw = a(UserPsw, c("label")).setAttribute("id", "labelPsw")
    labelPsw.setAttribute("for", "psw")
    labelPsw.textContent = "Password"
    const psw = Object.assign(a(UserPsw, c("input")), {
        type: 'password',
        id: 'psw',
        name: 'psw',
        required: true
    })

    const signInBtn =  a(UserPsw, c('button'))
    signInBtn.setAttribute("class", "sign-in" )
    signInBtn.textContent= "Sign in"

    const divRememberMe = a(UserPsw, c("div"))
    divRememberMe.setAttribute('class', 'saveCredential')
    const rememberMe = Object.assign(a(divRememberMe, c("input")), {
        type: 'checkbox',
        id: 'remember-me',
        name: 'remember-me',
        checked: true
    })
    const labelRememberMe = a(divRememberMe, c("label")).setAttribute("id", "RememberMe")
    RememberMe.setAttribute('for', 'remember-me'),
    RememberMe.textContent = "Remember me"

    signIn(signInBtn, username, psw, rememberMe);
}

// condizioni difunzionamento della modale

const signIn = (btn, User, Psw, Remember) => {
   
    btn.addEventListener("click", () => {

    if (Remember.checked) {
        localStorage.setItem('myUsername', User.value)
        localStorage.setItem ('myPsw', Psw.value);
    }
    
    if (User.value && Psw.value) {
        modaleOff();
        signInUser();
    }
    else if (User.value) {
        UserPsw.classList.toggle("animate__shakeX")
        setTimeout(() => {UserPsw.classList.remove("animate__shakeX")
        Psw.style.border = ""}, 1000)
        Psw.style.border = "2px solid rgba(200, 0, 0, 0.7)"
    }
    else {
        UserPsw.classList.toggle("animate__shakeX")
        setTimeout(() => {UserPsw.classList.remove("animate__shakeX"),
        User.style.border = ""}, 1000)
        User.style.border = "2px solid rgba(200, 0, 0, 0.7)"
    }
    
})

}

// scrive il contenuto HTML della barra log in in alto

const signInUser = () => {
    const log = a(project, c('div'))
    log.setAttribute("class", "log");
    const logImg = a(log, c('img'));
    logImg.setAttribute("src", "img/popular-man.png");
    // logImg.setAttribute("src", "https://img.icons8.com/windows/32/000000/popular-man.png");
    logImg.setAttribute( "alt", "log-in image");

    const logP = a(log, c("p"));
    logP.setAttribute('class', 'login')
    logP.textContent = "Hi"

    const logPName = a(log, c("p"));
    logPName.setAttribute('class', 'logInName')
    logPName.textContent = "ciao"
    
    if (localStorage.length>0) 
    {logPName.textContent =  localStorage.getItem('myUsername')}
    else {logPName.textContent = username.value}

    const logImgBtn = a(log, c('img'));
    logImgBtn.setAttribute("class", "log-out")
    logImgBtn.setAttribute("src", "img/log-out.png");
    // logImgBtn.setAttribute("src", "https://img.icons8.com/external-prettycons-lineal-prettycons/50/000000/external-exit-essentials-prettycons-lineal-prettycons.png");
    logImgBtn.setAttribute( "alt", "log-out image");


    changeLogInInfo(logImgBtn, log);
}

// bottone che modifica le informazioni di contatto della barra in alto
const changeLogInInfo = (Btn, container) =>{
    Btn.addEventListener("click", () => {
        localStorage.clear();
        eraseDivContent(container)
        modale(signInHtml());
        })
    }

export { modale, signInUser, signIn, signInHtml, modaleOff }