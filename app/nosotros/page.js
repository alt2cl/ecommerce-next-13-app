import Image from "next/image";
const fetchNosotros = () => {
    return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/guitarras?populate=imagen`)
    .then(res => res.json())
}

export default async function NosotrosPage(props) {

    const content = await fetchNosotros()

    return (
        <div className="container px-4 pt-9">
            <main className="mb-8">
                
                <section className="pb-8">
                    <div>
                        <h2 className=" text-4xl font-semibold text-slate-900 text-center block mb-10">
                            Somos
                        </h2>
                    </div>
                    <div className='grid grid-cols-2 gap-10'>
                            <div>
                                <Image 
                                src="/img/nosotros.jpg" 
                                width={1000} 
                                height={800} 
                                alt="imagen principal"
                                className="rounded"
                                ></Image>
                            </div>
                            <div>
                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a felis sit amet leo faucibus gravida. Vestibulum ullamcorper cursus laoreet. Aliquam non est non leo hendrerit lacinia. Mauris tempor vulputate orci ut tincidunt. Duis porta, dui malesuada rutrum vehicula, dolor massa finibus augue, quis interdum lacus dolor vitae velit. Cras vestibulum fringilla dolor malesuada tristique. Suspendisse sed gravida odio, et malesuada nulla. Etiam vitae ligula auctor lectus dignissim sollicitudin. Phasellus vitae elementum enim, eu semper tellus. Aliquam vestibulum enim ut mi vulputate, rhoncus convallis massa tincidunt. Integer vulputate ligula odio, efficitur ullamcorper dui ullamcorper quis. Quisque convallis metus at felis sodales convallis. In dictum felis ut risus viverra, nec pellentesque felis scelerisque. Phasellus pretium eget augue vel porttitor. Integer placerat arcu in rutrum pretium.
                                </p>
                                <p>
                                Praesent aliquam dui in sem suscipit auctor. Aliquam lobortis ut urna vel cursus. Nam egestas turpis sed massa feugiat blandit. Duis scelerisque non tortor id molestie. Cras aliquam hendrerit erat, cursus gravida mauris rutrum nec. Nulla posuere malesuada tortor, sit amet lobortis quam iaculis sit amet. Duis tincidunt odio tristique risus tincidunt condimentum. Vivamus facilisis felis vel mi molestie, vitae rhoncus sapien dapibus. Suspendisse dictum est a ligula ultricies tristique. Pellentesque eu dui et lectus dictum hendrerit. Donec efficitur tincidunt odio, vel auctor orci malesuada at. Vestibulum pulvinar placerat massa, sollicitudin porttitor lectus pharetra vel.
                                </p>
                            </div>
                    </div>
                </section>
                    
                
            </main>
          

       
       
    </div>
    );
}

