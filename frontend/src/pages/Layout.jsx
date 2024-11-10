import { Outlet } from "react-router-dom";

// Root layout to reduce boilerplate code

const Layout = () => {
  return (
    <main className="container mx-auto p-4">
      <section className="flex flex-col justify-center items-center min-h-screen ">
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
