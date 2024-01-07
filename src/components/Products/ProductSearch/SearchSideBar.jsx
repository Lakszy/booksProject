import { Grid } from "@mui/material"
import { ProductFilterCard } from "../../Common"


const SearchSideBar = ({
    handleApplyFilter
}) => {
    // make this sidebar fixed on the page
    return (
        <Grid item md={3} sx={{ display: { md: "block", xs: "none", } }} >
            <ProductFilterCard onApplyFilter={handleApplyFilter} />
         
        </Grid>
    )
}

export default SearchSideBar