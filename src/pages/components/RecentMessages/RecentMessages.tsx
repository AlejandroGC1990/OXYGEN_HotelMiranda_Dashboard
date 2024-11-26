import React from 'react';
import { RootState, useAppDispatch } from '../../../app/store';
import { Contact as ContactType } from '../../../interfaces/contact';
import { useSelector } from 'react-redux';

const RecentMessages: React.FC = () => {
    const contacts: ContactType[] = useSelector((state: RootState) => state.contact.filteredContacts);

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
                </div>
            ))}
        </div >
    );
}

export default RecentMessages;