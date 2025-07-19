"use client";
import { useEffect, useState } from "react";
import TabsView from "./components/TabsView";
import PostCard from "./components/PostCard";
import HomeLayout from "./HomeLayout";
import forYou from "./mock/forYou.json";
import Survey from "./components/survey";
import { ArrowUp } from "lucide-react";

// export const metadata = {
//   title: "Glowist - Home",
// };

let tabs = [
  {
    id: "news",
    label: "News",
    content: <PostCard data={forYou} />,
  },
  {
    id: "surveys",
    label: "Surveys",
    content: <Survey />,
  },
];

export default function Home() {
  const isLoggedIn = true;
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100); // show after 100px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <HomeLayout>
      {isLoggedIn ? <TabsView tabs={tabs} /> : <PostCard data={forYou} />}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 md:p-2.5 p-2 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </HomeLayout>
  );
}
