import { useState } from 'react';

import { Dialog, styled, Typography, Box, InputBase, TextField, Button } from '@mui/material'; 
import { Close, DeleteOutline } from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';
import CustomPrompt from './CustomPrompt';

const dialogStyle = {
    height: '80%',
    width: '50%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    borderRadius: '10px',
}

const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background: #f2f6fc;
    & > p {
        font-size: 14px;
        font-weight: 500;
    }
`;

const RecipientWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    & > div {
        font-size: 14px;
        border-bottom: 1px solid #F5F5F5;
        margin-top: 10px;
    }
`;

const Footer = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 50px 0px 30px;
    align-items: center;
`;

const SendButton = styled(Button)`
    background: #0B57D0;
    color: #fff;
    font-weight: 500;
    text-transform: none;
    border-radius: 18px;
    width: 100px;
`

const ComposeMail = ({ open, setOpenDrawer }) => {
    const [data, setData] = useState({
        to: '',
        subject: '',
        body: ''
    });    
    const saveDraftService = useApi(API_URLS.saveDraftEmails);
    const [prompt, setPrompt] = useState("");

    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value || '' });
    }

    const handleGeneratedText = (generatedText) => {
        setData({ ...data, body: generatedText });
    };

    const sendEmail = async (e) => {
        e.preventDefault();

        const baseUrl = 'http://localhost:8000';
        const endpoint = API_URLS.saveSentEmails.endpoint;
        const fullUrl = `${baseUrl}/${endpoint}`;    
    
        const payload = {
            to: data.to,
            subject: data.subject,
            body: data.body,
        };
    
        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (response.ok) {
                alert('Email sent successfully');
                setOpenDrawer(false);
                setData({ to: '', subject: '', body: '' });
            } else {
                const errorData = await response.json();
                alert(`Error sending email: ${errorData.message}`);
            }
        } catch (error) {
            alert(`Error sending email: ${error.message}`);
        }
    };
    

    const closeComposeMail = (e) => {
        e.preventDefault();

        const payload = {
            to : data.to,
            from : "pranathi_j@srmap.edu.in",
            subject : data.subject,
            body : data.body,
            date: new Date(),
            image: '',
            name: 'Pranathi Jayanthi',
            starred: false,
            type: 'drafts'
        }

        saveDraftService.call(payload);

        if (!saveDraftService.error) {
            setOpenDrawer(false);
            setData({});
        } else {

        }
    }

    return (
        <Dialog
            open={open}
            PaperProps={{ sx: dialogStyle }}
        >
            <Header>
                <Typography>New Message</Typography>
                <CustomPrompt onGenerate={handleGeneratedText} />
                <Close fontSize="small" onClick={(e) => closeComposeMail(e)} />
            </Header>
            <RecipientWrapper>
                <InputBase placeholder='Recipients' name="to" onChange={(e) => onValueChange(e)} value={data.to} />
                <InputBase placeholder='Subject' name="subject" onChange={(e) => onValueChange(e)} value={data.subject} />
            </RecipientWrapper>
            <TextField 
                multiline
                rows={9}
                sx={{ 
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& textarea': {
                        padding: '0px 20px 0px 15px',
                        textAlign: 'justify',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        }
                    }
                }}
                name="body"
                onChange={(e) => onValueChange(e)}
                value={data.body}
                fullWidth
            />
            <Footer>
                <SendButton onClick={(e) => sendEmail(e)}>Send</SendButton>
                <DeleteOutline onClick={() => setOpenDrawer(false)} />
            </Footer>
        </Dialog>
    )
}

export default ComposeMail;