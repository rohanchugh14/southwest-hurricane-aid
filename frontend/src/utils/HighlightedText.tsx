import React from 'react';
import Typography from '@mui/material/Typography';


type Props = {
    text: string,
    searchTerm: string
};

const HighlightedText = (props: Props) => {

    if (!props.text || props.text.trim() === '') {
        // Return early if the text is empty or consists of only whitespace
        return null;
    }

    const escapedSearchTerm = props.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');

    const parts = props.text.split(regex);

    return (
        <Typography>
            {parts.map((part, index) => (
                regex.test(part) && props.searchTerm !== "" ? (
                    <span key={index} style={{ backgroundColor: '#000000' }}>
                        {part}
                    </span>
                ) : (
                    <React.Fragment key={index}>
                        {part}
                    </React.Fragment>
                )
            ))}
        </Typography>
    );
};

export default HighlightedText;

