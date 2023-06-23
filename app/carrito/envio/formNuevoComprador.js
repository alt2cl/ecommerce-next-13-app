import React, {useState} from 'react';

//import {createEnvio} from"./../../api"







function formNuevoComprador({inputMailUser}) {




        function isValidEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
        }
        
        function validarTelefonoChile(telefono) {
            return /^(\+?56){0,1}(9)[98765]\d{7}$/.test(telefono);
          }
        
        function isValidName(name){
            return /^(.{2,})$/.test(name)
        }

    const [inputErrorNombre, setInputErrorNombre] = useState(null);
    const [inputErrorApellido, setInputErrorApellido] = useState(null);
    const [inputErrorTelefono, setInputErrorTelefono] = useState(null);
    const [inputErrorDireccion1, setInputErrorDireccion1] = useState(null);
    const [inputErrorDireccion2, setInputErrorDireccion2] = useState(null);

    const [inputNameUser, setInputNameUser] = useState('');
    const [inputLastNameUser, setInputLastNameUser] = useState('');
    const [inputTelefonoUser, setInputTelefonoUser] = useState('');
    const [inputDireccionUser, setInputDireccionUser] = useState('');
    const [inputDireccion2User, setInputDireccion2User] = useState('');
    const [success, setSuccess] = useState(null);

    const handleChangeInputName = (e) => {
        e.preventDefault();

        if(!isValidName(e.target.value)) {
            setInputErrorNombre('Debes ingresar un nombre')
        } else {
            setInputErrorNombre('OK')
        }
        setInputNameUser(e.target.value)
    }

    const handleChangeInputLastName = (e) => {
        e.preventDefault();
        if(!isValidName(e.target.value)) {
            setInputErrorApellido('Debes ingresar al menos un apellido')
        } else {
            setInputErrorApellido('OK')
            console.log('Apellido OK')
        }
        setInputLastNameUser(e.target.value)
    }

    const handleChangeInputTelefono = (e) => {
        e.preventDefault();
        if(!validarTelefonoChile(inputTelefonoUser)) {
            setInputErrorTelefono('Debes ingresar tu numero de contacto con el formato adecuado')
        } else {
            setInputErrorTelefono('OK')
            console.log('Telefono OK')
        }
        setInputTelefonoUser(e.target.value)
    }
    const handleChangeInputDireccion2 = (e) => {
        setInputDireccion2User(e.target.value)
    }

    const handleSubmitUser =  async event => {

        event.preventDefault();

        console.log('handleSubmitUser')

        try {

            if(inputErrorNombre == 'OK' && inputErrorTelefono == 'OK' ) {
                setSuccess('Todo OK continuemos!')
            } else {
                setSuccess('Faltan algunos datos')
            }
            
        } catch (error) {
            
        }

       

        //createEnvio()

        addEnvio()
        

    }

    

    const date = new Date()

    const Envio = {
        numpedido: '55',
        fechapedido: date,
        cliente:1,
        direccion:1,

    }

    const addEnvio = () => {
        console.log('adenvio')
        fetch("https://strapi-production-46f3.up.railway.app/api/envios", {
            method: "POST",
            body: JSON.stringify({
                Envio
            }),
            headers: {
                "content-type": "application/json"
            }, 
        }).catch((e) => console.log(e));
    }

    const createUser = () => {
        console.log('debes crear un usuario nuevo')
    }






    // const { nombre,apellido,rut,telefono} = values;

    // const handleInputChange = (e) => {
    //     const {name, value} = e.target;
    //     setValues({...values, [name]: value})
    // }



    const [cliente, setCliente] = useState(
        {
            data: {
                nombre: inputNameUser,
                apellido: inputLastNameUser,
                mail:inputMailUser,
                rut:'155881151-1',
                telefono:inputTelefonoUser
            }
        }
    )

    const handleSubmitCliente = async e => {

        console.log('handleSubmitCliente')

        e.prevent.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({cliente});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://strapi-production-46f3.up.railway.app/api/clientes", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    }


    return (
        <form onSubmit={handleSubmitCliente}>

                        <div className='mb-4'>
                            <label htmlFor="inputemail" className="label-input">Email</label>
                            <div className="relative mb-1">
                                <input
                                id="inputemail"
                                type="text"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Tu email"
                                value={inputMailUser} 
                                readOnly
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="inputNombre" className="label-input">Nombre</label>
                            <div className="relative mb-1">
                                <input
                                type="text"
                                id="inputNombre"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Nombre"
                                value={inputNameUser} onChange={(e) =>handleChangeInputName(e)} 
                                required
                                />
                                {/* Aqui va el icono */}
                            </div>
                            <span className='errormsg'>{inputErrorNombre != 'OK' && inputErrorNombre}</span>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="inputApellido" className="label-input">Apellido</label>
                            <div className="relative mb-1">
                                <input
                                type="text"
                                id="inputApellido"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Apellido"
                                value={inputLastNameUser} onChange={(e) => handleChangeInputLastName(e) } 
                                required
                                />
                                {/* Aqui va el icono */}
                            </div>
                            <span className='errormsg'>{inputErrorApellido != 'OK' && inputErrorApellido}</span>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="inputTelefono" className="label-input">Telefono de contácto (Ej: 569...)</label>
                            <div className="relative mb-1">
                                <input
                                type="text"
                                id="inputTelefono"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="569..."
                                value={inputTelefonoUser} onChange={(e) =>handleChangeInputTelefono(e)} 
                                required
                                />
                                {/* Aqui va el icono */}
                            </div>
                            <span className='errormsg'>{inputErrorTelefono != 'OK' && inputErrorTelefono}</span>
                        </div>

                        

                      

                       

                        
                            {success ?
                                <div className='mb-4'>
                                    {success}
                                </div>
                             : null}
                        
                        

                            <div className="flex items-end justify-between">
                                { inputErrorApellido == 'OK' && inputErrorTelefono == 'OK' ?

                                    <button
                                    className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                                    onClick={(e) => handleSubmitCliente(e)}
                                    >
                                    Ir a pagar ...
                                    </button>

                                    : 

                                    <button type='submit'
                                    className="inline-block rounded-lg bg-gray-500 px-5 py-3 text-sm font-medium text-white"
                                    >
                                    Continuar ...
                                    </button>
                                
                                }
                                
                            </div>

                        </form>
    );
}

export default formNuevoComprador;