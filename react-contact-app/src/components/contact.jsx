import { useEffect, useState } from "react";
import { deleteContacts, fetchContacts, updateContacts } from "../services/services";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate"
const Contacts = () => {
    let navigate = useNavigate()
    const [contacts, setContacts] = useState([]);
    const [editedContact, setEditedContact] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`, contacts);
    const currentItems = contacts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(contacts.length / itemsPerPage);
    let selectedContacts = []

    useEffect(() => {
        contactsList();
    }, []);

    const contactsList = async () => {
        try {
            const response = await fetchContacts();
            const data = await response.data.data;
            setContacts(data);
        } catch (error) {
            console.error('Error fetching contacts', error);
        }
    };

    const handleCellClick = (contactId, field) => {
        const edited = { ...editedContact };
        edited.id = contactId;
        edited.name = field;
        setEditedContact(edited);
    };


    const handleCellBlur = (e) => {
        try {
            let updatedValue = e.target.innerText;

            let payload = {
                [editedContact.name]: updatedValue
            }
            updateContacts(editedContact.id, payload).then((response) => {
                if (response.status === 200) {
                    setEditedContact(null);
                }
            })

        } catch (error) {
            console.error('Error updating contact', error);
        }
    };

    const handleDelete = () => {
        let previousContacts = [...contacts]
        for (const contactId of selectedContacts) {
            deleteContacts(contactId)
        }
        let newContacts = previousContacts.filter((item) => !selectedContacts.includes(item._id))

        console.log(newContacts);
        setContacts(newContacts)
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage);
        console.log(
            `${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className="btn-container" onClick={() => navigate('/add')}><button type="button">Add Contact</button></div>
            <div className="btn-container" onClick={handleDelete}><button type="button">delete Contact</button></div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Gender</th>
                        {/* Add other table headers */}
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.map(contact => (
                        <tr key={contact._id}>
                            <input type="checkbox" onChange={(e) => e.target.checked ? selectedContacts.push(contact._id) : selectedContacts.splice(selectedContacts.indexOf(contact._id), 1)} />
                            <td>{contact.email}</td>
                            <td

                                onClick={() => handleCellClick(contact._id, 'firstName')}
                                onBlur={handleCellBlur}
                                // onChange={handleChange}
                                contentEditable={editedContact?.id === contact._id && editedContact?.name === 'firstName'}
                            >
                                {contact.firstName}
                            </td>
                            <td
                                onClick={() => handleCellClick(contact._id, 'lastName')}
                                onBlur={handleCellBlur}
                                // onChange={handleChange}
                                contentEditable={editedContact?.id === contact._id && editedContact?.name === 'lastName'}
                            >
                                {contact.lastName}
                            </td>
                            <td
                                onClick={() => handleCellClick(contact._id, 'phone')}
                                onBlur={handleCellBlur}
                                // onChange={handleChange}
                                contentEditable={editedContact?.id === contact._id && editedContact?.name === 'phone'}
                            >
                                {contact.phone}
                            </td>
                            <td
                                onClick={() => handleCellClick(contact._id, 'gender')}
                                onBlur={handleCellBlur}
                                // onChange={handleChange}
                                contentEditable={editedContact?.id === contact._id && editedContact?.name === 'gender'}
                            >
                                {contact.gender}
                            </td>
                            {/* Add other table cells */}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="container">
                <div className="pagination-container">
                    <ReactPaginate
                        // breakLabel="..."
                        nextLabel=""
                        activeClassName="active"
                        onPageChange={handlePageClick}
                        pageCount={pageCount}
                        previousLabel=""
                        containerClassName={'pagination'}
                    // renderOnZeroPageCount={null}
                    />
                </div>
            </div>

        </>
    )
}

export default Contacts;