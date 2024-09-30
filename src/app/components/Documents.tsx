'use client'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image'
import Navbar from './Navbar';

export interface Document {
    id: number;
    name: string;
    description: string;
    image: string;
    date: string;

}

const Documents = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [selectedDocument, setSelectedDocument] = useState<Document>();
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const storedDocuments = JSON.parse(localStorage.getItem('documents') as string) || [];
        setDocuments(storedDocuments);
    }, []);

    const handleViewDocument = (id: number) => {
        const document = documents.find(doc => doc.id === id);
        setSelectedDocument(document);
        setShowModal(true);
    };

    const handleDeleteDocument = (id: number) => {
        const updatedDocuments = documents.filter((document) => document.id !== id);
        setDocuments(updatedDocuments);
        localStorage.setItem('documents', JSON.stringify(updatedDocuments));
    };

    const filteredDocuments = documents.filter(document =>
        document.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-1 border-end"></div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search documents..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <h2>Document List</h2>

                        <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Created Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredDocuments.map((document) => (
                                <tr key={document.id}>
                                    <td>{document.id}</td>
                                    <td>{document.name}</td>
                                    <td>{document.date}</td>
                                    <td>
                                        <button className="btn btn-primary"
                                                onClick={() =>
                                                    handleViewDocument(document.id)}>
                                            View
                                        </button>
                                        <button className="btn btn-danger ms-2"
                                                onClick={() =>
                                                    handleDeleteDocument(document.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal" role="dialog" style={{
                    display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <div className="modal-dialog modal-dialog-centered"
                         role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {selectedDocument?.name}
                                </h5>
                                <button type="button" className="btn close"
                                        onClick={() => setShowModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {
                                    selectedDocument && selectedDocument.image &&
                                    <Image className="img-fluid"
                                        src={selectedDocument.image}
                                        alt="Document"
                                        width={800}
                                        height={800}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Documents;