import { useEffect, useState } from "react";
import { readPizza } from "../../api/adminApi";
import Pizza from "../../components/pizza/Pizza";
import Pagination from "../../components/pagination/Pagination";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";

const Home = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("None");
  const [sortBy, setSortBy] = useState(false);
  const limit = 4;

  const categories = ["Vegan", "Non-gluten", "Meat", "Cheese", "Vegetarian", "Seafood"];

  const fetchData = async (page: number) => {
    try {
      const response = await readPizza(page, limit);
      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      } else {
        console.error("Error: Data is not an array", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <div className="home">
      <div className="filter">
        {/* Categorías */}
        <div className="categories-container">
          <button 
            onClick={() => setSelectedCategory("All")}
            className={`category ${selectedCategory === "All" ? "active" : ""}`}
          >
            All
          </button>
          <ul className="categories">
            {categories.map((category) => (
              <li
                key={category}
                className={`category ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Ordenar */}
        <div className="sort">
          <div
            className="sort-by"
            onClick={() => setSortBy(!sortBy)}
            role="button"
            tabIndex={0}
          >
            {sortBy ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
            <p>Sort by <span>{selectedSort}</span></p>
          </div>

          {sortBy && (
            <div className="sort-options">
              <p onClick={() => { setSelectedSort("price"); setSortBy(false); }}>By price</p>
              <p onClick={() => { setSelectedSort("alphabet"); setSortBy(false); }}>By alphabet</p>
            </div>
          )}
        </div>
      </div>

      {/* Contenedor de pizzas */}
      <div className="pizza-container">
        <h1>All pizza</h1>
        <div className="pizzas">
          {data.length > 0 ? (
            data.map((pizza) => (
              <Pizza
                key={pizza._id}
                name={pizza.name}
                category={pizza.category}
                ingredients={pizza.ingredients}
                basePrice={parseInt(pizza.basePrice)}
                pizzaDough={pizza.pizzaDough}
                pizzaSize={pizza.pizzaSize}
                img={pizza.img}
                buttonDisabled={false}
                _id={pizza._id}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      {/* Paginación */}
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
};

export default Home;
