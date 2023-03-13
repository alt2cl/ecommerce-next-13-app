
function MainLayout({maincontent, sidecontent}) {
    return (
        <div className='container px-4'>
            <main className='grid lg:grid-cols-12 lg:gap-12'>
                {maincontent}
            </main>
            <aside className="col-span-12 md:col-span-3">
                {sidecontent}
            </aside>
            
        </div>
    );
}

export default MainLayout;