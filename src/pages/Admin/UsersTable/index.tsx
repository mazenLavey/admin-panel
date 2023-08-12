import { useContext, useEffect, useState } from 'react';
import { UsersContext } from 'context/UsersContext';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { UserData } from 'types/interfaces';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userName', headerName: 'Name', minWidth: 150 },
    { field: 'userEmail', headerName: 'E-mail', minWidth: 220 },
    { field: 'createdAt', headerName: 'Registration Time', minWidth: 220 },
    { field: 'lastLoginAt', headerName: 'Last LogIn', minWidth: 220 },
    { field: 'userStatus', headerName: 'Status', minWidth: 70 },
];

const UsersTable: React.FC = () => {
    const [rows, setRows] = useState<UserData[]>([]);
    const { usersData, selectedUsers, updateSelectedUsers } = useContext(UsersContext);

    useEffect(() => {
        setRows(usersData)
    }, [usersData]);

    const handleSelection = (ids: GridRowSelectionModel): void => {
        updateSelectedUsers(ids)
    }

    return (
        <div style={{ height: 400, width: '100%', background: "white" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                rowSelectionModel={selectedUsers}
                onRowSelectionModelChange={handleSelection}
                checkboxSelection
            />
        </div>
    )
}

export default UsersTable;