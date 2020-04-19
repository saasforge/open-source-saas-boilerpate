// For future using in file uploader (as a parent component)
class FileUploader extends Component {
    constructor(props) {
        super(props);    
        this.state = {
            src: (Array.isArray(this.props.src) ? this.props.src.slice(0) : (this.props.src ? [this.props.src] : [])),
        }
    }
    renderFileUploader =()=>{

    }
}