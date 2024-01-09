import {useState , useEffect} from 'react';
import { commerce } from '../../../lib/commerce';
import { Container,Grid } from '@material-ui/core';
import useStyles from '../styles';
import Product from '../Product/Product';
import { EmptyComp, Loader } from '../../Common'
import { getSearchQuery } from '../../../lib';
import SearchSideBar from './SearchSideBar';

const SearchPage = ({onAddToCart}) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [products , setProducts] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const classes = useStyles();

    const fetchSearchProducts = async (query,filterObj, sortObj) => {
        setIsLoading(true);
        const { data } = await commerce.products.list({
            query,
            ...filterObj,
            ...sortObj
        });
        setProducts(data);
        setIsLoading(false);
        console.log('SEARCH DATA GOES HERE',data)
    }; 

    const handleApplyFilter = ({ selectedFilters, selectedSortBy }) => {
        console.log('FILTERS SEARCHPAGE',selectedFilters)
        console.log('SORTBY SEARCHPAGE',selectedSortBy)
        const filterObj = {};
        let sortObj = {};
        if(selectedFilters.length > 0){
            filterObj['category_slug'] = selectedFilters;
        }
        if(!!selectedSortBy){
           sortObj  = {...selectedSortBy}
        }
        fetchSearchProducts(searchTerm,filterObj,sortObj)
        // fetchSearchProducts(searchTerm)
    
    }

    useEffect(() => {
        const term = getSearchQuery();
        setSearchTerm(term);
    }, [window.location.search])

   

    useEffect(() => {
        console.log('SEARCH TERM CHANGED',searchTerm)
        if(!searchTerm) return;
        fetchSearchProducts(searchTerm);
    }, [searchTerm,])


   
    return(
        <Container style={{marginTop : 100}} >
            <Grid container spacing={2} sx={{ position : 'relative' }} >
                <SearchSideBar handleApplyFilter={handleApplyFilter} />
                {
                    isLoading  ? <Loader />
                    : !products || products.length === 0 ? <EmptyComp text="No Books Found" />
                    :
                    <Grid className={classes.content} item  md={9} >
                        <Grid container>
                            {products.map((product) => (
                                <Grid
                                    className={classes.content}
                                    item
                                    xs={6}
                                    sm={6}
                                    md={4}
                                    key={product.id}
                                >
                                    <Product product={product} onAddToCart={onAddToCart} />
                                </Grid>
                            ))}

                        </Grid>
                    </Grid>

                }
            </Grid>
        </Container>
    )
}


export default SearchPage;