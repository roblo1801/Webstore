import "./App.css";
import {
  Center,
  AppShell,
  Header,
  Image,
  Text,
  Group,
  Box,
  Indicator,
} from "@mantine/core";
import Content from "./pages/content";
import { AnimateKeyframes } from "react-simple-animate";
import { Routes, Route, Outlet, BrowserRouter, Link } from "react-router-dom";
import Product from "./pages/product";
import { motion } from "framer-motion";
import ErrorNotFound from "./pages/error404";
import Cart from "./pages/cart";
import { useAppDispatch, useAppSelector } from "./hooks";
import { initializeCart } from "./slices/cartslice";
import { useLayoutEffect } from "react";
import CheckoutPage from "./pages/checkout";

export default function App() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  useLayoutEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div>
        <AppShell
          header={
            <Header height={{ base: 50, md: 70 }} p={0}>
              <AnimateKeyframes
                play={true}
                duration={5}
                delay={0}
                iterationCount="infinite"
                direction="alternate"
                keyframes={[
                  "background-color: #264653;",
                  "background-color: #2a9d8f",
                  "background-color: #e9c46a",
                  "background-color: #f4a261",
                  "background-color: #e76f51",
                ]}
                easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
              >
                <Group
                  position="center"
                  mih={70}
                  className="logo"
                  style={{ height: "100%" }}
                >
                  <motion.div
                    animate={{ scale: [0.1, 1] }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to="/">
                      <Text size={45} ff={"VT323"}>
                        {/* <Image
            height={50}
            fit="contain"
            src="../images/logo/logo.png"
            ></Image> */}
                        TOY HAVEN
                      </Text>
                    </Link>
                  </motion.div>
                </Group>
                <Box pos={"fixed"} right={0} top={0}>
                  <Link to="/cart">
                    <Indicator
                      color="green"
                      position="bottom-start"
                      offset={14}
                      disabled={cartItems.length < 1}
                      size={30}
                      processing
                      label={<Text c="black">{cartItems.length}</Text>}
                      bottom={0}
                      left={0}
                    >
                      <Image
                        fit="contain"
                        alt="Cart"
                        height={70}
                        src="/cart.png"
                      />
                    </Indicator>
                  </Link>
                </Box>
              </AnimateKeyframes>
            </Header>
          }
        >
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/product/:productid" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<ErrorNotFound />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>

          <Center>
            <Outlet />
          </Center>
        </AppShell>
        <AnimateKeyframes
          play={true}
          duration={5}
          delay={0}
          iterationCount="infinite"
          direction="alternate"
          keyframes={[
            "background-color: #264653;",
            "background-color: #2a9d8f",
            "background-color: #e9c46a",
            "background-color: #f4a261",
            "background-color: #e76f51",
          ]}
          easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
        >
          <div style={{ height: "60px" }}>Application footer</div>
        </AnimateKeyframes>
      </div>
    </BrowserRouter>
  );
}
