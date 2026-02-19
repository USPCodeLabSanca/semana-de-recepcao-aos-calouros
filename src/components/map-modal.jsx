import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Locations, useLocationSearch } from '../lib/location';
import { useMemo } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '95%',
    sm: '90%',
    md: '70%',
    lg: '60%',
  },
  height: { xs: '65vh', md: '70vh' },
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


/**
 * MapLocationModal
 *
 * @return {void}
 */
export default function MapLocationModal() {
  const { open, setOpen, location: locationId } = useLocationSearch();

  const location = useMemo(() => {
    return locationId ? Locations[locationId] : null;
  }, [locationId]);

  const handleClose = () => setOpen(false);

  if (!location) {
    return null;
  }

  return (
    <Modal open={open} onClose={handleClose} keepMounted={false}>
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: '1px solid #eee',
          }}
        >
          <Typography variant="h6">
            {location.name}
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        {open && (<div className='p-4'>
          <MapContainer center={[location.lat, location.lon]} zoom={20} scrollWheelZoom={false} className="w-full h-[40vh]">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.lat, location.lon]}/>
          </MapContainer>
        </div>)}
      </Box>
    </Modal>
  );
}
