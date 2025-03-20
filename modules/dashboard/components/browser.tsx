import Image from 'next/image'

export default function Browser() {
    return(
        <div className='flex items-center justify-center my-10'>
            <input 
            type="text" 
            placeholder="Find a chat..."
            className='placeholder-white text-white bg-[#484848]/76 px-4 py-3 
                        rounded-l-2xl tracking-widest text-xl outline-none'
            />
            <button className='bg-white/10 h-full px-3 rounded-r-2xl cursor-pointer flex
                                items-center justify-center py-1'
            title='Search'
            >
                <Image 
                src="/Search.png" 
                alt="logo" 
                width={35}
                height={10}
                className="hover:scale-90 transition-all duration-200"
                />
            </button>
        </div>
    )
}