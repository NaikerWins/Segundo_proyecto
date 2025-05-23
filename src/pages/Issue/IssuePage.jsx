import React, { useState } from "react";
import IssueForm from "../../components/Issues/issueForm";
import IssueList from "../../components/Issues/IssueList";
import { Box, Card, CardContent, Typography } from '@mui/material';

export default function IssuePage() {
    const [refresh, setRefresh] = useState(false);
    const [editingIssue, setEditingIssue] = useState(null);

    const reload = () => {
        setRefresh(!refresh);
        setEditingIssue(null);
    };

    return (
    <Box mx="center" sx={{ flex: 1, minWidth: '300px', position: 'sticky', top: '4rem', pt: {xs:60, md:15, sm:15 } }}>
        <Card elevation={3}>
            <CardContent>
                <Box sx={{ display: 'flex', gap: '2rem', flexWrap: 'wrap'  }}>
                    <Box sx={{ flex: 1, minWidth: '300px' }}>
                        <Typography variant="h5" gutterBottom>
                            {editingIssue ? 'Editar Inconveniente' : 'Nuevo Inconveniente'}
                        </Typography>
                        <IssueForm onIssueSaved={reload} editingIssue={editingIssue} />
                    </Box>
                    <Box sx={{ flex: 2, minWidth: '300px', maxHeight: '60vh'}} className="customers-scrollbar" >
                        <Typography variant="h5" gutterBottom>
                            Lista de Inconvenientes
                        </Typography>
                        <IssueList onEdit={setEditingIssue} key={refresh} />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    </Box>
);

}
