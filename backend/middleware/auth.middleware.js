const validateContact = (req, res, next) => {

    const { name, email, subject, message } = req.body;

    if(!name || !email || !subject || !message){
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    next();
};

export default validateContact