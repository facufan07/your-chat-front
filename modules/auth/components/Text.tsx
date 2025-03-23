export default function Text() {
    return (
        <div className="flex flex-col max-sm:items-center sm:gap-5 w-[76%] max-sm:w-full max-sm:mb-7" >

            <h1 className="text-white text-5xl tracking-widest font-semibold max-lg:text-2xl"
            >
                Welcome
            </h1>
            <p className="text-white text-2xl tracking-widest font-semibold mt-8 max-lg:text-xs 
                            max-sm:text-center">
                If you feel lost, maybe you need to talk to yourself.
            </p>
            <p className="text-white text-2xl tracking-widest font-semibold mt-6 max-lg:text-xs
                            max-sm:text-center">
                Try to find yourself in this application!
            </p>
        </div>
    )
}