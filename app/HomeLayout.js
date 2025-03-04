import RightSideBar from "./components/RightSideBar";
import Sidebar from "./components/Sidebar";

export default function HomeLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full xl:w-[calc(100%-250px)] xl:ms-[250px] p-5">
        <main className="flex-grow">
          <div className="flex justify-center">
            <div className="lg:max-w-[710px] max-w-full w-full 2xl:me-[60px] lg:me-[30px]">
              {children}
            </div>
            <RightSideBar />
          </div>
        </main>
      </div>
    </div>
  );
}
