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
  useToast,
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
  const [subjectList, setSubjectList] = useState(null);
  const [studentMarksList, setStudentMarksList] = useState(null);

  const toast = useToast();

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
        // console.log(responseData);
        setStreamList(responseData.data);
      })
      .catch((error) => console.log(error));
  };

  const fetchSubjectList = () => {
    fetch(`${BASE_URL}/subjects`, {
      headers: {
        authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData);
        setSubjectList(responseData.data);
      })
      .catch((error) => console.log(error));
  };

  const fetchStudentMarksList = () => {
    fetch(`${BASE_URL}/marks`, {
      headers: {
        authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setStudentMarksList(responseData.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchStudentList();
    fetchStreamList();
    fetchSubjectList();
    fetchStudentMarksList();
  }, []);

  const streamModal = useDisclosure();

  const streamRef = useRef(null);
  const finalRef = useRef(null);

  const editStream = (item) => {
    streamModal.onOpen();
    console.log(item);
  };

  const deleteStream = (item) => {
    fetch(`${BASE_URL}/streams/delete/${item._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        toast({
          title: "Stream Deleted Successful",
          // description: "We've created your account for you.",
          status: "success",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });

        fetchStreamList();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: error,
          status: "error",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });
      });
  };

  const deleteSubject = (item) => {
    fetch(`${BASE_URL}/subjects/delete/${item._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        toast({
          title: "Subject Deleted Successful",
          // description: "We've created your account for you.",
          status: "success",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });

        fetchSubjectList();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: error,
          status: "error",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });
      });
  };

  const deleteMarks = (item) => {
    fetch(`${BASE_URL}/marks/delete/${item._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        toast({
          title: "Marks Deleted Successful",
          // description: "We've created your account for you.",
          status: "success",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });

        fetchStudentMarksList();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: error,
          status: "error",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });
      });
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
                          <Td>{item?.name}</Td>
                          <Td>{item?.email}</Td>
                          <Td>{item?.stream?.name}</Td>
                          <Td>{item?.subject?.name}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
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
                          <Td>{item?._id}</Td>
                          <Td>{item?.name}</Td>
                          <Td
                            onClick={() => {
                              editStream(item);
                            }}
                          >
                            <FiEdit3 />
                          </Td>
                          <Td
                            onClick={() => {
                              deleteStream(item);
                            }}
                          >
                            <MdOutlineDelete />
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>
          <TabPanel>
            {subjectList && (
              <TableContainer>
                <Table variant="simple">
                  <TableCaption>Subject List</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Subject Id</Th>
                      <Th>Name</Th>
                      <Th>Stream</Th>
                      <Th>Edit</Th>
                      <Th>Delete</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {subjectList.map((item) => {
                      return (
                        <Tr key={item._id}>
                          <Td>{item?._id}</Td>
                          <Td>{item?.name}</Td>
                          <Td>{item?.stream?.name}</Td>
                          <Td
                            onClick={() => {
                              editStream(item);
                            }}
                          >
                            <FiEdit3 />
                          </Td>
                          <Td
                            onClick={() => {
                              deleteSubject(item);
                            }}
                          >
                            <MdOutlineDelete />
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>
          <TabPanel>
            {studentMarksList && (
              <TableContainer>
                <Table variant="simple">
                  <TableCaption>Marks List</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Stream</Th>
                      <Th>Subject</Th>
                      <Th>Marks</Th>
                      <Th>Edit</Th>
                      <Th>Delete</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {studentMarksList.map((item) => {
                      return (
                        <Tr key={item._id}>
                          <Td>{item?.studentName?.name}</Td>
                          <Td>{item?.stream?.name}</Td>
                          <Td>{item?.subjects?.name}</Td>
                          <Td>{item?.marks}</Td>
                          <Td
                            onClick={() => {
                              editStream(item);
                            }}
                          >
                            <FiEdit3 />
                          </Td>
                          <Td
                            onClick={() => {
                              deleteMarks(item);
                            }}
                          >
                            <MdOutlineDelete />
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
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
