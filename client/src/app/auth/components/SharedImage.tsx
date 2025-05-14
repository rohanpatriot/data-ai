import { Box } from '@mui/material';

export default function SharedImage() {
  return (
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            textAlign: 'center',
            width: '100%',
            height: '90vh',
            backgroundImage: 'url(/src/assets/login_banner.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            padding: 2,
          }}
          />
  );
}