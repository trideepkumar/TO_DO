import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import ChecklistRtlSharpIcon from '@mui/icons-material/ChecklistRtlSharp';






export default function Appbar() {

    const authState = useSelector((state) => {
        return state.auth.authState;
      });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'grey'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color=""
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
          
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, }}
            textAlign='left'
          >
          <ChecklistRtlSharpIcon sx={{ marginRight: '0.5rem'}}/> 
          TODO FOR YOU  
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            textAlign='right'
          >
           Hello {authState.name} !
          </Typography>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}