import mongoose from 'mongoose';
import List from '../models/List';

const newComment = (user, comment) => {
    const createComment = { commentMSG: comment, commentUser: user };
    return createComment;
};

const createActivityLog = (username, action, list) => {
    const time = new Date();
    const auditLog = `${username} ${action} ${list || ''} at ${time}`;

    return auditLog;
};

export default { newComment, createActivityLog };