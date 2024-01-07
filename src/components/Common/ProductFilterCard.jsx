import { FC, useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    Checkbox,
    Divider,
    FormControlLabel,
    Rating,
    TextField,
} from "@mui/material";
import {commerce} from "../../lib/commerce";
import { FormControl, Radio, RadioGroup, Typography } from "@material-ui/core";

const ProductFilterCard = ({
    onApplyFilter,
}) => {
    const [categories , setCategories] = useState([])
    const [selectedFilters , setSelectedFilters] = useState([]);
    const [selectedSortBy , setSelectedSortBy] = useState();

    const fetchCategoriesList = async () => {
        const resp = await commerce.categories.list()
        setCategories(resp.data)
    }

    const handleSortChange = (e) => {
        console.log('SORTBY SELECTION',e.target.value)
        // break this into two parts {sortBy, 'price' , sortOrder : 'asc'}
        const [sortBy, sortOrder] = e.target.value.split('_');
        setSelectedSortBy({sortBy , sortOrder})
    }

    const handleFilterChange = (e) => {
        console.log('FILTER SELECTION',e.target.value)
        // ADD OR REMOVE FROM THE ARRAY
        const {value} = e.target;
        const index = selectedFilters.indexOf(value);
        if(index === -1){
            setSelectedFilters([...selectedFilters , value])
        }else{
            const newFilters = [...selectedFilters];
            newFilters.splice(index,1);
            setSelectedFilters(newFilters)
        }
    }

    const handleApplyFilter = () => {
        onApplyFilter({selectedFilters , selectedSortBy})
    }

    useEffect(() => {
        fetchCategoriesList()
    }, [])
    
    return (
        <Card sx={{ p: "18px 27px", overflow: "auto", position : 'fixed'}} fullWidth  elevation={1}>
           
            <Typography variant="h6" gutterBottom>Sort</Typography>
            <FormControl>
                <RadioGroup>
                    {
                        sortBy.map((item,index) => (
                            <FormControlLabel
                                onChange={handleSortChange}
                                key={index}
                                value={item.key}
                                sx={{ display: "flex" }}
                                label={<span color="inherit">{item.title}</span>}
                                control={<Radio size="small" color="secondary" />}
                            />
                        ))
                    }
                </RadioGroup>
            </FormControl>
           
            
            <Divider sx={{ mt: 2, mb: 3 }} />
             <Typography variant="h6" gutterBottom>Filter</Typography>
            {
                categories.map((item) => (
                    <FormControlLabel
                        onChange={handleFilterChange}
                        value={item?.slug}
                        key={item.id}
                        sx={{ display: "flex" }}
                        label={<span color="inherit">{item.name}</span>}
                        control={<Checkbox size="small" color="secondary" />}
                    />
                ))
            }

         

            <Divider sx={{ mt: 2, mb: 3 }} />
           
         
    
        <Button onClick={handleApplyFilter} variant="contained" color="secondary" fullWidth>Apply </Button>
           
        </Card>
    );
};



const brandList = ["Macc", "Karts", "Baals", "Bukks", "Luasis"];
const sortBy = [
    {
        title : 'Price -- Low to High',
        key : 'price_asc'
    },
    {
        title : 'Price -- High to Low',
        key : 'price_desc'
    },
    {
        title : 'Name -- A to Z',
        key : 'name_asc'
    },
    {
        title : 'Name -- Z to A',
        key : 'name_desc'
    },
];



export default ProductFilterCard;


