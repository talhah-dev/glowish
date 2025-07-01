import {
  House,
  Flame,
  Lightbulb,
  Clapperboard,
  Settings,
  Award,
  Siren,
  UsersRound,
  CircleAlert,
  Phone,
  Heart,
  Mail,
  LogIn,
  UserPlus,
} from "lucide-react";

const sidebarData = () => {
  return [
    {
      title: "Main",
      items: [
        { id: 1, label: "Home", link: "/", icon: <House size={20} /> },
        {
          id: 2,
          label: "Politics",
          icon: <Siren size={20} />,
          subItems: [
            { key: 61, subLabel: "Election", link: "/politics/election" },
            { key: 62, subLabel: "Political Party", link: "/politics/political-party" },
            { key: 63, subLabel: "Politicians", link: "/politics/politicians" },
            { key: 64, subLabel: "State Politics", link: "/politics/state-politics" },
          ],
        },
        // {
        //   id: 2,
        //   label: "Popular",
        //   link: "/popular",
        //   icon: <Flame size={20} />,
        // },
        // {
        //   id: 3,
        //   label: "Technology",
        //   icon: <Lightbulb size={20} />,
        //   subItems: [
        //     { key: 31, subLabel: "Robotics", link: "/technology/robotics" },
        //     { key: 32, subLabel: "Cyber Security", link: "/technology/cyber-security" },
        //     { key: 33, subLabel: "Databases", link: "/technology/databases" },
        //     { key: 34, subLabel: "Electronics", link: "/technology/electronics" },
        //   ],
        // },
        {
          id: 3,
          label: "Technology",
          link: "#",
          icon: <Lightbulb size={20} />,
        },
        // {
        //   id: 4,
        //   label: "Movies",
        //   icon: <Clapperboard size={20} />,
        //   subItems: [
        //     { key: 41, subLabel: "Hollywood", link: "/movies/hollywood" },
        //     { key: 42, subLabel: "Web Series", link: "/movies/web-series" },
        //     { key: 43, subLabel: "Romance", link: "/movies/romance" },
        //     { key: 44, subLabel: "Horror", link: "/movies/horror" },
        //     { key: 45, subLabel: "Actions", link: "/movies/actions" },
        //   ],
        // },
        // {
        //   id: 4,
        //   label: "Sports",
        //   icon: <Award size={20} />,
        //   subItems: [
        //     { key: 51, subLabel: "Cricket", link: "/sports/cricket" },
        //     { key: 52, subLabel: "Soccer", link: "/sports/soccer" },
        //     { key: 53, subLabel: "Volleyball", link: "/sports/volleyball" },
        //     { key: 54, subLabel: "Tennis", link: "/sports/tennis" },
        //   ],
        // },
        {
          id: 4,
          label: "Sports",
          link: "#",
          icon: <Award size={20} />,
        },
       
      ],
    },
    {
      title: "Resources",
      items: [
        // {
        //   id: 7,
        //   label: "Authors",
        //   link: "/authors",
        //   icon: <UsersRound size={20} />,
        // },
        {
          id: 5,
          label: "About Us",
          link: "/about",
          icon: <CircleAlert size={20} />,
        },
        {
          id: 6,
          label: "Contact Us",
          link: "/contact",
          icon: <Phone size={20} />,
        },
        {
          id: 7,
          label: "Settings",
          link: "/profile-edit",
          icon: <Settings size={20} />,
        },
        {
          id: 8,
          label: "Donate",
          link: "#",
          icon: <Heart size={20} />,
        },
        {
          id: 9,
          label: "Subscribe",
          link: "#",
          icon: <Mail size={20} />,
        },
        {
          id: 10,
          label: "Login",
          link: "/login",
          icon: <LogIn size={20} />,
        },
        {
          id: 11,
          label: "Register",
          link: "/register",
          icon: <UserPlus size={20} />,
        },
      ],
    },
  ];
};

export default sidebarData;
