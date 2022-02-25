import * as React from "react";
import axios from "axios";
import * as settings from "../settings";
import Steps from "./Steps";
import CssBaseline from "@material-ui/core/CssBaseline";
import {useState, useEffect} from 'react';
import {EditorState,ContentState, createFromText} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {Helmet} from "react-helmet";

import {
  Container,
  Grid,
  Paper,
  Typography,
  Slider,
  Button,
} from "@material-ui/core";
import SummarizePdf from "./SummarizePdf";
import TextEditor from "./TextEditor";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import jsPDF from 'jspdf'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import gendarmerie from '../image/gendarmerie.png'
import isep from '../image/isep.svg'

  


const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    heigth: "100vh",
    marginTop: "13vh",
  },
  edit: {
    marginBottom: "7vh",
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    color: theme.palette.primary.main,
  },
  steps: {
    marginBottom: "7vh",
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    color: theme.palette.primary.main,
  },
 InputBaseStyle: {
    width: "88%"
  },
  editor: {
    marginTop: "3vh",
    marginBottom: "10vh",
    backgroundColor: "#FAFAFA",
  },
  sliders: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  slidertop: {
    marginTop: theme.spacing(4),
  },
  urlsearch: {
    marginTop: theme.spacing(2),
  },
  downloadPdf: {
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(2),
  },
  image: {
    marginTop: "5vh"
  },
}));

// ########################################################
// Our Custom IRIS slider. You may use the default slider instead of this
// ########################################################
const SummarySlider = withStyles({
  root: {
    color: "#751E66",
  },
  valueLabel: {
    left: "calc(-50% -2)",
    top: -22,
    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
  mark: {
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: "currentColor",
  },

})(Slider);











// Marks on the slider track
const marks = [{ value: 0 }, { value: 10 }];

// ########################################################
// The main Home component returned by this Module
// ########################################################
function Home(props) {
  // Material UI Classes
  const classes = useStyles();



  // React hook state variable
  const [dimensions, setDimensions] = React.useState({
    summary_length: 0,
  });
  const[articleUrl, setUrl] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [activeStep, setActiveStep] = React.useState(-1);
  const [fileUpload, setFileUpload] = React.useState(false);
  const [summaryDone, setSummaryDone] = React.useState(true);
  const[fileForUpload, setUpload] = React.useState(null);
  const[fileName, setFileName] = React.useState("");


  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );


  // Function to update the Dimensions state upon slider value change
  const handleSliderChange = (name) => (event, newValue) => {
    setDimensions({
      ...dimensions,
      ...{ [name]: newValue },
    });
    setActiveStep (fileUpload === true ? 1: 0)

  };



const pdfGenerate = () => {
var doc= new jsPDF('portrait', 'px', 'a4', 'false')
    var splitText = doc.splitTextToSize(editorState.getCurrentContent().getPlainText(), 525);

    doc.setFontSize("12");
    doc.text(splitText, 25, 25)
    doc.save('résumé.pdf')
 }

  const showFile = async (e) => {
    try{
      e.preventDefault()
      const reader = new FileReader()
      reader.onload = async (e) => {
      const text = (e.target.result)
      setActiveStep(1)
    };


    const file = e.target.files[0];
    
     setUpload(file);
     setFileName(e.target.files[0].name)

    }
        catch(error){
        console.log("error")
        }
    }

  function valuetext(value) {
    return `${value}`;
  }
    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
    }
    //Function to make the get web url document summary
    const handleWebSummary = (event) =>{
        let summaryFormData = new FormData();
        summaryFormData.append("articleUrl", articleUrl);
        summaryFormData.append("length", dimensions.summary_length);
        let headers = {"Content-Type":"application/json"};
        let url =  settings.API_SERVER + "/summerizer/article/";
        let method = "post";
        let config = {headers, method, url, data: summaryFormData}
        setSummaryDone(false)

        // Aios API call

        axios(config)
            .then((res) =>{
                setSummary(res.data["summary"]);
                setEditorState(EditorState.createWithContent(
                  ContentState.createFromText(res.data["summary"])))
				  setSummaryDone(true)
            })
            .catch((error) => {
                console.log(error)

            });
			
			
    }

    const handleFileUploadSurmmary = (event)=>{

      let method = "post";
      let headers = {"content-type":"multipart/form-data"};
      let url =  settings.API_SERVER + "/summerizer/upload/";
      let summaryFormData =  new FormData();
     
      setSummaryDone(false)
      
      // Create an object of formData
     
    
      // Update the formData object
      summaryFormData.append("file", fileForUpload);
      summaryFormData.append("filename", fileName);
      summaryFormData.append("length", dimensions.summary_length);
      let config = {headers, method, url, data: summaryFormData}
      axios(config)
      .then((res) =>{
          setSummary(res.data["summary"]);
          setEditorState(EditorState.createWithContent(
            ContentState.createFromText(res.data["summary"])))
			setSummaryDone(true)
      })
      .catch((error) => {
          console.log(error)

      });
  

    }


 const handleAddFile = () => {
    setFileUpload(true)
    setActiveStep (1)
    }

  const handleUrl = (e) =>{
	  
	  setActiveStep(1);
	  setUrl(e.target.value);
  }

  useEffect(() => {
    if (summary !== "") {
    setSummaryDone(true)
    setActiveStep(2)
    }
  },[summary]);

  return (
    <React.Fragment>
      <CssBaseline />

      <Container fixed className={classes.container}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
>
          <Grid item xs={5}>
            <Paper className={classes.steps} elevation={1}>
              <Typography variant="h5">Etapes</Typography>
            </Paper>
            <Steps counter={activeStep}/>
            <Paper className={classes.sliders} elevation={3}>
              <Typography id="summary_length" variant="caption">
                Ajuster le nombre de phrases dans le résumé
              </Typography>
              <SummarySlider
                defaultValue={0}
                getAriaValueText={valuetext}
                aria-labelledby="summary_length"
                step={20}
                min={0}
                max={500}
                valueLabelDisplay="on"
                marks={marks}
                className={classes.slidertop}
                onChange={handleSliderChange("summary_length")}
              />
            </Paper>
            <Paper
              component="form"
              elevation={3}
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                className={classes.InputBaseStyle}
                placeholder="Url du document web"
                inputProps={{ "aria-label": "Web document url" }}
                onChange = {e => validURL(e.target.value) ?  handleUrl(e) : console.log('URL introuvable')}
              />
              <IconButton sx={{ p: "10px"}} aria-label="search" onClick = {handleWebSummary}>
                <SearchIcon />
              </IconButton>
            </Paper>
              <Paper className={classes.urlsearch} >
                <SummarizePdf />
              </Paper>
                      <Grid container
              direction="row"
              xs = {12}
            >
            <Grid item xs={6}>
            <Grid
              container
              direction="column"
            >
              <input
              accept=".pdf, .txt, .odt, .docx"
              onChange={showFile}
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
               />
                <p></p>
            <label htmlFor="raised-button-file">
            <div>
              {fileName}
            <Grid item xs={12}>
            <Button variant="contained" color="secondary" onChange = {handleAddFile} component="span" >
              Ajouter un fichier
            </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                Button
                variant="contained"
                color="secondary"
                onClick={handleFileUploadSurmmary}
                className={classes.urlsearch}
              >
                Resumer le fichier
              </Button>
              </Grid>
              </div>
              </label>
            </Grid>

            </Grid>
            <Grid item xs={6}>


            <Button
                Button
                variant="contained"
                color="primary"
                onClick={() => pdfGenerate()}
                className={classes.downloadPdf}
           >
            télécharger le resumé
          </Button>
          </Grid>

          </Grid>
            </Grid>

          <Grid item xs={6}>
            <Paper className={classes.edit} elevation={1}>
              <Typography variant="h5">Modifier le résumé</Typography>
            </Paper>
          <Grid item xs={12} className={classes.editor}>
            {summaryDone ?
            <TextEditor editorState = {editorState} setEditorState = {setEditorState} /> :
            <div>
            <Box sx={{ width: "30vw" }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
            </Box>
            <Box sx={{ width: "30vw" }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
            </Box>
            <Box sx={{ width: "30vw" }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
            </Box>
            <Box sx={{ width: "30vw" }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
            </Box>
            <Box sx={{ width: "30vw" }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
            </Box>
            </div>
            }
          </Grid>
          </Grid>
        </Grid>

      </Container>
    </React.Fragment>
  );
}

export default Home;
