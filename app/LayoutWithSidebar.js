import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar";

export default function LayoutWithSidebar({ children }) {
  return (
    <div className="flex">
      <ToastContainer />
      <Sidebar />
      <div className="w-full xl:w-[calc(100%-250px)] xl:ms-[250px] p-5">
        <main className="flex-grow">
          <div className="flex justify-center">
            <div className="max-w-[1130px] w-full mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
