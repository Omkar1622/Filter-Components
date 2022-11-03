import React from 'react';
// import Image from 'next/image';
import {
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

const Cards = ({API,Description,Category,Link}) => {
  return (
    <Box
      maxW={'445px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'md'}
      p={6}
      overflow={'hidden'}
    >
      <Stack>
        <a href={Link}>
        <Text
          color={'green.500'}
        //   textTransform={'uppercase'}
          fontWeight={800}
          fontSize={'sm'}
          letterSpacing={1.1}
        >
          {API}
        </Text>
        </a>
        <Heading
          color={useColorModeValue('gray.700', 'white')}
          fontSize={'2xl'}
          fontFamily={'body'}
        >
            {Description}
        </Heading>
      </Stack>

      <Stack direction={'column'} spacing={0} fontSize={'sm'} float={'right'}>
        <Text fontWeight={600}>Category</Text>
        <Text color={'gray.500'}>{Category}</Text>
      </Stack>
    </Box>  
  );
};

export default Cards;
