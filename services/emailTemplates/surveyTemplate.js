const keys = require("../../config/keys")

module.exports = (survey) => {
    return `   
    <html>
        <body>
            <h3 style='text-allign:center;'>Please provide your precious vote to this survey.</h3>
            <div>
                <p> <b>${survey.body}</b> </p>
                <p>
                    <a href="${keys.emailyDomain}/api/survey/${survey.id}/yes">Yes</a>
                    <a href="${keys.emailyDomain}/api/survey/${survey.id}/no">No</a>
                <p>
            <div>
        </body>
    </html>
    `;
}