import React from "react";
import useProducts from "../../Hooks/useProducts";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
  Stack,
  Rating,
  Chip,
} from "@mui/material";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { Link } from "react-router-dom";

export default function Products() {
  const { data } = useProducts();

  return (
    <Box
      className="product"
      sx={{
        py: { xs: 5, md: 8 },
        background:
          "linear-gradient(180deg, rgba(248,250,252,1) 0%, rgba(255,255,255,1) 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={1.5} mb={5} textAlign="center">
          <Typography
            component="h2"
            variant="h3"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.6px",
              fontSize: { xs: "2rem", md: "2.8rem" },
            }}
          >
            Products
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            Discover our latest collection with premium quality, elegant style,
            and products carefully selected for your everyday needs.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {data?.response?.data?.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Link
                to={`/Products/${product.id}`}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 5,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease",
                    backgroundColor: "background.paper",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 18px 40px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative", p: 2, pb: 0 }}>
                    <Chip
                      label="New"
                      size="small"
                      color="primary"
                      sx={{
                        position: "absolute",
                        top: 24,
                        left: 24,
                        zIndex: 2,
                        borderRadius: "999px",
                        fontWeight: 600,
                      }}
                    />

                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{
                        height: 320,
                        objectFit: "cover",
                        borderRadius: 4,
                        backgroundColor: "#f7f7f7",
                      }}
                    />
                  </Box>

                  <CardContent
                    sx={{
                      p: 2.5,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.2,
                    }}
                  >
                    <Typography
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        lineHeight: 1.5,
                        minHeight: 50,
                      }}
                    >
                      {product.name}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Rating
                        value={product.rate || 0}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                      <Typography variant="body2" color="text.secondary">
                        ({product.rate || 0})
                      </Typography>
                    </Stack>

                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: "1.2rem",
                        color: "primary.main",
                      }}
                    >
                      ${product.price}
                    </Typography>

                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mt={0.5}
                      sx={{ color: "text.secondary" }}
                    >
                      <LocalMallOutlinedIcon sx={{ fontSize: 18 }} />
                      <Typography variant="body2">
                        View details
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}