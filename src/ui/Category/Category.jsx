import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

export default function Category({ category }) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        textAlign: 'center',
        px: 2,
        py: 4,
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        transition: 'all 0.3s ease',
        cursor: 'pointer',

        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Icon Circle */}
        <Box
          sx={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            background:
              'linear-gradient(135deg, rgba(25,118,210,0.1), rgba(25,118,210,0.2))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CategoryOutlinedIcon
            sx={{
              fontSize: 32,
              color: 'primary.main',
            }}
          />
        </Box>

        {/* Category Name */}
        <Typography
          component="h3"
          sx={{
            fontWeight: 700,
            fontSize: '1.1rem',
            letterSpacing: '0.3px',
          }}
        >
          {category.name}
        </Typography>

        {/* subtle description (optional feel) */}
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: '0.8rem',
          }}
        >
          Explore products
        </Typography>
      </CardContent>
    </Card>
  );
}