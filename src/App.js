import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "./App.css";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

function App() {
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState([]);

  const handleSelect = (e) => {
    fetch("http://127.0.0.1:5000/get_data?query=" + e, {
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => setResults(data));
    setSearched(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2 style={{ marginTop: "1%" }}>Recipe DB</h2>
        <h4 style={{ marginTop: "2%" }}>
          Tap the dropdown button to get results for queries
        </h4>
        <DropdownButton
          id="dropdown-menu-align-responsive-1"
          title="Select any query"
          onSelect={handleSelect}
          align={{ lg: "center" }}
          style={{ marginTop: "1rem" }}
          size="lg"
        >
          <Dropdown.Item eventKey="recipe_sugar">
            Get Recipe Containing Highest Sugar
          </Dropdown.Item>
          <Dropdown.Item eventKey="low_calorie_meal">
            Get Top 10 Low Calorie Meals
          </Dropdown.Item>
          <Dropdown.Item eventKey="common_macro_nutrient">
            Get Most Common Macro Nutrient Found In All Ingredients
          </Dropdown.Item>
          <Dropdown.Item eventKey="quickest_breakfasts">
            Get Top 5 Quick Breakfasts
          </Dropdown.Item>
          <Dropdown.Item eventKey="recipe_least_ingredients">
            Retreiving a recipe with Least Number of Ingredients
          </Dropdown.Item>
          <Dropdown.Item eventKey="customer_non_veg">
            Get All Customers that dont eat Non-Veg
          </Dropdown.Item>
          <Dropdown.Item eventKey="recipe_highest_servings">
            Get 5 Recipes Full Meal Recipes with Highest Servings
          </Dropdown.Item>
          <Dropdown.Item eventKey="chicken_recipes">
            Get All Chicken Recipes
          </Dropdown.Item>
        </DropdownButton>

        <br></br>

        {results.length > 0 ? (
          <div>
            <center>
              <Accordion style={{ marginTop: "1rem", width: "80%" }} alwaysOpen>
                <Accordion.Item eventKey="0" style={{ width: "80%" }}>
                  <Accordion.Header
                    style={{ color: "black", fontSize: "14px" }}
                  >
                    SQL Query
                  </Accordion.Header>
                  <Accordion.Body
                    style={{ color: "black", fontSize: "16px", width: "90%" }}
                  >
                    {results[0].param3}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </center>
            {results.map((data) => (
              <div>
                <center>
                  <Card
                    style={{
                      marginTop: "1rem",
                      marginLeft: "10rem",
                      marginRight: "10rem",
                      marginBottom: "10px",
                      width: "50%",
                    }}
                  >
                    <Card.Header style={{ color: "black", fontSize: "18px" }}>
                      {data.param1}
                    </Card.Header>
                    <Card.Body>
                      <Card.Text style={{ color: "black", fontSize: "16px" }}>
                        {data.param2}
                      </Card.Text>
                      {}
                      <Button variant="primary" href={data.param4}>Go to Recipe Link</Button>
                    </Card.Body>
                  </Card>
                </center>
              </div>
            ))}
          </div>
        ) : searched ? (
          <div>
            <h5>No Results Found</h5>
          </div>
        ) : (
          <div></div>
        )}
      </header>
    </div>
  );
}

export default App;
