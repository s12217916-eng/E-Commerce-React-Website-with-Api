import React from 'react'
import { Card, CardContent, Typography } from '@mui/material';
export default function Category({category}) {
  return (
     <Card sx={{ py:3, textAlign:"center" }}>
                            <CardContent>
                                <Typography fontWeight={600} component="h3">
                                    {category.name}
                                </Typography>
                            </CardContent>
                        </Card>
  )
}
