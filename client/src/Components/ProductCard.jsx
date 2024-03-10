import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box, Button, Rating } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProductCard({ content }) {
  return (
    <Card
      sx={{ minWidth: 180, maxWidth: 275 }}
      className="border-solid border-2 border-neutral-200"
    >
      <CardMedia
        sx={{ height: 100 }}
        image={content?.image}
        title="green iguana"
      />
      <CardContent>
        <Link className="no-underline text-black hover:text-blue-400">
          <Typography gutterBottom variant="h6" component="div">
            {content?.text}
          </Typography>
        </Link>
        <Rating className="mt-2" value={3} readOnly />
        <Box>
          <Typography variant="h6">{content?.price}</Typography>
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
        {/* <IconButton size="small">Learn More</IconButton> */}
      </CardActions>
    </Card>
  );
}

ProductCard.propTypes = {
  content: PropTypes.object.isRequired,
};
