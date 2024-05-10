import { Box, Typography, styled } from '@mui/material';
import { useOutletContext, useLocation } from 'react-router-dom';
import { emptyProfilePic } from '../constants/constant';
import { ArrowBack, Delete } from '@mui/icons-material';
import { useEffect } from 'react';
import SummarizeEmail from './SummarizeEmail';

const IconWrapper = styled(Box)({
    padding: '90px 10px 40px 20px'
});

const Subject = styled(Typography)({
    fontSize: 22,
    margin: '20px 0',
    display: 'flex'
})

const Indicator = styled(Box)`
    font-size: 12px !important;
    background: #ddd;
    color: #222;
    border-radius: 4px;
    margin-left: 6px;
    padding: 2px 4px;
    align-self: center;
`;

const Image = styled('img')({
    borderRadius: '50%',
    width: 40,
    height: 40,
    margin: '5px 10px 0 10px',
    backgroundColor: '#cccccc'
});

const Container = styled(Box)({
    marginLeft: 15,
    width: '100%',
    padding: '20px 60px 40px 20px',
    '& > div': {
        display: 'flex',
        '& > p > span': {
            fontSize: 12,
            color: '#5E5E5E'
        }
    }
});

const Date = styled(Typography)({
    margin: '0 50px 0 auto',
    fontSize: 12,
    color: '#5E5E5E'
})

const ViewEmail = () => {

    const { openDrawer } = useOutletContext();
    
    const { state } = useLocation();
    const { email } = state;
    console.log("Email subject:", email.subject);

    return (
        
        <Box style={openDrawer ? { marginLeft: 280, width: '100%' } : { width: '100%' } }>
            <IconWrapper>
                <ArrowBack fontSize='small' color="action" onClick={() => window.history.back() } />
                <Delete fontSize='small' color="action" style={{ marginLeft: 40 }} />
            </IconWrapper>
            <Subject><Typography component="div">123</Typography>
{email.subject}
<Typography component="div">456</Typography><Indicator component="span">Inbox</Indicator></Subject>
            <Box style={{ display: 'flex'}}>
                <Image src={emptyProfilePic} alt="profile" />
                <Container>
                    <Box>
                    <Typography>    
                        {email.to ? email.to.split('@')[0] : "Unknown"} 
                        <Box component="span">&nbsp;&#60;{email.to ? email.to : "email@example.com"}&#62;</Box>
                    </Typography>

                        <Date>
                            {(new window.Date(email.date)).getDate()}&nbsp;
                            {(new window.Date(email.date)).toLocaleString('default', { month: 'long' })}&nbsp;
                            {(new window.Date(email.date)).getFullYear()} 
                        </Date>
                    </Box>
                    <Typography style={{ marginTop: 20, textAlign: 'justify', padding: '0px 20px 50px 10px' }}>{email.body}</Typography>
              
                <SummarizeEmail email={email} />
                </Container>
            </Box>
        </Box>
    )
}

export default ViewEmail;