import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box, Button, Rating } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  //destructuring the product object
  const { _id, name, price, images } = product;

  return (
    <Card
      sx={{ minWidth: 180, maxWidth: 275 }}
      className="border-solid border-2 border-neutral-200"
    >
      <CardMedia
        sx={{ height: 200 }}
        image={images[0]?.url}
        title="green iguana"
      />
      <CardContent>
        <Link
          className="no-underline text-black hover:text-blue-400"
          to={`/products/${_id}`}
        >
          <Typography gutterBottom variant="h6" component="div">
            {name.length > 20 ? name.slice(0, 20) + "..." : name}
          </Typography>
        </Link>

        <Box>
          <Typography variant="h6">$ {price}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          className="w-full"
          size="small"
          startIcon={<AddShoppingCartIcon />}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
