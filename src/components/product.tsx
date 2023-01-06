import { useParams } from 'react-router-dom'
import axios from "axios"
import { useEffect, useState } from 'react';
import { Api, useScrollToTop } from "./content"
import { Grid, Image, Rating, Divider } from "@mantine/core"
import {Button} from "@mantine/core"
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

const randomPrice = Math.floor(Math.random()* 1000)

const { format } = require('number-currency-format');

export default function Product(){
useScrollToTop();
    const [apiData, setApiData] = useState<Api[] | null>() ;
    useEffect(() => {
            axios.get("/api/products.json").then((response) =>{
            setApiData(response.data);
        });
        
    }, []);

     const param = useParams()

     console.log(param)





console.log(apiData)
    return(

        <div>
 <Helmet>
                <meta charSet="utf-8" />
                <title>{apiData ? apiData.filter((element, index) => index + 1 === Number(param.productid) ).map((element)=> element.name).toString() : "Product Page" }</title>
            </Helmet>

{apiData ? apiData.filter((element, index) => index + 1 === Number(param.productid) ).map((element, index)=>
 <Grid key={element.name + index} >
    <Grid.Col span={12} sm={4}>
<Image src={`https://picsum.photos/id/${Number(param.productid)- 1}/350/200`} withPlaceholder />
    </Grid.Col>
    <Grid.Col span={12} sm={6}>
        <h1>{lorem.generateWords(1)[0].toUpperCase() + lorem.generateWords(1).substring(1)}</h1>
        <Rating></Rating>
        <div>{format(randomPrice, {
currency: '$',
spacing: false,
currencyPosition: 'LEFT'
})}</div>
<Divider />
<div>{lorem.generateParagraphs(2)}</div>
        </Grid.Col>
        <Grid.Col span={12} sm={2}>
            <div>{format(randomPrice, {
currency: '$',
spacing: false,
currencyPosition: 'LEFT'
})}</div>
        <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Add to Cart</Button>
    </Grid.Col>

 </Grid> ) 
 
 : null}
        </div>
    )
}
// export default function Product(){
// useScrollToTop();
//     const [apiData, setApiData] = useState<Api[] | null>() ;
//     useEffect(() => {
//             axios.get("/api/products.json").then((response) =>{
//             setApiData(response.data);
//         });
        
//     }, []);

//      const param = useParams()

//      console.log(param)





// console.log(apiData)
//     return(

//         <div>
//  <Helmet>
//                 <meta charSet="utf-8" />
//                 <title>{apiData ? apiData.filter((element, index) => index + 1 === Number(param.productid) ).map((element)=> element.name).toString() : "Product Page" }</title>
//             </Helmet>

// {apiData ? apiData.filter((element, index) => index + 1 === Number(param.productid) ).map((element, index)=>
//  <Grid key={element.name + index} >
//     <Grid.Col span={12} sm={4}>
// <Image src={element.url} withPlaceholder />
//     </Grid.Col>
//     <Grid.Col span={12} sm={6}>
//         <h1>{element.name}</h1>
//         <Rating></Rating>
//         <div>{format(element.price, {
// currency: '$',
// spacing: false,
// currencyPosition: 'LEFT'
// })}</div>
// <Divider />
// <div>{element.description}</div>
//         </Grid.Col>
//         <Grid.Col span={12} sm={2}>
//             <div>{format(element.price, {
// currency: '$',
// spacing: false,
// currencyPosition: 'LEFT'
// })}</div>
//         <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Add to Cart</Button>
//     </Grid.Col>

//  </Grid> ) 
 
//  : null}
//         </div>
//     )
// }