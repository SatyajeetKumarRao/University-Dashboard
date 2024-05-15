import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { BASE_URL } from "../utils/vars";
import { AuthContext } from "../contexts/AuthContext";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

const AdminDashboard = () => {
  const { auth } = useContext(AuthContext);

  const [studentList, setStudentList] = useState(null);
  const [streamList, setStreamList] = useState(null);

  const fetchStudentList = () => {
    fetch(`${BASE_URL}/student/studentList`, {
      headers: {
        authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData);
        setStudentList(responseData.data);
      })
      .catch((error) => console.log(error));
  };

  const fetchStreamList = () => {
    fetch(`${BASE_URL}/streams`, {
      headers: {
        authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setStreamList(responseData.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchStudentList();
    fetchStreamList();
  }, []);

  const streamModal = useDisclosure();

  const streamRef = useRef(null);
  const finalRef = useRef(null);

  const editStream = (item) => {
    streamModal.onOpen();
    console.log(item);
  };

  return (
    <Box m={10}>
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>Student List</Tab>
          <Tab>Streams</Tab>
          <Tab>Subjects</Tab>
          <Tab>Marks</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {studentList && (
              <TableContainer>
                <Table variant="simple">
                  <TableCaption>Student List</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Stream</Th>
                      <Th>Subject</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {studentList.map((item) => {
                      return (
                        <Tr key={item._id}>
                          <Td>{item.name}</Td>
                          <Td>{item.email}</Td>
                          <Td>{item.stream.name}</Td>
                          <Td>{item.subject.name}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                  {/* <Tfoot>
                    <Tr>
                      <Th>To convert</Th>
                      <Th>into</Th>
                      <Th isNumeric>multiply by</Th>
                    </Tr>
                  </Tfoot> */}
                </Table>
              </TableContainer>
            )}
          </TabPanel>
          <TabPanel>
            {streamList && (
              <TableContainer>
                <Table variant="simple">
                  <TableCaption>Stream List</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Stream Id</Th>
                      <Th>Stream Name</Th>
                      <Th>Edit</Th>
                      <Th>Delete</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {streamList.map((item) => {
                      return (
                        <Tr key={item._id}>
                          <Td>{item._id}</Td>
                          <Td>{item.name}</Td>
                          <Td
                            onClick={() => {
                              editStream(item);
                            }}
                          >
                            <FiEdit3 />
                          </Td>
                          <Td>
                            <MdOutlineDelete />
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                  {/* <Tfoot>
                    <Tr>
                      <Th>To convert</Th>
                      <Th>into</Th>
                      <Th isNumeric>multiply by</Th>
                    </Tr>
                  </Tfoot> */}
                </Table>
              </TableContainer>
            )}
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
          <TabPanel>
            <p>four!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal
        initialFocusRef={streamRef}
        finalFocusRef={finalRef}
        isOpen={streamModal.isOpen}
        onClose={streamModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Stream</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Stream Name</FormLabel>
              <Input ref={streamRef} placeholder="Stream name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={streamModal.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export { AdminDashboard };
