import React from 'react';
import { RootState, useAppDispatch } from '../../../app/store';
import { archiveContact, publishContact } from "../../../features/contact/contactThunk";
import { Contact as ContactType } from '../../../interfaces/contact';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';


const RecentMessages: React.FC = () => {
    const dispatch = useAppDispatch();
    const contacts: ContactType[] = useSelector((state: RootState) => state.contact.filteredContacts);
    const token = Cookies.get('user') || '';

    const buttonArchiveClick = async (id: number) => {
        await dispatch(archiveContact({id, token}));
        console.log('ARCHIVE');
    };

    const buttonPublishClick = async (id: number) => {
        await dispatch(publishContact({id, token}));
        console.log('PUBLISH');
    };


    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {contacts.slice(0, 5).map((contact) => (
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