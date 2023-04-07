import { Image, Grid, Center, Loader } from "@mantine/core";
import { motion } from "framer-motion";
import { useEffect } from "react";
import styles from "./content.module.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
// import { LoremIpsum } from "lorem-ipsum";
// import { useAppDispatch } from "../hooks";
// import { addToCart } from "../slices/cartslice";
// import { showNotification } from "@mantine/notifications";
import useSWR from "swr";

// const lorem = new LoremIpsum({
//   sentencesPerParagraph: {
//     max: 8,
//     min: 4,
//   },
//   wordsPerSentence: {
//     max: 16,
//     min: 4,
//   },
// });

const { format } = require("number-currency-format");

export type Api = {
  name: string;
  url: string;
  price: number;
  description: string;
};

export const useScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
    // scroll to the top of the browser window when changing route
    // the window object is a normal DOM object and is safe to use in React.
  }, [location]);
};

export default function Content() {
  // const dispatch = useAppDispatch();

  useScrollToTop();

  const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };

  const { data: apiData, error } = useSWR<Api[]>("/api/products.json", fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <Center>
       
      <Helmet>
                        
        <meta charSet="utf-8" />
                        <title>Webstore: Get it from the web.</title>
                    
      </Helmet>
      <Grid py={10} gutter={1}>
        {apiData ? (
          apiData.slice(0, 82).map((element, index) => (
            <Grid.Col span={6} md={3} lg={3} key={element.name}>
              <motion.div whileTap={{ scale: 0.5 }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ color: ["red", "blue", "green", "orange"] }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link to={`/product/${index + 1}`} className={styles.link}>
                    <div className={styles.box}>
                      <Image
                        key={element.name}
                        alt={element.name}
                        src={element.url}
                        fit="scale-down"
                        height={200}
                        radius="xs"
                        withPlaceholder
                      ></Image>
                      <Center>
                        {element.name.length < 18
                          ? element.name
                          : element.name.substring(0, 17) + "..."}
                      </Center>
                      <Center className={styles.bold}>
                        {format(element.price, {
                          currency: "$",
                          spacing: false,
                          currencyPosition: "LEFT",
                        })}
                      </Center>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
              {/* <Center>
                  <Button
                    onClick={() => {
                      dispatch(addToCart(element));
                      showNotification({
                        id: `${element.name}`,
                        icon: <Image src={element.url} />,
                        title: "Item added Successfully",
                        message: `${element.name} has been added to Cart`,
                        color: "white",
                      });
                    }}
                    variant="gradient"
                    gradient={{ from: "yellow", to: "orange" }}
                  >
                    Add to Cart
                  </Button>
                </Center> */}
            </Grid.Col>
          ))
        ) : (
          <Loader />
        )}
      </Grid>
    </Center>
  );
}
