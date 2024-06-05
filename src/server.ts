import app from "./app";

const PORT = process.env.PORT || 5000;

// server start
app.listen(PORT, () => console.log(`Start Server http://localhost:{PORT}/`));
