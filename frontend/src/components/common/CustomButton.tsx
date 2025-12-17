import React from 'react';
import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';
import { COLORS } from '../../config/constants';

interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  label: string;
  variant?: 'primary' | 'secondary';
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  variant = 'primary',
  sx = {},
  ...props
}) => {
  const buttonColor = variant === 'primary' ? COLORS.PRIMARY_ORANGE : COLORS.DARK_BLUE_GRAY;
  const textColor = COLORS.WHITE;

  return (
    <Button
      sx={{
        bgcolor: buttonColor,
        color: textColor,
        borderRadius: '4px',
        padding: '10px 20px',
        fontWeight: 600,
        '&:hover': {
          bgcolor: variant === 'primary' ? '#e68a00' : '#1c2832',
        },
        ...sx,
      }}
      {...props}
    >
      {label}
    </Button>
  );
};