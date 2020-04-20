import React from 'react';

/* list of supported file types */
const SheetJSFT = [
    "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function (x) { return "." + x; }).join(",");

class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(e) {
        const files = e.target.files;
        if (files && files[0]) this.props.handleFile(files[0]);
    };

    render() {
        const { label, meta, type } = this.props;
        const { value, ...input } = this.props.input;

        return (
            <div>
                <label>{label}</label>
                <div>
                    <input {...input} type={type} accept={SheetJSFT} onChange={this.handleChange} />
                </div>
                <div className="red-text" style={{ fontSize: "10px", marginBottom: "15px" }} >
                    {meta.touched && meta.error}
                </div>
            </div>
        );
    };
}

export default FileInput;