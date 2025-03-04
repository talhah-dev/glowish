import Footer from "../components/Footer";

export default function LayoutWithFooter({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
