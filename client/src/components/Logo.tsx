import React from 'react';
import { Box } from '@mui/material'; 
import { Link } from 'react-router-dom';

interface LogoProps {
    color?: string;
}

const Logo: React.FC<LogoProps> = () => {

    return (
        <Link to="/" style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>            
                <img
                    src="/src/assets/logo.svg"
                    alt="Perplexigrid Logo" 
                    style={{ height: '34px', marginRight: '8px' }}
                />
            </Box>
        </Link>
    )
}

export default Logo;