import React, { useEffect, useState } from 'react';
import './App.css';
import {
  ChakraProvider,
  Input,
  theme,
  Flex,
  Text,
  Spinner,
  Center,
  Stack,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import Cards from './components/Cards';
import { FaSearch } from 'react-icons/fa';

const url = 'https://api.publicapis.org/entries';

function App() {
  const [entries, setEntries] = useState([]);
  const [newEntries, setNewEntries] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const search = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setEntries(data.entries);
      setNewEntries(data.entries);
    } catch {
      console.log('Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    search();
  }, []);

  
  let filterF = () => {
    var filterFn = function (obj) {
      // Iterate the obj for each key.
      for (var k in obj) {
        if (typeof obj[k] == 'string') {
          if (obj[k].toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
            return true;
          }
        }
      }
    };

    setNewEntries(entries.filter(filterFn));
  };

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      filterF();
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <div className="wrapper">
        <Stack>
          <Heading fontFamily={"Josefin Sans, sans-serif"} marginTop={"1%"} marginBottom={"1%"} textAlign={'center'} marginRight={"5%"}>Filter Components</Heading>
          <Flex justifyContent={'center'} align={'center'} gap={3}>
            <Input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
              width="50%"
              placeholder="Enter value..."
              // _placeholder={{ color: 'inherit' }}
            />
            <IconButton icon={<FaSearch />} onClick={filterF} />
            <ColorModeSwitcher justifySelf="flex-end" />
          </Flex>
        </Stack>
      </div>
      {isLoading ? (
        <Center>
          <Spinner marginTop={'20%'} />
        </Center>
      ) : (
        <Flex wrap={'wrap'} gap={20} justifyContent={'center'} mt={10}>
        
        {newEntries.length == '0' 
            ? (
              <Text fontSize="xl" marginTop={"7%"} > No Such Component Found</Text> 
            ) : (
              
              newEntries.map(val => (
                <Cards
                  API={val.API}
                  Description={val.Description}
                  Category={val.Category}
                  Link={val.Link}
                />
              ))
              
            )}
            
        </Flex>
      )}
    </ChakraProvider>
  );
}

export default App;
