// Props drill down is the most expensive way to pass data around the children in Reactjs
// also the cause for many bugs, from parent to children to grandchildren, every time the props are passed
// it has to be manually written in the child component's code for which props has to be passed down further

const Parent = () => {
  const topic = { title: "Tech", articles: [{ title: "web3", content: "" }] };
  return <Child topic={topic} />;
};

const Child = ({ topic }) => {
  return (
    <div>
      <Header title={topic.title} />
      <Main articles={topic.articles} />
    </div>
  );
};

const Header = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};

const Main = ({ articles }) => {
  return (
    <section className="articles">
      {articles.map((e) => (
        <article key={e.id}>
          <h1>{e.title}</h1>
          <p>{e.content}</p>
        </article>
      ))}
    </section>
  );
};

// In this example, the props have to go through each child and be passed down further to get accessed
// There will be many cases where many of the children do not even need to make use of the props
// but grandchildren thus, so they have to accept and pass them down

// These props drill down results in unnecessary re-renders impacting the performance of the applications

// We can avoid the props drill down by implementing the provider design pattern
// in Reactjs with the help of context API

// React provides context API, using which a new context can be created and this context can be accessed
// in any child of the component that is wrapped in its provider.

const FeatureContext = React.createContext();

function App() {
  const features = {};

  return (
    <div>
      <FeatureContext.Provider value={features}>
        <Main />
        <SideBar />
      </FeatureContext.Provider>
    </div>
  );
}

// This way only the components that need the props can access it and
// other components don't have to worry about the props any more.

const Main2 = () => {
  const { features } = React.useContext(FeatureContext);
  return features.isGooglePayEnabled ? <GooglePay /> : <ApplePay />;
};

// One of the most important use cases of provider design pattern is implementing the feature flag
// Feature flag allows to make use of the features only if they are available.
// We can create a feature flag provider and in all those components where features are supposed to be used, we can access it

export const FeatureFlag = React.createContext({});

export const FeatureFlagProvider = ({ children }) => {
  const [features, setFeatures] = useState({
    darkMode: true,
    chatEnabled: false,
  });

  useEffect(() => {
    // make api call to get features list
    // and update the state on mount
  }, []);

  return (
    <FeatureFlag.Provider value={{ features }}>{children}</FeatureFlag.Provider>
  );
};

const ChatWrapper = () => {
  const { features } = React.useContext(FeatureFlag);
  return features.isChatEnabled ? <Chat /> : null;
};

const App = () => {
  return (
    <FeatureFlagProvider>
      <ChatWrapper />
    </FeatureFlagProvider>
  );
};

// This helps in doing the A/B testing and enabling and
// disabling features on demand externally without making any code changes.

// Though react provides many different libraries for global state management using hooks
// like Zustand using which we can avoid the props drill dow
// They are suitable for large codebases, for smaller ones you can still stick with the context API.

// Provider pattern is very powerful but it should be used wisely as if the data changes,
// all the component that is accessing the context will re-render.

// Thus it is better to normalize the data and
// split them in different providers as per the logic to enhance the performance.
