# Invoice Web App

A web application for managing and sending invoices with a user-friendly interface.

## Technologies and Tools Used:
- **ReactJS**: Frontend framework
- **NodeJS** (with Express): Backend framework
- **MongoDB**: Database for storing invoice data
- **CSS** & **Material-UI**: Styling and UI components

![Create Invoice](https://github.com/user-attachments/assets/16f022ec-3e34-4096-b5a8-6884f224d833)

## Steps to Run the Application

1. **Download the ZIP file** to your local system and extract it.
2. **Install dependencies**:
   - Open the terminal, `cd` into the main folder and run:
     ```bash
     npm i
     ```
   - Then, navigate to the `client` folder and run:
     ```bash
     npm i
     ```
3. **Start the development server**:
   - Go back to the main folder and run:
     ```bash
     npm run dev
     ```
4. Open your browser and visit **localhost:3000** (if it doesn't happen automatically).

![Home Page](https://github.com/user-attachments/assets/a8972299-5e5d-4249-b0c8-3bbc3de29628)

## Features of the App

- **Invoice Summaries**: On the home page, you can view all invoice summaries, including:
  - Name
  - Date of creation
  - Status
  - Background color indicating whether the invoice is past due or not (green = on time, red = overdue).

- **View Detailed Invoice**: Each card has a "View" button that takes you to a page with the full details of the invoice.
  - ![Invoice Detail](https://github.com/user-attachments/assets/349fd5d4-60fa-4a36-9760-17b864ac952f)

- **Send Invoice Email**: A second button allows you to send an email to the recipient, informing them of the total amount of the invoice.

- **Create Invoice**: There's a 'Create' button that lets you create a new invoice using a form.

## License

Include your license information here, for example:

MIT License Copyright (c)


## Contact

For any questions or feedback, feel free to reach out to me at [lakhanpxl.arjun@gmail.com].
