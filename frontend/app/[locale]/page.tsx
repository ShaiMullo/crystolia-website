import { getDictionary } from "@/i18n/getDictionary";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Products from "../components/Products";
import About from "../components/About";
import Contact from "../components/Contact";

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const dict = await getDictionary(locale);
  
return (
    <main>
      <Hero dict={dict} />
      <Features dict={dict} />
      <Products dict={dict} />
      <About dict={dict} />
      <Contact dict={dict} />
    </main>
  );
}
