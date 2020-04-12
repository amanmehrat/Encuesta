class Validation {

    static emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    static validateEmails = (emails) => {
        const invalidEmails = emails.split(',').map(email => email.trim()).filter(email => (email != "" && !this.validateEmail(email)));
        if (invalidEmails.length) {
            return `Invalid Emails are - ${invalidEmails}`;
        }
        return;
    }

    static validateEmail = (email) => {
        if (this.emailRegex.test(email)) {
            return true;
        }
        return false;
    }
}

module.exports = Validation;
