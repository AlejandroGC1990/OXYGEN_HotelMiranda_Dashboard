import React from 'react';
import { useDispatch } from "react-redux";
import { archiveContact, publishContact } from "../../../features/contact/contactThunk";
import { Contact as ContactType } from '../../../interfaces/contact';

interface RecentMessagesProp {
    contact: ContactType[];
}

const RecentMessages: React.FC<RecentMessagesProp> = ({ contact }) => {
    const dispatch = useDispatch();

    const buttonArchiveClick = async (id: number) => {
        await dispatch(archiveContact(id));
    };

    const buttonPublishClick = async (id: number) => {
        await dispatch(publishContact(id));
    };


    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {contact.slice(0, 5).map((contact) => (
                <div
                    key={contact.guest_idReview}
                    style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', width: '200px' }}>
                    {contact.guest_commentReview}
                    <div>
                        {contact.guest_name}
                        {contact.guest_DateReview}
                    </div>
                    <div>
                        <button onClick={() => buttonPublishClick(contact.guest_idReview)}><img />V-Publish</button>
                        <button onClick={() => buttonArchiveClick(contact.guest_idReview)}><img />X-Archive</button>
                    </div>
                </div>
            ))}
        </div >
    );
}

export default RecentMessages;