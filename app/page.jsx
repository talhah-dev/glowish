import TabsView from "./components/TabsView";
import PostCard from "./components/PostCard";
import HomeLayout from "./HomeLayout";
import forYou from "./mock/forYou.json";
import following from "./mock/following.json";
import recommended from "./mock/recommended.json";
import Survey from "./components/survey";

export const metadata = {
  title: "Glowist - Home",
};

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
  }
];

export default function Home() {
  const isLoggedIn = true;
  return (
    <HomeLayout>
      {isLoggedIn ? <TabsView tabs={tabs} /> : <PostCard data={forYou} />}
    </HomeLayout>
  );
}
