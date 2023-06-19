import React, {useState} from "react";
import logo from "./logo.svg";
import {Button, DatePicker} from "antd";
import "./App.css";
import {typeProduct} from "src/types/product";

function FilterableProductTable({products}: { products: Array<typeProduct> }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [postsData, setPostsData] = useState("");

  return (
    <div>
      <ButtonGetData
        postsData={postsData}
        clickEvent={setPostsData}
      />
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
      <ListPosts
        postsData={postsData}
      />
    </div>
  );
}

function ProductCategoryRow({category}: { category: string }): JSX.Element {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

function ProductRow({product}: { product: typeProduct }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{color: "red"}}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({products, filterText, inStockOnly}: {
  products: Array<typeProduct>,
  filterText: string,
  inStockOnly: boolean
}) {
  console.log("logProductTable");
  const rows: Array<JSX.Element> = [];
  let lastCategory: string | null = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({inStockOnly, onFilterTextChange, onInStockOnlyChange, filterText}: {
  inStockOnly: boolean,
  onFilterTextChange: (text: string) => void,
  onInStockOnlyChange: (checked: boolean) => void,
  filterText: string
}): JSX.Element {
  console.log("logSearchBar");
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

function ButtonGetData({clickEvent, postsData}: {
  clickEvent: (text: string) => void,
  postsData: string
}): JSX.Element {
  console.log("logButtonGetData");
  return (
    <div>
      <input
        value={postsData}
        onChange={(e) => clickEvent(e.target.value)}
      />
      <Button
        type="primary"
        onClick={
          () => {
            fetch("http://10.11.12.18:5231/GetPosts",
              {
                method: "Post",
                headers: new Headers({
                  "Content-Type": "application/json"
                }),
                body: JSON.stringify({"skip": "0"})
              })
              .then((response) => response.json())
              .then((json) => {
                json.map((m: { content: string; }) => {
                });
                clickEvent(json[0].content);
              });
          }
        }
      >
        Primary Button
      </Button>
    </div>
  );
}

function ListPosts({postsData}: {
  postsData: string
}): JSX.Element {
  console.log("logListPosts");
  return (
    <li>{postsData}</li>
  );
}

const PRODUCTS: Array<typeProduct> = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"},
];

function App(): JSX.Element {
  return (
    <div className="App">
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}

export default App;
