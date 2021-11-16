import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

const Test: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
};

export default Test;

const Example = () => {
  const { data, status } = useQuery("repoData", () => fetch("https://api.github.com/repos/tannerlinsley/react-query").then((res) => res.json()));
  console.log(data);
  // if (isLoading) return "Loading...";

  // if (error) return "An error has occurred: " + error.message;

  if (status !== "success") {
    return <div></div>;
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>
      <strong>✨ {data.stargazers_count}</strong>
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
};
