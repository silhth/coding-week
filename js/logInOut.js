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
    // signInHtml();

}, 500)}

const signInUser = () => {
    const log = a(project, c('div'))
    log.setAttribute("class", "log");
    const logImg = a(log, c('img'));
    logImg.setAttribute("src", "https://img.icons8.com/windows/32/000000/popular-man.png");
    logImg.setAttribute( "alt", "log-in image");

    const logP = a(log, c("p"));
    logP.setAttribute('class', 'login')
    
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
   
    signInBtn.addEventListener("click", () => {

    if (rememberMe.checked) {
        localStorage.setItem('myUsername', username.value)
        localStorage.setItem ('myPsw', psw.value);
    }
    
    if (username.value && psw.value) {
        project.style.filter = "blur(0px)";
        modaleCredential.style.top = "-100%";
        modaleUserPsw.style.top = "-100%";
        signInUser();
    }
    else if (username.value) {
        UserPsw.classList.toggle("animate__shakeX")
        setTimeout(() => {UserPsw.classList.remove("animate__shakeX")
        psw.style.border = ""}, 1000)
        psw.style.border = "2px solid rgba(200, 0, 0, 0.7)"
    }
    else {
        UserPsw.classList.toggle("animate__shakeX")
        setTimeout(() => {UserPsw.classList.remove("animate__shakeX"),
        username.style.border = ""}, 1000)
        username.style.border = "2px solid rgba(200, 0, 0, 0.7)"
    }
    
})

}

// const signInHtml = () =>{
//     const h2SignIn = a(UserPsw, c("h2"))
//     h2SignIn.textContent = "Sign In" 
//     const hrSignIn = a(UserPsw, c("hr"))
//     const labelUserName = a(UserPsw, c("label")).setAttribute("id", "labelUsername")
//     labelUsername.setAttribute('for', 'username')
//     labelUsername.textContent = "Username"
//     const inputUserName = Object.assign(a(UserPsw, c("input")), {
//         type: 'text',
//         id: 'username',
//         name: 'username',
//         required: true
//     })
//     const labelpsw = a(UserPsw, c("label")).setAttribute("id", "labelPsw")
//     labelPsw.setAttribute("for", "labelpsw")
//     labelPsw.textContent = "Password"
//     const inputpsw = Object.assign(a(UserPsw, c("input")), {
//         type: 'password',
//         id: 'labelpsw',
//         name: 'psw',
//         required: true
//     })
//     const btnSignIn =  a(UserPsw, c('button'))
//     btnSignIn.setAttribute("class", "sign-in" )
//     btnSignIn.textContent= "Sign in"

//     const divRememberMe = a(UserPsw, c("div"))
//     divRememberMe.setAttribute('class', 'saveCredential')
//     const inputRememberMe = Object.assign(a(divRememberMe, c("input")), {
//         type: 'checkbox',
//         id: 'remember-me',
//         name: 'remember-me',
//         checked: true
//     })
//     const labelRememberMe = a(divRememberMe, c("label")).setAttribute("id", "RememberMe")
//     RememberMe.setAttribute('for', 'remember-me'),
//     RememberMe.textContent = "Remember me"
// }

export { singInModale, signInUser, signIn }