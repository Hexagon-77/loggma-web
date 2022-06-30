const SearchBox = () => (
    <form action="/" method="get">
        <input id="header-search" name="s" placeholder="search for customers" type="text"></input>&emsp;
        <button className="btn btn-primary" type="submit">Search</button>
    </form>
);

export default SearchBox;