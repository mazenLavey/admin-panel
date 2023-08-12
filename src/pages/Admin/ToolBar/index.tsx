import { useContext } from 'react';
import { UsersContext } from 'context/UsersContext';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faUserCheck } from '@fortawesome/free-solid-svg-icons';

const ToolBar: React.FC = () => {
    const { DeleteUsers, BlockUsers, UnblockUsers } = useContext(UsersContext);

    return (
        <ButtonGroup variant="outlined" aria-label="outlined primary button group" style={{margin: "20px 0"}}>
            <Button onClick={BlockUsers} color="error" title='block user'>
                Block
            </Button>
            <Button onClick={UnblockUsers} title='unblock user'>
                <FontAwesomeIcon icon={faUserCheck} />
            </Button>
            <Button onClick={DeleteUsers} title='delete user'>
                <FontAwesomeIcon icon={faTrashCan} />
            </Button>
        </ButtonGroup>
    )
}

export default ToolBar;