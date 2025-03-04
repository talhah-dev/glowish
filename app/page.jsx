import TabsView from "./components/TabsView";
import PostCard from "./components/PostCard";
import HomeLayout from "./HomeLayout";
import forYou from "./mock/forYou.json";
import following from "./mock/following.json";
import recommended from "./mock/recommended.json";

export const metadata = {
  title: "Glowist - Home",
};

let tabs = [
  {
    id: "for-you",
    label: "For you",
    content: <PostCard data={forYou} />,
  },
  {
    id: "following",
    label: "Following",
    content: <PostCard data={following} />,
  },
  {
    id: "recommended",
    label: "Recommended",
    content: <PostCard data={recommended} />,
  },
];

export default function Home() {
  const isLoggedIn = true;
  return (
    <HomeLayout>
      {isLoggedIn ? <TabsView tabs={tabs} /> : <PostCard data={forYou} />}
    </HomeLayout>
  );
}
