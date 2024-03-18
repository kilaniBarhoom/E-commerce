import {
  Avatar,
  Button,
  Rating,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

export const Review = ({ review }) => {
  const [seeMore, setSeeMore] = useState(false);
  const formatDate = (date) => {
    const gotDate = new Date(date);
    let formattedDate = gotDate.toISOString().split("T")[0];
    return formattedDate;
  };

  const isTextOverflowed = (text) => {
    const element = document.createElement("span");
    element.style.visibility = "hidden";
    element.style.position = "absolute";
    element.style.whiteSpace = "nowrap";
    element.style.overflow = "hidden";
    element.style.textOverflow = "ellipsis";
    element.style.maxWidth = "73%";
    element.textContent = text;
    document.body.appendChild(element);
    const isOverflowed = element.offsetWidth < element.scrollWidth;
    document.body.removeChild(element);
    return isOverflowed;
  };

  const shouldShowSeeMore = isTextOverflowed(review.content);

  return (
    <Stack className="gap-4 relative p-5">
      <Stack gap={2} className="flex flex-row gap-4 items-center">
        <Avatar className="size-14" src={review?.user?.avatar?.url} />
        <Stack>
          <Typography variant="h6" className="dark:text-white text-black">
            {review.user.username}
          </Typography>
          <Stack className="flex flex-row gap-1 items-center">
            <StyledRating
              precision={0.5}
              size="small"
              readOnly
              value={review.rating}
            />
            <Typography className="dark:text-neutral-300 text-neutral-600">
              ({review.rating})
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack className="justify-start">
        <Typography
          className={`dark:text-neutral-300 text-neutral-600 max-w-[73%]  ${
            seeMore ? "line-clamp-none" : "line-clamp-2"
          }`}
        >
          {review.content}
        </Typography>
        {shouldShowSeeMore && (
          <Button
            className="dark:text-neutral-200 underline cursor-pointer w-fit p-0 my-4"
            onClick={() => setSeeMore(!seeMore)}
          >
            {seeMore ? "See Less" : "See More"}
          </Button>
        )}
      </Stack>
      <Typography
        variant="body1"
        className="dark:text-neutral-300 text-neutral-600 ml-auto absolute top-5 right-5"
      >
        {formatDate(review.createdAt)}
      </Typography>
    </Stack>
  );
};

Review.propTypes = {
  review: PropTypes.object.isRequired,
};

const isDarkMode = () => {
  // Replace 'dark' with the actual dark mode class from Tailwind CSS
  return document.documentElement.classList.contains("dark");
};

const StyledRating = styled(Rating)(() => ({
  // Add your custom styles here
  // Example for handling dark background
  color: isDarkMode() ? "#fff" : "#000",
  "& .MuiRating-iconFilled": {
    color: isDarkMode() ? "#fff" : "#f57c00", // Adjust the filled star color
  },
  "& .MuiRating-iconEmpty": {
    color: isDarkMode() ? "#616161" : "#bdbdbd", // Adjust the empty star color
  },
}));
