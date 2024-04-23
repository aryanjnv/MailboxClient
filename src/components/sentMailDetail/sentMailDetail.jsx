import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import classes from './sentMailDetail.module.css';

const SentMailDetail = () => {
    const { sentmailId } = useParams();
    const sentItems = useSelector(state => state.mail.sentItems);
    console.log(sentItems)

    const mail = sentItems.find(product => parseInt(product.id) === parseInt(sentmailId));

    if (!mail) {
        return <div className={classes.productDetail}>Product not found</div>;
    }

    return (
        <div>
            <h3 className={classes.subject}>Subject: {mail.subject}</h3>
            <div className={classes.emailtime}>
                <h5>{mail.from}</h5>
                <p>{mail.time}</p>
            </div>
            <p className={classes.context}>{mail.content}</p>
        </div>
    );
};

export default SentMailDetail;