import { Image, Grid, Center, Button} from '@mantine/core';
import { motion } from "framer-motion"
import { useEffect, useState } from 'react';
import styles from "./content.module.css"
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'
import {Helmet} from "react-helmet";
import { LoremIpsum } from "lorem-ipsum";


const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });


const { format } = require('number-currency-format');

export type Api = {

    name: string;
      url: string;
      price: number;
      description: string;
}

export const useScrollToTop = () => {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo({ top: 0 });
      // scroll to the top of the browser window when changing route
      // the window object is a normal DOM object and is safe to use in React.
    }, [location]);
  };

export default function Content(){
    

    useScrollToTop();
    const [apiData, setApiData] = useState<Api[] | null>() ;

    useEffect(() => {
            axios.get("/api/products.json").then((response) =>{
            setApiData(response.data);
        });
        
    }, []);

console.log(apiData)

    return(
<Center>
 <Helmet>
                <meta charSet="utf-8" />
                <title>Webstore: Get it from the web.</title>
            </Helmet>


<Grid
gutter={1}
>
{apiData ? apiData.map((element, index) => 
<Grid.Col 
span={6}
    md={3}
    lg={3}
    key={element.name} >
        <motion.div
whileTap={{scale: 0.5}}>
        <motion.div
initial={{ opacity: 0 }}
whileHover={{ color: ["red", "blue", "green", "orange"]}}
  whileInView={{ opacity: 1 }}
  transition={{delay: 0.3}}
>
    <Link to={`/product/${index + 1}`} className={styles.link} >
        <div className={styles.box} >
    <Image
key={element.name} 
alt={element.name} 
src={`https://picsum.photos/id/${index}/350/200`}
fit="scale-down"
height={200}
radius="xs"
withPlaceholder
></Image>
<Center>{lorem.generateWords(1)[0].toUpperCase() + lorem.generateWords(1).substring(1)}</Center>
<Center className={styles.bold}>{format(Math.floor(Math.random()* 1000), {
currency: '$',
spacing: false,
currencyPosition: 'LEFT'
})}</Center>
</div>
</Link>

</motion.div>
</motion.div>
<Center><Button variant="gradient" gradient={{ from: 'yellow', to: 'orange' }}>Add to Cart</Button></Center>
</Grid.Col>

): null

}
</Grid>
</Center>
    )
}

// export default function Content(){
    

//     useScrollToTop();
//     const [apiData, setApiData] = useState<Api[] | null>() ;

//     useEffect(() => {
//             axios.get("/api/products.json").then((response) =>{
//             setApiData(response.data);
//         });
        
//     }, []);

// console.log(apiData)

//     return(
// <Center>
//  <Helmet>
//                 <meta charSet="utf-8" />
//                 <title>Webstore: Get it from the web.</title>
//             </Helmet>


// <Grid
// gutter={1}
// >
// {apiData ? apiData.map((element, index) => 
// <Grid.Col 
// span={6}
//     md={3}
//     lg={3}
//     key={element.name} >
//         <motion.div
// whileTap={{scale: 0.5}}>
//         <motion.div
// initial={{ opacity: 0 }}
// whileHover={{ color: ["red", "blue", "green", "orange"]}}
//   whileInView={{ opacity: 1 }}
//   transition={{delay: 0.3}}
// >
//     <Link to={`/product/${index + 1}`} className={styles.link} >
//         <div className={styles.box} >
//     <Image
// key={element.name} 
// alt={element.name} 
// src={element.url}
// fit="scale-down"
// height={200}
// radius="xs"
// withPlaceholder
// ></Image>
// <Center>{element.name}</Center>
// <Center className={styles.bold}>{format(element.price, {
// currency: '$',
// spacing: false,
// currencyPosition: 'LEFT'
// })}</Center>
// </div>
// </Link>
// </motion.div>
// </motion.div>
// </Grid.Col>

// ): null

// }
// </Grid>
// </Center>
//     )
// }