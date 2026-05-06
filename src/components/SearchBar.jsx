export const SearchBar = ({search, setSearch}) => {

    return (
        <div className="border-amber-600">
            <input type="search" className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2" placeholder="Search Products......" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
    )
}