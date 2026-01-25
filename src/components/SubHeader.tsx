export default function SubHeader(){
    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors flex flex-col justify-center items-center py-8">           
            <h1 className="text-xl md:text-4xl font-bold mb-2">CA MONK
                <span className="text-indigo-600"> Blog</span>
            </h1>
            <div className="text-sm md:text-base text-gray-400 max-w-xs md:max-w-md text-center">
                Stay updated with the latest trends in finance, accounting and career growth
            </div>
        </header>
    );
}