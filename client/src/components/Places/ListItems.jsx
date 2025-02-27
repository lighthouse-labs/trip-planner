import { useToast, Alert, AlertIcon, Card, CardBody, Heading, Stack, Image, Divider, CardFooter, ButtonGroup, Button, Box, Badge, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, useDisclosure, Text, InputLeftElement, InputGroup, Tag } from '@chakra-ui/react';
import { EmailIcon, PhoneIcon, StarIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import noImage from '../../img/no_image.jpg'
import classNames from "classnames";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { RangeDatepicker, SingleDatepicker } from 'chakra-dayzed-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPlus } from '@fortawesome/free-solid-svg-icons';

import './ListItems.scss';

export default function ListItems(props) {

  const placeCardClass = classNames('place-card', {
    'place-card--selected': props.value.includes(props.place.name)
  })
  const property = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4,
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const obj = JSON.parse(localStorage.getItem("user"));
  const toast = useToast();
  const [amount, setAmount] = useState('');
  const [planName, setPlanName] = useState('');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  }

  const handlePlanNameChange = (event) => {
    setPlanName(event.target.value);
  }

  const clickHandler = (event) => {
    console.log("USER: ", obj.id);
    event.preventDefault();
    axios
      .post("/addlocation", {
        user_id: obj.id, 
        locationName: props.place.name,
        cityName: props.place.location_string,
        rate: props.place.rating, 
        photo_url: props.place.photo ? props.place.photo.images.small.url : 'noImage',
        plan_date: selectedDate
      })
      .then((result) => {
        onClose();
        toast({
          title: 'Location is added to your plan.',
          description: "We've created your plan for you.",
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      })
      .catch((error) => {
        toast({
          title: 'Error.',
          description: "Your plan is not created. Try again later.",
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      })
    
  }

  return (
    <Box 
      className={placeCardClass}
      onClick={onOpen} 
      >
      <Image 
        src={props.place.photo ? props.place.photo.images.small.url : noImage}
        alt={props.place.name} />

      <Box p='6'>
        <Box
          marginTop='-0.5em'
        >
          {props.place.name}
        </Box>

        <Box display='flex' alignItems='center' justifyContent='space-between' marginBottom='1em'>
          <div>
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < Number(props.place.rating) ? 'gold' : 'gray.300'}
                  icon='star'
                />
              ))}
          </div>
          <Box as='span' color='gray.600' fontSize='12px'>
            {props.place.num_reviews} reviews
          </Box>
        </Box>
        {/* {props.place.price_level &&
        <Box >
          Price
        <Box as='span' ml='40'>
          {props.place.price_level}
        </Box>
        </Box> } */}
        <Box >
          <Box fontSize='12px' marginTop='0.5em'>
            {props.place.ranking}
          </Box>
        </Box>
        {props.place?.awards?.map((award) => (
          <Box d="flex" justifyContent="space-between" my={1} alignItems="center">
          <img src={award.images.small} alt={props.place.name} />
          <Text variant="subtitle2" color="gray.600">{award.display_name}</Text>
          </Box>
        ))}
        <Box>
        {props.place?.cuisine?.map(({ name }) => (
          <Tag key={name} size="sm" variantColor="green" mr={2} >{name}</Tag>
        ))}
        </Box>
        {props.place.address && (
          <Text fontSize='14px' color="gray.600" marginTop='1em'>
            <FontAwesomeIcon icon={faLocationDot} /> {props.place.address}
          </Text>
        )}
        {props.place.phone && (
          <Text fontSize='14px' color="gray.600" marginTop='0.5em'>
            <PhoneIcon mr={1} /> {props.place.phone}
          </Text>
        )}
      
      </Box>      
      {/* <FontAwesomeIcon icon={faPlus} className='add-button'/> */}
      {localStorage.getItem("user") ? (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add this location to your plan</ModalHeader>
          <ModalCloseButton />
          <Text fontSize='3xl'>{property.name}</Text>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Select Date</FormLabel>
              <SingleDatepicker
                date={selectedDate}
                onDateChange={setSelectedDate}
                minDate={new Date()}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={clickHandler} colorScheme='blue' mr={3}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      ):(
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Log in to your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input ref={initialRef} placeholder='First name' />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input placeholder='Last name' />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                Login
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
              <Link color='teal.500' to='/register'>Don't have an account? Register here</Link>
          </ModalContent>
        </Modal>)}
    </Box>
  );
}