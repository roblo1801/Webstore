import { Button, Center, Divider, Grid, Image, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeFromCart } from "../slices/cartslice";

const { format } = require("number-currency-format");

export default function Cart() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);
  const tax = total * 0.07;
  const subtotal = total + tax;

  return (
    <Grid py={10} m={0}>
      <Grid.Col span={12} sm={8} md={8} lg={8}>
        {cartItems.length > 0 ? (
          cartItems.map((element, index) => (
            <Grid
              m="xs"
              style={{ border: "1px solid grey" }}
              columns={5}
              key={element.name + String(index)}
            >
              <Grid.Col span={1}>
                <Image src={element.url} />
              </Grid.Col>
              <Grid.Col span={3}>
                <div>
                  <h3>{element.name}</h3>
                </div>
                <div>
                  <Button
                    onClick={() => {
                      dispatch(removeFromCart(index));
                    }}
                    leftIcon={"❌"}
                    variant="filled"
                    color={"red"}
                  >
                    Remove Item
                  </Button>
                </div>
              </Grid.Col>
              <Grid.Col span={1}>
                <Center>
                  {format(element.price, {
                    currency: "$",
                    spacing: false,
                    currencyPosition: "LEFT",
                  })}
                </Center>
              </Grid.Col>
            </Grid>
          ))
        ) : (
          <Text size={20} weight={800}>
            Your Cart is Empty
          </Text>
        )}
      </Grid.Col>
      <Grid.Col span={12} sm={4} md={4} lg={4} ta={"center"}>
        <Text size={20} weight={400}>
          Total ({cartItems.length} items): ${total.toFixed(2)}
        </Text>
        <Text size={20} weight={400}>
          Sales Tax: ${tax.toFixed(2)}
        </Text>
        <Divider my={4} />
        <Text size={20} weight={800}>
          Subtotal: ${subtotal.toFixed(2)}
        </Text>
        <Button component={"a"} href="/checkout">
          Checkout
        </Button>
      </Grid.Col>
    </Grid>
  );
}
