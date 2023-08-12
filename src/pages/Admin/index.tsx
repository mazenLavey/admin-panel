import ToolBar from './ToolBar';
import UsersTable from './UsersTable';

const Admin: React.FC = () => {

    return (
        <main className='Admin'>
            <ToolBar />
            <UsersTable />
        </main>
    )
}

export default Admin;