import React from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";

interface PageWrapperProps {
  children: React.ReactNode;
  searchBar?: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = (props: PageWrapperProps) => {
  const { children, searchBar = true } = props;
  return (
    <React.Fragment>
      <div className="w-screen min-h-screen flex flex-col items-center">
        <Header />

        <div className="w-full flex-1 flex">
          {/* <Sidebar /> */}
          <h1 className="hidden">Para onde devo te guiar?</h1>
          <main className="flex-1 py-2 flex flex-col items-center sm:px-10 px-6">
            {
              searchBar && <SearchBar />
            }
            {children}
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PageWrapper;
