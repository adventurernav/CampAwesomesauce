import APIURL from "../../helpers/environment";


interface Values {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
}

const RegisterSubmit = (values: Values) => {
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
            role: values.role
        })
    })
        .then(res => { return res.json() })
        .then((data) => {
            console.log('DATA----->', data);
            window.localStorage.setItem('token', data.sessionToken)

        })

}
export default RegisterSubmit