
function userRegister(props) {
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-lg text-center">
                            <h1 className="text-2xl font-bold sm:text-3xl">No estas en nuestros registros</h1>

                            <p className="mt-4 text-gray-500">
                            Ingresa tu nombre y mail y continuemos...
                            </p>
                        </div>

                        <div className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>

                                <div className="relative">
                                    <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter email"
                                    value={inputMailUser} onChange={(e) => handleChangeInputMail(e) } 
                                    
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

                        

                            <div className="flex items-end justify-between">
                                <button
                                    className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                                    onClick={fetchData}
                                >
                                    Validar
                                </button>
                            </div>
                        </div>
                    </div>
    );
}

export default userRegister;