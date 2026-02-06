// A higher-order component is a pattern that can be created with the React components
// We can pass the reusable logic as props to the functional components to implement abstraction,
// reusability, and uniformity in the code.

// The principles of OOPS are embedded deep in the programming
// in one way or another using them helps to make the code more readable,
// and less verbose and promotes reusability

// A higher-order component (HOC) is a pattern that emerges in React given its compositional nature
// where we can pass one component to another component as an argument, and this parent
// component (Higher-order) will have certain logic that it will pass down to this received component as props

// For example, if you worked with Redux, you will notice how we use the connect() HOC to
// compose the components with the states and the actions.

const ConnectedUsersList = connect(usersSelector, usersActions)(UsersList);

// Here the connect() method receives two arguments and returns another function that
// accepts the UsersList as arguments forming a composition of components.

// Now in the UsersList, you will receive the states and the actions as props.

// This can be written more discretely as,

// create a connection first
const connectRedux = connect(usersSelector, usersActions);

// then connect the component
const ConnectedUsersListNew = connectRedux(UsersList);

// This helps to abstract all the logic at the single place in the connect() method making it a
// single source of truth and all the components passing through it will receive similar props for
// the same inputs making it a pure higher-order component function.

// We can create a product component that will receive the list of the products as props and will display it.

const ProductsList = ({ data }) => {
  return data.map((e) => (
    <div key={e.id} className="product-item">
      <h2>Item: {e.title}</h2>
    </div>
  ));
};

// Assuming that we have a uniform response for all the API’s for every category, we can create a
// higher-order component that will take the API URL and the products list component input and
// will fetch the data and pass it to the products list to display.

// This is a functional component that will take an argument and return another function from it forming a closure.
// const withFetchData = (Element, url) => {
//   return (props) => {
//     //your logic goes here
//   };
// };

const withFetchData = (Element, url) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
      const makeApiCall = async () => {
        setIsLoading(true);
        try {
          let res = await fetch(url);
          if (res.ok) {
            res = await res.json();
            setData(res);
          } else {
            setError(true);
          }
        } catch (e) {
          setError(true);
        } finally {
          setIsLoading(false);
        }
      };

      makeApiCall();
    }, []);

    if (isLoading) {
      return <div>....Loading</div>;
    }

    if (error) {
      return <div>Something went wrong!...</div>;
    }

    return <Element data={data} {...props} />;
  };
};

// Note - Here we have added additional check to throw error if we did not receive 200
// in the response status code as fetch does not throws error on 4XX.

function App() {
  const Todos = withFetchData(
    ProductsList,
    "https://jsonplaceholder.typicode.com/todos",
  );

  return (
    <div className="App">
      <Todos />
    </div>
  );
}

// OR

// TodosProductList
withFetchData(ProductsList, "https://jsonplaceholder.typicode.com/todos");

export default function App2() {
  return (
    <div className="App">
      <TodosProductList />
    </div>
  );
}

// With this we can define the reusable logic multiple times.

// products.jsx
const Todos = withFetchData(
  ProductsList,
  "https://jsonplaceholder.typicode.com/todos",
);

const Photos = withFetchData(
  ProductsList,
  "https://jsonplaceholder.typicode.com/photos",
);

const Albums = withFetchData(
  ProductsList,
  "https://jsonplaceholder.typicode.com/albums",
);

export { Todos, Photos, Albums };

// The good thing about the HOC’s are that we can compose multiple HOCs together.
// For example, let's say we have another HOC that helps to style the product list as a card.
// We will create another HOC function withStyles() that will handle all the styles logic.

// hoc.js
const withStyles = (Element) => {
  return (props) => {
    const cardStyle = { flex: "1 33%" };
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Element style={cardStyle} {...props} />
      </div>
    );
  };
};

// This will display the items in a 3 column layout, we have to pass the style prop to the product
// items and then compose the HOC’s to make it work.

const ProductsList2 = ({ data, style }) => {
  return data.map((e) => (
    <div key={e.id} className="product-item" style={style}>
      <h2>Item: {e.title}</h2>
    </div>
  ));
};

const Todos2 = withFetchData(
  withStyles(ProductsList),
  "https://jsonplaceholder.typicode.com/todos",
);

const Photos2 = withFetchData(
  withStyles(ProductsList),
  "https://jsonplaceholder.typicode.com/photos",
);

const Albums2 = withFetchData(
  withStyles(ProductsList),
  "https://jsonplaceholder.typicode.com/albums",
);

// Advantages of using Higher-order components in React
// Reusability - Same logic can be reused for multiple components.
// Uniformity - Components can be used for a single purpose making them easy to manage.
// Abstraction - Single source of truth, helps to trace errors.

// Disadvantages of using Higher-order components in React
// Too much nesting - Composing the components with the multiple HOC’s increases the nesting.
// Performance issues - Props drill down makes unnecessary re-renders even though the middle
// components may not be utilizing the props.
