import APIURL from "../../helpers/environment";

interface Values {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
}
type UpdateToken = {
    updateToken: (token:string, authenticated:boolean)=>void
}

const RegisterSubmit = (values: Values, updateToken: UpdateToken ) => {
    console.log(values);
    fetch(`${APIURL}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            role: 'test'
        })
    })
        .then(res => res.json())
        .then((data) => {
            console.log('DATA----->', data);
            window.localStorage.setItem('token', data.sessionToken)
            updateToken.updateToken(data.sessionToken, true)
        })
}
export default RegisterSubmit