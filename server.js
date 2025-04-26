const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());


app.get("/payment_methods", async (req, res) => {
    const result = await pool.query("SELECT * FROM payment_methods");
    res.json(result.rows);
});

app.get("/rooms", async (req, res) => {
    const result = await pool.query(`
    SELECT rooms.*, payment_methods.name AS payment_method
    FROM rooms
    LEFT JOIN payment_methods ON rooms.payment_method_id = payment_methods.id
    ORDER BY rooms.id
  `);
    res.json(result.rows);
});

app.post("/rooms", async (req, res) => {
    const { tenantName, phone, startDate, paymentMethodId, note } = req.body;
    await pool.query(
        `INSERT INTO rooms (tenant_name, phone, start_date, payment_method_id, note)
     VALUES ($1, $2, $3, $4, $5)`,
        [tenantName, phone, startDate, paymentMethodId, note]
    );
    res.status(201).send("Thêm thành công");
});

app.delete("/rooms/:id", async (req, res) => {
    await pool.query("DELETE FROM rooms WHERE id = $1", [req.params.id]);
    res.send("Đã xoá");
});

app.listen(3000, () => {
    console.log("Server đang chạy tại http://localhost:3000");
});
