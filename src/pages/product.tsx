import { useParams } from "react-router-dom";
import axios from "axios";
import { Api, useScrollToTop } from "./content";
import { Grid, Image, Rating, Divider } from "@mantine/core";
import { Button } from "@mantine/core";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartslice";
import { showNotification } from "@mantine/notifications";
import useSWR from "swr";

const { format } = require("number-currency-format");

export default function Product() {
  const param = useParams();

  const dispatch = useDispatch();
  const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };
  const { data: apiData, error } = useSWR<Api[]>("/api/products.json", fetcher);

  useScrollToTop();

  if (error) return <div>failed to load</div>;

  return (
    <div>
       
      <Helmet>
                        
        <meta charSet="utf-8" />
                        
        <title>
          {apiData
            ? apiData
                .filter(
                  (element, index) => index + 1 === Number(param.productid)
                )
                .map((element) => element.name)
                .toString()
            : "Product Page"}
        </title>
                    
      </Helmet>
      {apiData
        ? apiData
            .filter((element, index) => index + 1 === Number(param.productid))
            .map((element, index) => (
              <Grid key={element.name + index}>
                <Grid.Col span={12} sm={4}>
                  <Image src={element.url} withPlaceholder />
                </Grid.Col>
                <Grid.Col span={12} sm={6}>
                  <h1>{element.name}</h1>
                  <Rating></Rating>
                  <div>
                    {format(element.price, {
                      currency: "$",
                      spacing: false,
                      currencyPosition: "LEFT",
                    })}
                  </div>
                  <Divider />
                  <div>{element.description}</div>
                </Grid.Col>
                <Grid.Col span={12} sm={2}>
                  <div>
                    {format(element.price, {
                      currency: "$",
                      spacing: false,
                      currencyPosition: "LEFT",
                    })}
                  </div>
                  <Button
                    variant="gradient"
                    gradient={{ from: "indigo", to: "cyan" }}
                    onClick={() => {
                      dispatch(addToCart(element));
                      // Cookies.set("cart", JSON.stringify(cartItems));
                      showNotification({
                        id: `${element.name}`,
                        icon: <Image src={element.url} />,
                        title: "Item added Successfully",
                        message: `${element.name} has been added to Cart`,
                        color: "white",
                      });
                    }}
                  >
                    Add to Cart
                  </Button>
                </Grid.Col>
              </Grid>
            ))
        : null}
    </div>
  );
}
