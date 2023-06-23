
function Card({children, key}) {
    return (
        <div className='p-5 bg-white shadow-sm rounded-md mb-3' key={key}>
            {children}
        </div>
    );
}

export default Card;