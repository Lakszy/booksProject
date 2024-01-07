import {useState , useEffect} from 'react';
import { commerce } from '../../../lib/commerce';
import { Container,Grid } from '@material-ui/core';
import useStyles from '../styles';
import Product from '../Product/Product';
import { EmptyComp, Loader } from '../../Common'
import { getSearchQuery } from '../../../lib';

const SearchPage = ({onAddToCart}) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [products , setProducts] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const classes = useStyles();

    const fetchSearchProducts = async (query) => {
        const { data } = await commerce.products.list({
            query,
        });
        setProducts(data);
        setIsLoading(false);
        console.log('SEARCH DATA GOES HERE',data)
    }; 

    useEffect(() => {
        const term = getSearchQuery();
        setSearchTerm(term);
    }, [window.location.search])

   

    useEffect(() => {
        if(!searchTerm) return;
        setIsLoading(true);
        fetchSearchProducts(searchTerm);
    }, [searchTerm,])


    if(isLoading) return  <Loader />
    if (!products || products.length === 0) return <EmptyComp text="No Books Found" />
    
    return(
        <Container style={{marginTop : 100}} >
            <Grid className={classes.content} container spacing={2}>
                {products.map((product) => (
                    <Grid
                        className={classes.content}
                        item
                        xs={6}
                        sm={6}
                        md={4}
                        lg={3}
                        key={product.id}
                    >
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}


export default SearchPage;