import {
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Typography,
} from "@mui/material";

function About() {
    return (
        <>
            <Typography variant="h6" mt={2} sx={{ textAlign: "center" }}>
                About Coffee Chess
            </Typography>
            <List>
                <ListItem>
                    <ListItemText>
                        Coffee Chess was developed for playing a quick real-time
                        chess match against other opponents, started as my
                        personal project.
                    </ListItemText>
                </ListItem>
                <ListSubheader>Please note</ListSubheader>
                <ListItem>
                    <ListItemText>
                        Matches will be <strong>deleted in a few hours </strong>
                        if inactive or completed.
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        The servers are<strong> hosted on free tier </strong>and
                        might experience slow loading times or connection
                        timeouts. I'm very sorry for the inconvenience.
                    </ListItemText>
                </ListItem>
            </List>
        </>
    );
}

export default About;
