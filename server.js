const express = require('express')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

require('dotenv').config()
const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/invoiceDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, () => {
    console.log('Connected to Mongoose');
})

const schema = new mongoose.Schema({
    date: {
        type: [],
        isrequired: true
    },
    due: {
        type: Number,
        isrequired: true
    },
    name: {
        type: String,
        isrequired: true
    },
    address: {
        type: String,
        isRequired: true
    },
    phone: {
        type: Number,
        isrequired: true
    },
    email: {
        type: String,
        isrequired: true
    }, 
    product: {
        type: Number,
        isrequired: true
    },
    service: {
        type: Number,
        isrequired: true
    },
    labour: {
        type: Number,
        isrequired: true
    },    
    paid: {
        type: Boolean,
        isrequired: true,
    }
})

const Invoice = mongoose.model('Invoice', schema);

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

app.post('/mail', (req, res) => {
    const {
        receiver,
        message
    } = req.body
    let mailOptions = {
        from: '"Karan Mishra", karan.m2704@gmail.com',
        to: receiver,
        subject: 'Invoice for your purchase',
        text: `Your grand total is: ${message}`
    }

    transporter.sendMail(mailOptions, (err, response) => {
        if(err) {
            res.status(500).json({
                err: true,
                message: 'Could not send email'                
            })
            console.log(err);
        } else{
            res.status(200).json({
                err: false,
                message: 'Email sent successfully'                
            })
        }
    })
})

app.get('/invoice', (req, res) => {
    Invoice.find({}, (err, result) => {
        if(err){
            res.status(500).json({
                err: true,
                message: 'Failed to load data'                
            })
        }
        res.status(200).json({
            err: false,
            message: result                
        })
    })
})

app.post('/invoice', (req, res) => {
    const details = req.body
    const d = new Date()
    const date = d.getDate()
    const month = d.getMonth()
    const year = d.getFullYear()
    const due = Number(Date.now()) + 432000000
    const current_date = [date, month, year]
    const newInvoice = new Invoice({
        date: current_date,
        due: due,
        name: details.name,
        address: details.address,
        phone: details.phone,
        email: details.email,
        product: details.product,
        service: details.service,
        labour: details.labour,
        paid: false
    })

    newInvoice.save((err) => {
        if(err){
            res.status(500).json({
                err: true,
                message: 'Failed to save the invoice'                
            })
            console.log(err);
        }else{
            res.status(200).json({
                err: false,
                message: 'Invoice saved successfully'                
            })
        }
    })
})

app.patch('/invoice', async(req, res) => {
    const inv_id = await req.body.id
    console.log(inv_id)
    Invoice.findByIdAndUpdate({_id: inv_id}, {paid: true}, (err, result) => {
        if(err) {
            res.status(500).json({
                err: true,
                message: 'Could not update status of invoice'                
            })
            console.log(err);
        } else {
            res.status(200).json({
                err: true,
                message: 'Status changed'                
            })
        }
    })
})

app.get('/:id', (req, res) => {
    invId = req.params.id
    Invoice.findById({_id: invId}, (err, invoice) => {
        if(err){
            console.log(err)
            res.status(500).json({
                err: true,
                message: 'Server error. Try again later'                
            })
        }else{
            if(!invoice){
                res.status(400).json({
                    err: true,
                    message: 'Invoice not found'                
                })
            }else{
                res.status(200).json({
                    err: false,
                    message: invoice                
                })
            }
        }
    })
})

app.listen(8080, () => {
    console.log('Server running on port 8080');
})


// const newInvoice = new Invoice({
    // due: Date.now(),
    // name: 'Karan Mishra',
    // address: 'Sector-13, Kharghar, Navi Mumbai - 410210',
    // phone: 8108457233,
    // email: 'kmishra_be19@thapar.edu',
    // cost: [210, 300, 3434],
    // paid: 'Not Paid'
// })

// newInvoice.save((res, err) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log('successfully saved');
//     }
// })
