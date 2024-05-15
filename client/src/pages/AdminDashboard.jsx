import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
const AdminDashboard = () => {
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
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
          <TabPanel>
            <p>four!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export { AdminDashboard };
