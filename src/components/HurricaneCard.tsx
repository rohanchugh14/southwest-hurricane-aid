import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

interface HurricaneDataProps {
  // image: string;
  name: string;
  category: string;
  date: string;
}

export default function HurricaneCard(props: HurricaneDataProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ maxWidth: "100%", height: "100%" }}>
      <Card style={{
        maxWidth: "100%",
        height: "100%",
        paddingBottom: "8%",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        position: "relative"
      }}>
        <Tooltip title="Click for More Info">
          <CardActionArea onClick={handleOpen}>
            {/* <CardMedia style={{ height: 220, width: "100%" }} image={props.image} /> */}
            <CardContent>
              <Typography gutterBottom variant="h5">
                {props.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <p>{props.category}</p>
                <p>Date: {props.date}</p>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Tooltip>
        <CardActions style={{ position: "absolute", bottom: 0 }}>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            More Info
          </Button>
        </CardActions>
      </Card>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={{ overflow: "scroll", height: "100%", display: "block" }}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div style={{
            backgroundColor: "#fff",
            border: "2px solid #000",
            padding: "16px 32px 24px",
            width: "50%",
            marginLeft: "25%",
            marginRight: "25%"
          }}>
            <h2 id="transition-modal-title">{props.name}</h2>
            <p id="transition-modal-description">Category: {props.category}</p>
            <p id="transition-modal-description">Date: {props.date}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
