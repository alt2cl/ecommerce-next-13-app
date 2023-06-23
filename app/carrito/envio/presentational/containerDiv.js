
function containerDiv({children, msj, title}) {
    return (
        <div className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            {title && <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
                </div>
            }
            <p className="mt-4 text-gray-500">{msj}</p>
            <div>
            {children}
            </div>
            
        </div>
    );
}

export default containerDiv;