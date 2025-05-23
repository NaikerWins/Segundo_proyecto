import { useEffect, useState } from 'react';
import { getIssues, deleteIssue } from '../../services/issueService';
import IssueItem from './IssueItem';
import { Box } from '@mui/material';

export default function IssueList({ onEdit }) {
    const [issues, setIssues] = useState([]);

    const fetchIssues = async () => {
        const res = await getIssues();
        setIssues(res.data);
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    const handleDelete = async (id) => {
        await deleteIssue(id);
        fetchIssues();
    };

    return (
        <Box sx={{ maxHeight: '75vh', overflowY: 'auto', paddingRight: 1 }}>
            {issues.map((issue) => (
                <IssueItem key={issue.id} issue={issue} onEdit={onEdit} onDelete={handleDelete} />
            ))}
        </Box>
    );
}
