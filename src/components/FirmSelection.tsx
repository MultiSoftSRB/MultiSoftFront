import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Firm, LicenseType } from "../types/firm";
import { Button, Form, FormControl, InputGroup, Modal } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

const FirmSelection = ({
  firms,
  show,
  onFirmSelect,
}: {
  firms: Firm[];
  show: boolean;
  onFirmSelect: (firm: Firm) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFirms, setFilteredFirms] = useState<Firm[]>(firms);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilteredFirms(
      firms.filter((firm) =>
        firm.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, firms]);

  const handleFirmSelection = (firm: Firm) => {
    onFirmSelect(firm);
  };

  return (
    <Modal size="lg" centered show={show} backdrop="static">
      <Modal.Header>Select company</Modal.Header>
      <Modal.Body className="text-center m-3">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search firms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
        <ul className="max-h-60 overflow-y-auto">
          {filteredFirms.map((firm) => (
            <li key={firm.id} className="p-2 border-b">
              <Button onClick={() => handleFirmSelection(firm)}>
                {firm.name}
              </Button>
            </li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default FirmSelection;
