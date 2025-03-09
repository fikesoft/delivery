import { useEffect, useState } from "react";
import { readPizza } from "../../../api/adminApi";
import Pizza from "../../../components/pizza/Pizza";
import Pagination from "../../../components/pagination/Pagination";

const ReadPizza = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4; // Number of items per page

  const fetchData = async (page: number) => {
    try {
      const response = await readPizza(page, limit); // Pass page and limit
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
  }, [currentPage]); // Fetch data when page changes

  return (
    <div className="show-pizza">
      <div className="pizzas">
        {data.length > 0 ? (
          data.map((pizza) => (
            <Pizza 
              name={pizza.name}
              category={pizza.category}
              ingredients={pizza.ingredients}
              basePrice={parseInt(pizza.basePrice)}
              pizzaDough={pizza.pizzaDough}
              pizzaSize={pizza.pizzaSize}
              img={pizza.img}
              buttonDisabled={true}
              _id={pizza._id}
            />    
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Pagination Controls */}
      <Pagination  totalPages={totalPages}  currentPage={currentPage} onPageChange={setCurrentPage}/>
    </div>
  );
};

export default ReadPizza;
