import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Box, IconButton, Menu, MenuItem } from '@mui/material';
import {  PersonOutline, ShoppingBagOutlined, MenuOutlined, SearchOutlined,} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { shades } from '../../theme';
import { setIsCartOpen } from '../../state';
import MenuIcon from '@mui/icons-material/Menu';
import { Select, FormControl, InputLabel } from '@mui/material';

const PerfumeMenuButton = (props) => {
  
  const handleClick = (event) => {
    props.setAnchorEl(event.currentTarget);
    
  };

  const handleClose = () => {
    props.setAnchorEl(null);
  };

  const [selectedOption, setSelectedOption] = useState('');
  const menuOptions = [
    'New Arrivals',
    'Male',
    'Female',
    'Unisex',
    'Top Rated',
    'Best Sellers',
  ];

  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    navigate(`/?category=${option}`)
    handleClose();
  };
  console.log(selectedOption)
  
  return (
    <React.Fragment>
      <IconButton
        aria-controls="perfume-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: 'black' }}
      >
        <MenuOutlined />
      </IconButton>
      <Menu
        id="perfume-menu"
        anchorEl={props.anchorEl}
        open={Boolean(props.anchorEl)}
        onClose={handleClose}
        onSelect={(e)=>console.log(e)}
        
      >
        {menuOptions.map((option, index) => (
          <MenuItem key={index} onClick={() => handleOptionSelect(option)}>
            {option}

          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};


const Navbar = ()=> {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [anchorEl, setAnchorEl] = useState(null);

  console.log(anchorEl)

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate('/')}
          sx={{ '&:hover': { cursor: 'pointer' } }}
          color={shades.secondary[500]}
        >
          <h2>Oud Aroma</h2>
        </Box>
        <Box display="flex" justifyContent="space-between" columnGap="20px" zIndex="2">
             {/*  <IconButton sx={{ color: 'black' }}>
            <SearchOutlined />
          </IconButton>*/}
         {/* <IconButton sx={{ color: 'black' }}> 
            <PersonOutline />
          </IconButton>*/}
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              '& .MuiBadge-badge': {
                right: 5,
                top: 5,
                padding: '0 4px',
                height: '14px',
                minWidth: '13px',
              },
            }}
          >
            <IconButton onClick={() => dispatch(setIsCartOpen({}))} sx={{ color: 'black' }}>
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <PerfumeMenuButton setAnchorEl={setAnchorEl} anchorEl={anchorEl}/>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;