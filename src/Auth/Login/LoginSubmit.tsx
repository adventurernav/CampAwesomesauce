import APIURL from "../../helpers/environment";


interface Values {
    email: string,
    password: string
}
type UpdateToken = {
    updateToken: (token:string, authenticated:boolean)=>void
}
const LoginSubmit = (values: Values, updateToken: UpdateToken) => {
    
    fetch(`${APIURL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: values.email,
            password: values.password
        })
    })
        .then(res => res.json())
        .then((data) => {
            console.log('DATA----->', data);
            window.localStorage.setItem('token', data.sessionToken)
            updateToken.updateToken(data.sessionToken, true)
        })

}
export default LoginSubmit;