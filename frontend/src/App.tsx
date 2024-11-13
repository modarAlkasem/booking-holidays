import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./Layouts/Layout";
import Register from "./pages/Register";
import { AppContextProvider } from "./contexts/AppContext";
import SignIn from "./pages/SignIn";
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <p> Home Page</p>,
        },
        {
          path: "/search",
          element: <p> Search Page</p>,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/sign-in",
          element: <SignIn />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </AppContextProvider>
    </QueryClientProvider>
  );
}

export default App;
