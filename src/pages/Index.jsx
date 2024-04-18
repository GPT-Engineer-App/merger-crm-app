import React, { useState } from "react";
import { Box, Button, Input, List, ListItem, Link, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Textarea, ModalFooter, IconButton, useToast } from "@chakra-ui/react";
import { FaStar, FaRegStar, FaPlus } from "react-icons/fa";

const Index = () => {
  const [companies, setCompanies] = useState([
    { id: 1, name: "Tech Innovations Ltd.", website: "https://techinnovations.example.com", isFavorite: false, notes: "" },
    { id: 2, name: "Green Energy Inc.", website: "https://greenenergy.example.com", isFavorite: false, notes: "" },
    { id: 3, name: "Health Solutions LLC", website: "https://healthsolutions.example.com", isFavorite: false, notes: "" },
  ]);
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = companies.filter((company) => company.name.toLowerCase().includes(query));
    setFilteredCompanies(filtered);
  };

  const toggleFavorite = (id) => {
    const updatedCompanies = companies.map((company) => {
      if (company.id === id) {
        return { ...company, isFavorite: !company.isFavorite };
      }
      return company;
    });
    setCompanies(updatedCompanies);
    setFilteredCompanies(updatedCompanies.filter((company) => company.name.toLowerCase().includes(searchQuery)));
  };

  const openNotesModal = (company) => {
    setSelectedCompany(company);
    onOpen();
  };

  const saveNotes = () => {
    if (selectedCompany) {
      const updatedCompanies = companies.map((company) => {
        if (company.id === selectedCompany.id) {
          return { ...company, notes: selectedCompany.notes };
        }
        return company;
      });
      setCompanies(updatedCompanies);
      setFilteredCompanies(updatedCompanies.filter((company) => company.name.toLowerCase().includes(searchQuery)));
      onClose();
      toast({
        title: "Notes saved.",
        description: "Your notes have been successfully saved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleNoteChange = (event) => {
    setSelectedCompany({ ...selectedCompany, notes: event.target.value });
  };

  return (
    <Box p={5}>
      <Input placeholder="Search companies..." value={searchQuery} onChange={handleSearch} />
      <List spacing={3} mt={4}>
        {filteredCompanies.map((company) => (
          <ListItem key={company.id} d="flex" justifyContent="space-between" alignItems="center">
            <Link href={company.website} isExternal>
              {company.name}
            </Link>
            <IconButton icon={company.isFavorite ? <FaStar /> : <FaRegStar />} onClick={() => toggleFavorite(company.id)} aria-label="Favorite" />
            <Button leftIcon={<FaPlus />} onClick={() => openNotesModal(company)}>
              Notes
            </Button>
          </ListItem>
        ))}
      </List>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notes for {selectedCompany?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea value={selectedCompany?.notes} onChange={handleNoteChange} placeholder="Type your notes here..." />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={saveNotes}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
