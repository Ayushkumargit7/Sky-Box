import { useState } from 'react';
import axios from 'axios'; 
import { Dialog, styled, Typography, Box, InputBase, TextField, Button } from '@mui/material'; 
import { Close, DeleteOutline } from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';
import CustomPrompt from './CustomPrompt';

const dialogStyle = {
    height: '75%',
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
    padding: 20px 40px 0px 30px;
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
    const sentEmailService = useApi(API_URLS.saveSentEmails);
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

        try {
            const response = await axios.post('http://localhost:8000/sendEmail', {
                mailContent: data.body,
                subject : data.subject,
                to : data.to
            });

            if (response.status === 200) {
                console.log("Email sent successfully");
                setOpenDrawer(false);
                setData({ to: '', subject: '', body: '' });

                const payload = {
                    to : data.to,
                    from : "codeforinterview03@gmail.com",
                    subject : data.subject,
                    body : data.body,
                    date: new Date(),
                    image: '',
                    name: 'Code for Interview',
                    starred: false,
                    type: 'sent'
                }
                sentEmailService.call(payload);

            } else {
                console.error("Failed to send email");
            }
        } catch (error) {
            console.error("Error sending email:", error);
        }
    }


    const closeComposeMail = (e) => {
        e.preventDefault();

        const payload = {
            to : data.to,
            from : "codeforinterview03@gmail.com",
            subject : data.subject,
            body : data.body,
            date: new Date(),
            image: '',
            name: 'Code for Interview',
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
                        padding: '15px 20px 0px 15px',
                        textAlign: 'justify',
                    }
                }}
                name="body"
                onChange={(e) => onValueChange(e)}
                value={data.body}
            />
            <Footer>
                <SendButton onClick={(e) => sendEmail(e)}>Send</SendButton>
                <DeleteOutline onClick={() => setOpenDrawer(false)} />
            </Footer>
        </Dialog>
    )
}

export default ComposeMail;