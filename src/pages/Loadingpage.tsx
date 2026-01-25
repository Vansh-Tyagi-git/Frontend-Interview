const Loadingpage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-64 p-4 text-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 md:border-8 md:border-t-8 border-gray-200 h-32 w-32 md:h-64 md:w-64 mb-8"></div>
        <h1 className="text-xl md:text-2xl font-bold mb-2">CA MONK BLOG</h1>
        <div className="text-sm md:text-base text-gray-400 max-w-xs md:max-w-md">Stay updated with the latest trends in finance, accounting and career growth</div>
    </div>
  )
}

export default Loadingpage