import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../utils/vars";
import { AuthContext } from "../contexts/AuthContext";

const UserDashboard = () => {
  const { auth } = useContext(AuthContext);

  const [userDetails, setUserDetails] = useState(null);
  const [userReport, setUserReport] = useState(null);

  console.log(userDetails);
  console.log(userReport);

  const fetchStudentProfile = () => {
    fetch(`${BASE_URL}/student/profile/${auth.userId}`, {
      headers: {
        authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData);
        setUserDetails(...responseData.data);
      })
      .catch((error) => console.log(error));
  };

  const fetchStudentReport = () => {
    fetch(`${BASE_URL}/student/performance/${auth.userId}`, {
      headers: {
        authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData);
        setUserReport(responseData.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchStudentProfile();
    fetchStudentReport();
  }, []);

  return (
    <Box p={10}>
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Performance</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {userDetails && (
              <Card>
                <CardHeader>
                  <Heading size="md">{userDetails.name.toUpperCase()}</Heading>
                </CardHeader>

                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Email
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {userDetails?.email}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Stream
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {userDetails?.stream?.name}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Subject
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {userDetails?.subject?.name}
                      </Text>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            )}
          </TabPanel>
          <TabPanel>
            {userReport && (
              <TableContainer>
                <Table variant="simple">
                  <TableCaption>Student Report Card</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Stream</Th>
                      <Th>Subject</Th>
                      <Th isNumeric>Marks</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {userReport.map((item) => {
                      return (
                        <Tr key={item._id}>
                          <Td>{item?.stream?.name}</Td>
                          <Td>{item?.subjects?.name}</Td>
                          <Td isNumeric>{item?.marks}</Td>
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
    </Box>
  );
};

export { UserDashboard };
