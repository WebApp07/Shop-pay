import Header from "../components/header";
import styles from "../styles/Home.module.scss";
import Footer from "../components/footer";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "../components/home/main";
import FlashDeals from "../components/home/flashDeals";
import Category from "../components/home/category";
import { women_accessories, women_dresses, women_shoes } from "../data/home";
import { useMediaQuery } from "react-responsive";

export default function Home({ country, currency }) {
  const { data: session } = useSession();
  //console.log(session);

  //console.log("Country:", country);
  //console.log("currency", currency);
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });

  return (
    <>
      <Header country={country} currency={currency} session={session} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category
              header="Dresses"
              products={women_dresses}
              background="#5a31f4"
            />

            {!isMedium && (
              <Category
                header="Shoses/ High Heels"
                products={women_shoes}
                background="#3c811f"
              />
            )}

            {isMobile && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}

            <Category
              header="Accessories"
              products={women_accessories}
              background="#000"
            />
          </div>
        </div>
      </div>

      <Footer country={country} currency={currency} />
    </>
  );
}

export async function getServerSideProps() {
  let data = await axios
    .get(
      "https://api.ipregistry.co/66.165.2.7?key=ira_Q2qx7fq6i5zv9a0kAE4JoEfHkJd4No0Klibp"
    )
    .then((res) => {
      const country = res.data.location.country || {};
      const currency = res.data.currency || {};
      return { country, currency };
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      country: {
        name: data?.country?.name || "Unknown",
        flag: data?.country?.flag?.emojitwo || "🏳️", // safe access
      },
      currency: {
        code: data?.currency?.code || "USD",
        symbol: data?.currency?.symbol || "$",
        name: data?.currency?.name || "US Dollar",
      },
    },
  };
}
