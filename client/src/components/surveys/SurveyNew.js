import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import ShowFromReview from './SurveyFormReview';
import XLSX from 'xlsx';

class SurveyNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], /* Array of Arrays e.g. [["a","b"],[1,2]] */
            cols: [],  /* Array of column objects e.g. { name: "C", K: 2 } */
            showFromReview: false
        };
        this.handleFile = this.handleFile.bind(this);
    };
    make_cols = refstr => {
        let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
        for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
        return o;
    };
    handleFile(file/*:File*/) {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            /* Update state */
            this.setState({ data: data, cols: this.make_cols(ws['!ref']) });
            console.log(this.state);
        };
        if (rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
    };
    renderContent() {
        if (this.state.showFromReview) {
            return <ShowFromReview onCancel={() => { this.setState({ showFromReview: false }) }} data={this.state.data} />;
        }
        return <SurveyForm handleFile={this.handleFile} onSubmit={() => { this.setState({ showFromReview: true }) }} data={this.state.data} />;

    }
    render() {
        return this.renderContent()
    }
}
export default SurveyNew;